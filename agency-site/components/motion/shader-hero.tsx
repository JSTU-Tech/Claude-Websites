"use client";

import React, { useRef, useEffect } from "react";

/**
 * Shader-driven hero band — house primitive. Originally pasted in the
 * Aceternity orange/yellow style; retoned heavily for the Slate & Sage
 * brief:
 *   • bg-black → bg-ink-deep
 *   • gradient hero text → solid type + accent-soft underline
 *   • gradient buttons → palette swap (sage / bone fill, no gradient)
 *   • hover:scale-105 → removed (DESIGN.md §5)
 *   • rounded-full → ink-edge square buttons
 *   • Shader fragment retuned: warm orange-brown clouds → forest-green
 *     clouds matching --color-accent, stars muted toward palette.
 *
 * Use as an atmospheric section between editorial folds. WebGL is paused
 * when the element scrolls out of view (IntersectionObserver) to spare
 * battery + GPU.
 */

interface ShaderHeroProps {
  eyebrow?: string;
  headline: {
    line1: string;
    line2: string;
  };
  subtitle: string;
  buttons?: {
    primary?: { text: string; href?: string; onClick?: () => void };
    secondary?: { text: string; href?: string; onClick?: () => void };
  };
  className?: string;
}

// ── Shader source — forest-green nebula, slow drift. Same noise algo as
// the original (credit: Matthias Hurrle @atzedent), recoloured.
const fragmentShader = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p = fract(p * vec2(12.9898, 78.233));
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}
float noise(in vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  float a = rnd(i), b = rnd(i + vec2(1, 0)),
        c = rnd(i + vec2(0, 1)), d = rnd(i + 1.);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm(vec2 p) {
  float t = 0., a = 1.; mat2 m = mat2(1., -.5, .2, 1.2);
  for (int i = 0; i < 5; i++) {
    t += a * noise(p);
    p *= 2. * m;
    a *= .5;
  }
  return t;
}
float clouds(vec2 p) {
  float d = 1., t = 0.;
  for (float i = 0.; i < 3.; i++) {
    float a = d * fbm(i * 10. + p.x * .2 + .2 * (1. + i) * p.y + d + i * i + p);
    t = mix(t, d, a);
    d = a;
    p *= 2. / (i + 1.);
  }
  return t;
}
void main(void) {
  vec2 uv = (FC - .5 * R) / MN, st = uv * vec2(2, 1);
  vec3 col = vec3(0);
  float bg = clouds(vec2(st.x + T * .35, -st.y));
  uv *= 1. - .3 * (sin(T * .2) * .5 + .5);
  for (float i = 1.; i < 12.; i++) {
    uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .35 + .1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    // Stars — palette-leaning, never neon. Muted toward sage / bone.
    col += .00115 / d * (cos(sin(i) * vec3(.4, .65, .55)) + 1.);
    float b = noise(i + p + bg * 1.731);
    col += .0017 * b / length(max(p, vec2(b * p.x * .02, p.y)));
    // Cloud tone — forest green at the deep end (#18433B ≈ vec3(.094,.263,.231))
    col = mix(col, vec3(bg * .094, bg * .263, bg * .231), d);
  }
  O = vec4(col, 1);
}`;

const vertexShader = `#version 300 es
precision highp float;
in vec4 position;
void main() { gl_Position = position; }`;

class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private scale: number;
  private locResolution: WebGLUniformLocation | null = null;
  private locTime: WebGLUniformLocation | null = null;

  constructor(canvas: HTMLCanvasElement, scale: number) {
    this.canvas = canvas;
    this.scale = scale;
    this.gl = canvas.getContext("webgl2") as WebGL2RenderingContext;
  }

  setup() {
    const gl = this.gl;
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(this.program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    this.locResolution = gl.getUniformLocation(this.program, "resolution");
    this.locTime = gl.getUniformLocation(this.program, "time");
  }

  updateScale(scale: number) {
    this.scale = scale;
    this.gl.viewport(
      0,
      0,
      this.canvas.width * scale,
      this.canvas.height * scale,
    );
  }

  render(now: number) {
    const gl = this.gl;
    if (!this.program) return;
    gl.clearColor(0.031, 0.027, 0.04, 1); // matches --ink-deep
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(this.program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f(this.locResolution, this.canvas.width, this.canvas.height);
    gl.uniform1f(this.locTime, now * 1e-3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  dispose() {
    const gl = this.gl;
    if (this.program) gl.deleteProgram(this.program);
    if (this.buffer) gl.deleteBuffer(this.buffer);
  }
}

export const ShaderHero: React.FC<ShaderHeroProps> = ({
  eyebrow,
  headline,
  subtitle,
  buttons,
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const activeRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    const renderer = new WebGLRenderer(canvas, dpr);
    rendererRef.current = renderer;
    renderer.setup();

    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      renderer.updateScale(dpr);
    };
    resize();

    const loop = (now: number) => {
      if (activeRef.current) renderer.render(now);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const io = new IntersectionObserver(
      (entries) => {
        activeRef.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(section);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={[
        "relative w-full overflow-hidden bg-ink-deep text-bg",
        "min-h-[80svh] flex items-center justify-center",
        className,
      ].join(" ")}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none"
        aria-hidden="true"
      />

      {/* Subtle frame echoing the rest of the site */}
      <div className="pointer-events-none absolute inset-x-6 md:inset-x-10 top-6 md:top-10 bottom-6 md:bottom-10 border border-bg/10" />

      <div className="relative z-10 px-6 md:px-10 max-w-5xl text-center flex flex-col items-center gap-8">
        {eyebrow ? (
          <p className="eyebrow text-bg/55">{eyebrow}</p>
        ) : null}

        <h2
          className="font-display font-normal leading-[0.96] tracking-[-0.025em] text-bg"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
        >
          <span className="block">{headline.line1}</span>
          <span className="block">
            <span className="relative inline-block">
              <span className="relative z-10">{headline.line2}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[-0.04em] h-[0.06em] bg-accent-soft"
              />
            </span>
          </span>
        </h2>

        <p
          className="text-bg/85 max-w-[58ch] mx-auto"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          {subtitle}
        </p>

        {buttons ? (
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            {buttons.primary ? (
              <ButtonLink
                href={buttons.primary.href}
                onClick={buttons.primary.onClick}
                variant="primary"
              >
                {buttons.primary.text}
              </ButtonLink>
            ) : null}
            {buttons.secondary ? (
              <ButtonLink
                href={buttons.secondary.href}
                onClick={buttons.secondary.onClick}
                variant="secondary"
              >
                {buttons.secondary.text}
              </ButtonLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

function ButtonLink({
  href,
  onClick,
  variant,
  children,
}: {
  href?: string;
  onClick?: () => void;
  variant: "primary" | "secondary";
  children: React.ReactNode;
}) {
  const classes =
    variant === "primary"
      ? "bg-bg text-ink-deep hover:bg-accent-soft hover:text-bg"
      : "bg-transparent text-bg border border-bg/30 hover:bg-bg/10";
  const common =
    "inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)]";
  if (href) {
    return (
      <a href={href} className={`${common} ${classes}`}>
        {children}
        <span aria-hidden="true">&rarr;</span>
      </a>
    );
  }
  return (
    <button onClick={onClick} className={`${common} ${classes}`}>
      {children}
      <span aria-hidden="true">&rarr;</span>
    </button>
  );
}
