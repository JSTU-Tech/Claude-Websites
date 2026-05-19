"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { studio } from "@/lib/studio";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Magnetic } from "@/components/motion/magnetic";
import AnimatedTextCycle from "@/components/motion/animated-text-cycle";

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

/**
 * Hero — flagship fold of the studio site. Full-viewport ink-deep
 * canvas with a self-contained WebGL2 nebula behind, type overlay in
 * bone, sage-underlined payoff. Pageload choreography: eyebrow → lines
 * (clip-mask reveal, 80ms stagger) → underline draw → CTA + founder
 * credit fade.
 *
 * Reference: Basement Studio + Tomorrow + Active Theory hero takeovers,
 * tuned to the Slate & Sage palette. The shader pauses when the hero
 * leaves the viewport (IntersectionObserver) to spare GPU.
 */

const vertexShader = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;

const fragmentShader = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p){p=fract(p*vec2(12.9898,78.233));p+=dot(p,p+34.56);return fract(p.x*p.y);}
float noise(in vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);float a=rnd(i),b=rnd(i+vec2(1,0)),c=rnd(i+vec2(0,1)),d=rnd(i+1.);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}
float fbm(vec2 p){float t=0.,a=1.;mat2 m=mat2(1.,-.5,.2,1.2);for(int i=0;i<5;i++){t+=a*noise(p);p*=2.*m;a*=.5;}return t;}
float clouds(vec2 p){float d=1.,t=0.;for(float i=0.;i<3.;i++){float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);t=mix(t,d,a);d=a;p*=2./(i+1.);}return t;}
void main(){
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.18,-st.y));
  uv*=1.-.25*(sin(T*.15)*.5+.5);
  for(float i=1.;i<10.;i++){
    uv+=.09*cos(i*vec2(.1+.01*i,.8)+i*i+T*.25+.08*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.001/d*(cos(sin(i)*vec3(.4,.65,.55))+1.);
    float b=noise(i+p+bg*1.4);
    col+=.0014*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.094,bg*.263,bg*.231),d);
  }
  O=vec4(col,1);
}`;

function useHeroShader(sectionRef: React.RefObject<HTMLElement | null>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexShader));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentShader));
    gl.linkProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "resolution");
    const uTime = gl.getUniformLocation(program, "time");
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);

    let visible = true;
    let raf = 0;
    const resize = () => {
      const rect = section.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(section);

    const loop = (now: number) => {
      if (visible) {
        gl.clearColor(0.031, 0.027, 0.039, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, now * 1e-3);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(program);
      if (buf) gl.deleteBuffer(buf);
    };
  }, [sectionRef]);

  return canvasRef;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useHeroShader(sectionRef);
  const prefersReduced = useReducedMotion();

  const reveal = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: EASE_QUART, delay },
        };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-heading"
      className="relative bg-ink-deep text-ink overflow-hidden min-h-[100svh] flex flex-col px-6 md:px-10 pt-10 md:pt-14 pb-10"
    >
      {/* WebGL canvas behind everything */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
      {/* Subtle gradient veil so type stays readable */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-deep/40 via-transparent to-ink-deep/70"
      />
      {/* Editorial hairline frame echoing the case study page */}
      <div className="pointer-events-none absolute inset-x-6 md:inset-x-10 top-6 md:top-10 bottom-6 md:bottom-10 border border-ink/10" />

      <div className="relative flex-1 flex flex-col">
        {/* Eyebrow row */}
        <div className="flex items-baseline justify-between pt-2">
          <motion.p className="eyebrow text-ink/55" {...reveal(0.05)}>
            Studio of {studio.founderName}, {studio.year}&nbsp;—
          </motion.p>
          <motion.p
            className="eyebrow tabular-nums text-ink/55"
            {...reveal(0.1)}
          >
            Index / 01
          </motion.p>
        </div>

        {/* Display headline */}
        <h1
          id="hero-heading"
          className="font-display font-normal mt-14 md:mt-20 lg:mt-24 text-ink"
          style={{
            fontSize: "var(--text-hero)",
            lineHeight: 0.95,
            letterSpacing: "-0.025em",
          }}
        >
          <RevealLines>
            {[
              <>The website</>,
              <>your business</>,
              <>
                <span className="relative inline-block">
                  <span className="relative z-10">deserves.</span>
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-0.04em] h-[0.07em] bg-accent-soft origin-left"
                    initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      ease: EASE_QUART,
                      delay: prefersReduced ? 0 : 1.25,
                    }}
                  />
                </span>
              </>,
            ]}
          </RevealLines>
        </h1>

        {/* Lower meta band */}
        <motion.div
          className="mt-auto pt-8 md:pt-10 border-t border-ink/15"
          {...reveal(1.35)}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 pt-8 md:pt-10">
          <motion.p
            className="md:col-span-7 lg:col-span-6 text-ink/85 max-w-[62ch]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            {...reveal(1.4)}
          >
            <span className="text-accent-soft font-medium">Founder-led</span>{" "}
            from audit to launch. Built for{" "}
            <AnimatedTextCycle
              className="text-accent-soft font-medium"
              words={[
                "trades",
                "hospitality",
                "professional services",
                "tech startups",
                "local services",
              ]}
            />{" "}
            — quoted per project, no monthly invoices unless you want them.
          </motion.p>

          <motion.div
            className="md:col-span-5 lg:col-span-6 md:col-start-8 lg:col-start-7 flex flex-col items-start gap-6 md:items-end"
            {...reveal(1.5)}
          >
            <Magnetic radius={120} maxPull={7}>
              <Link
                href={studio.bookingUrl}
                data-cursor="Book"
                className="group inline-flex items-center gap-3 bg-ink text-ink-deep px-8 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-accent-soft hover:text-ink"
              >
                <span className="relative overflow-hidden inline-block">
                  <span className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:-translate-y-full">
                    Book a call
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-y-0"
                  >
                    Book a call
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </Magnetic>

            <div className="flex items-center gap-3 text-[0.875rem] text-ink/70">
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-ink/25 font-display text-[0.8125rem] text-ink"
              >
                JS
              </span>
              <span>
                {studio.founderName},{" "}
                <span className="text-ink">{studio.founderRole}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
