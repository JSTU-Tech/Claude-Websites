"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Visit section — dark ember backdrop driven by a Three.js fragment
 * shader (RGB-scanline house primitive, retoned to oxblood + amber +
 * cream). Address big-type mask-reveals on enter; the right-hand info
 * column is a stacked editorial table; CTA is a tactile pill that
 * shifts background fill on hover (no scale per DESIGN.md §5).
 */

const fragmentShader = `
  precision highp float;
  uniform vec2 resolution;
  uniform float time;

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float d = length(p) * 0.08;
    float rx = p.x * (1.0 + d);
    float gx = p.x;
    float bx = p.x * (1.0 - d);

    float ri = 0.05 / abs(p.y + sin((rx + time * 0.6) * 1.2) * 0.45);
    float gi = 0.04 / abs(p.y + sin((gx + time * 0.4) * 1.0) * 0.5);
    float bi = 0.025 / abs(p.y + sin((bx + time * 0.5) * 0.9) * 0.55);

    // Kiln palette: oxblood, amber, cream — never neon
    vec3 oxblood = vec3(0.69, 0.286, 0.165);
    vec3 amber   = vec3(0.85, 0.55, 0.32);
    vec3 cream   = vec3(0.96, 0.92, 0.86);

    vec3 col = ri * oxblood + gi * amber * 0.85 + bi * cream * 0.25;

    // Soft floor — keep the section from going pure black
    col += vec3(0.025, 0.012, 0.005);

    gl_FragColor = vec4(col, 1.0);
  }
`;

const vertexShader = `
  attribute vec3 position;
  void main() { gl_Position = vec4(position, 1.0); }
`;

function KilnVisitShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color(0.043, 0.027, 0.02));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    const sizeFromWrap = () => {
      const rect = wrap.getBoundingClientRect();
      return {
        w: Math.max(1, Math.floor(rect.width)),
        h: Math.max(1, Math.floor(rect.height)),
      };
    };

    const { w, h } = sizeFromWrap();
    const uniforms = {
      resolution: { value: [w, h] as [number, number] },
      time: { value: 0.0 },
    };

    const positions = [
      -1, -1, 0, 1, -1, 0, -1, 1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0,
    ];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(positions), 3),
    );

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const { w, h } = sizeFromWrap();
      renderer.setSize(w, h, false);
      uniforms.resolution.value = [w, h];
    };
    resize();

    let raf = 0;
    let visible = true;

    const animate = () => {
      if (visible) {
        uniforms.time.value += 0.012;
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}

export function KilnVisit() {
  return (
    <section
      id="visit"
      className="relative px-6 md:px-12 py-32 md:py-48 overflow-hidden"
      style={{ background: "#0F0A07", color: "var(--kiln-bg)" }}
    >
      <KilnVisitShader />

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 70%, rgba(15,10,7,0.35), rgba(15,10,7,0.78) 70%), linear-gradient(180deg, rgba(15,10,7,0.6) 0%, transparent 25%, transparent 75%, rgba(15,10,7,0.9) 100%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-14 md:gap-x-12 items-end">
        <div className="md:col-span-7">
          <p
            className="kiln-eyebrow"
            style={{ color: "rgba(244,235,218,0.55)" }}
          >
            IV — Visit · 14 Pulteney Bridge
          </p>
          <h2
            id="book"
            className="kiln-display italic font-light leading-[0.98] tracking-[-0.02em] mt-6"
            style={{
              fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
              color: "var(--kiln-bg)",
            }}
          >
            <MaskLine delay={0}>The room is above</MaskLine>
            <MaskLine delay={0.08}>
              the bridge.{" "}
              <span style={{ color: "var(--kiln-accent-soft)" }}>
                The door
              </span>
            </MaskLine>
            <MaskLine delay={0.16}>opens at six.</MaskLine>
          </h2>
          <p
            className="mt-8 max-w-[48ch] text-[1.0625rem] leading-[1.65]"
            style={{ color: "rgba(244,235,218,0.85)" }}
          >
            Dinner Wednesday through Sunday, one sitting at seven. Pre-paid
            booking holds the seat — full refund on 48 hours notice. Walk-ins
            are welcomed at the marble counter when a stool is free.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-5">
            <a
              href="https://resy.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-8 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200"
              style={{
                background: "var(--kiln-accent)",
                color: "var(--kiln-bg)",
              }}
            >
              <span>Reserve via Resy</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <a
              href="tel:+441225555014"
              className="kiln-link text-[0.95rem]"
              style={{ color: "rgba(244,235,218,0.85)" }}
            >
              +44 1225 555 0142
            </a>
          </div>
        </div>

        <div className="md:col-span-4 md:col-start-9 flex flex-col gap-7">
          <VisitInfo label="Hours" lines={["Wed — Sun, 19:00 only", "Closed Monday & Tuesday"]} />
          <VisitInfo
            label="Reservations"
            lines={["+44 1225 555 0142", "hello@kilnhouse.uk"]}
          />
          <VisitInfo
            label="Private dining"
            lines={["Up to 12 in the loft", "Set menus from £85pp"]}
          />
          <VisitInfo
            label="Travel"
            lines={["3 minutes from Bath Spa", "Valet partnered with No. 15"]}
          />
        </div>
      </div>
    </section>
  );
}

function MaskLine({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.85,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function VisitInfo({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div
      className="pt-5"
      style={{ borderTop: "1px solid rgba(244,235,218,0.18)" }}
    >
      <p
        className="kiln-eyebrow"
        style={{ color: "rgba(244,235,218,0.55)" }}
      >
        {label}
      </p>
      <div
        className="mt-3 flex flex-col gap-1 text-[0.9375rem]"
        style={{ color: "rgba(244,235,218,0.92)" }}
      >
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}
