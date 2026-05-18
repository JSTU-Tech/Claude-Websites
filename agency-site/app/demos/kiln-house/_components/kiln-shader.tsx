"use client";

import { useEffect, useRef } from "react";

/**
 * Kiln-tuned WebGL2 fragment shader — ember + smoke atmosphere. Forked
 * from `components/motion/shader-hero.tsx` (Slate-and-Sage agency variant)
 * and retoned for Kiln House:
 *   • Clouds shifted from forest-green to warm oxblood / amber ember
 *   • Stars muted toward cream, never neon
 *   • Slower drift (40% of original) — restaurant atmosphere, not space
 *   • Background colour matches Kiln deep-bg so blends seamlessly
 *
 * Drop into a parent that sets its own size; the canvas fills inset-0.
 * IntersectionObserver pauses RAF when off-screen.
 */

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
  // Slower drift — embers, not nebula
  float bg = clouds(vec2(st.x + T * .14, -st.y));
  uv *= 1. - .25 * (sin(T * .12) * .5 + .5);
  for (float i = 1.; i < 12.; i++) {
    uv += .1 * cos(i * vec2(.1 + .01 * i, .8) + i * i + T * .18 + .1 * uv.x);
    vec2 p = uv;
    float d = length(p);
    // Ember sparks — warm cream, very faint
    col += .00135 / d * (cos(sin(i) * vec3(.92, .78, .55)) + 1.);
    float b = noise(i + p + bg * 1.731);
    col += .0019 * b / length(max(p, vec2(b * p.x * .025, p.y)));
    // Ember body — oxblood at the deep end (#B0492A → vec3(.69,.286,.165))
    // mixed with darker crimson (#5A1F0F → vec3(.353,.122,.059))
    vec3 emberDeep = vec3(.353, .122, .059);
    vec3 emberHot  = vec3(.85, .42, .22);
    vec3 ember = mix(emberDeep, emberHot, smoothstep(0., 1., bg));
    col = mix(col, ember * bg, d * .85);
  }
  // Final warm bias — slight orange tint everywhere
  col += vec3(.02, .005, 0.);
  O = vec4(col, 1);
}`;

const vertexShader = `#version 300 es
precision highp float;
in vec4 position;
void main() { gl_Position = position; }`;

export function KilnShader({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    gl: WebGL2RenderingContext | null;
    program: WebGLProgram | null;
    buffer: WebGLBuffer | null;
    locResolution: WebGLUniformLocation | null;
    locTime: WebGLUniformLocation | null;
    raf: number | undefined;
    active: boolean;
  }>({
    gl: null,
    program: null,
    buffer: null,
    locResolution: null,
    locTime: null,
    raf: undefined,
    active: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const state = stateRef.current;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;
    state.gl = gl;

    const dpr = Math.max(1, 0.6 * window.devicePixelRatio);

    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, vertexShader);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, fragmentShader);
    gl.compileShader(fs);

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    state.program = program;

    const buffer = gl.createBuffer();
    state.buffer = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    state.locResolution = gl.getUniformLocation(program, "resolution");
    state.locTime = gl.getUniformLocation(program, "time");

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();

    const loop = (now: number) => {
      if (state.active && state.gl && state.program) {
        gl.clearColor(0.110, 0.059, 0.031, 1); // matches #1C0F08
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.uniform2f(state.locResolution, canvas.width, canvas.height);
        gl.uniform1f(state.locTime, now * 1e-3);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      state.raf = requestAnimationFrame(loop);
    };
    state.raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        state.active = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    return () => {
      ro.disconnect();
      io.disconnect();
      if (state.raf) cancelAnimationFrame(state.raf);
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
