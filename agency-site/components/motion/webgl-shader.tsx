"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Three.js fragment-shader background — house primitive. Pasted in as a
 * fullscreen fixed RGB scanline effect; retoned for studio use:
 *   • Containerised inside its parent (absolute inset-0) instead of
 *     fixed full-viewport, so it sits behind a single section, not the
 *     whole site.
 *   • Shader colours retuned: vibrant RGB scanlines → palette-leaning
 *     forest/sage/bone bands. No black, no neon.
 *   • IntersectionObserver pauses rendering when off-screen.
 *   • ResizeObserver replaces window resize for accurate parent sizing.
 *
 * Drop into any section that benefits from an atmospheric layer behind
 * editorial type. Pair with a high-contrast typographic foreground.
 */

export function WebGLShader({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const refs = useRef<{
    scene: THREE.Scene | null;
    camera: THREE.OrthographicCamera | null;
    renderer: THREE.WebGLRenderer | null;
    mesh: THREE.Mesh | null;
    uniforms: {
      resolution: { value: [number, number] };
      time: { value: number };
      xScale: { value: number };
      yScale: { value: number };
      distortion: { value: number };
    } | null;
    animationId: number | null;
    visible: boolean;
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
    visible: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const r = refs.current;

    const vertexShader = `
      attribute vec3 position;
      void main() { gl_Position = vec4(position, 1.0); }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        float d = length(p) * distortion;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float ri = 0.04 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float gi = 0.04 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float bi = 0.04 / abs(p.y + sin((bx + time) * xScale) * yScale);

        vec3 forest = vec3(0.094, 0.263, 0.231);
        vec3 sage   = vec3(0.420, 0.640, 0.545);
        vec3 bone   = vec3(0.949, 0.941, 0.917);

        vec3 col = ri * forest + gi * sage + bi * bone * 0.4;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const sizeFromWrap = () => {
      const rect = wrap.getBoundingClientRect();
      return {
        w: Math.max(1, Math.floor(rect.width)),
        h: Math.max(1, Math.floor(rect.height)),
      };
    };

    const resize = () => {
      if (!r.renderer || !r.uniforms) return;
      const { w, h } = sizeFromWrap();
      r.renderer.setSize(w, h, false);
      r.uniforms.resolution.value = [w, h];
    };

    const init = () => {
      r.scene = new THREE.Scene();
      r.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: false,
      });
      r.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      r.renderer.setClearColor(new THREE.Color(0.031, 0.027, 0.039));

      r.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

      const { w, h } = sizeFromWrap();
      r.uniforms = {
        resolution: { value: [w, h] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
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
        uniforms: r.uniforms,
        side: THREE.DoubleSide,
      });

      r.mesh = new THREE.Mesh(geometry, material);
      r.scene.add(r.mesh);

      resize();
    };

    const animate = () => {
      if (r.visible && r.uniforms && r.renderer && r.scene && r.camera) {
        r.uniforms.time.value += 0.01;
        r.renderer.render(r.scene, r.camera);
      }
      r.animationId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      (entries) => {
        r.visible = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0 },
    );
    io.observe(wrap);

    return () => {
      if (r.animationId) cancelAnimationFrame(r.animationId);
      ro.disconnect();
      io.disconnect();
      if (r.mesh) {
        r.scene?.remove(r.mesh);
        r.mesh.geometry.dispose();
        if (r.mesh.material instanceof THREE.Material) {
          r.mesh.material.dispose();
        }
      }
      r.renderer?.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={[
        "absolute inset-0 w-full h-full overflow-hidden pointer-events-none",
        className ?? "",
      ].join(" ")}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
