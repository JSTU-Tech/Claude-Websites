"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";

/**
 * Kinetic footer — Magic MCP insight: TextHoverEffect / Hover Footer.
 * Massive "KILN HOUSE" SVG wordmark sits at the bottom of the page;
 * a radial-gradient luminance mask follows the cursor and reveals an
 * oxblood-filled version underneath the bone-outline version. On mount
 * the wordmark draws itself via strokeDashoffset.
 *
 * Spring-smoothed cursor tracking so the mask glides instead of jumps.
 * Coordinates are kept in viewBox space (0-600, 0-180) via
 * gradientUnits="userSpaceOnUse" so the spotlight stays geometric.
 */

export function KilnKineticFooter() {
  const svgRef = useRef<SVGSVGElement>(null);
  // Cursor position in viewBox coordinates (0-900, 0-200)
  const x = useMotionValue(450);
  const y = useMotionValue(100);
  const sx = useSpring(x, { stiffness: 150, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 150, damping: 22, mass: 0.4 });

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const handle = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width) * 900;
      const py = ((e.clientY - rect.top) / rect.height) * 200;
      x.set(px);
      y.set(py);
    };
    const leave = () => {
      x.set(450);
      y.set(100);
    };
    svg.addEventListener("mousemove", handle);
    svg.addEventListener("mouseleave", leave);
    return () => {
      svg.removeEventListener("mousemove", handle);
      svg.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  return (
    <footer
      id="kiln-footer"
      className="relative overflow-hidden pt-24 md:pt-32 pb-10"
      style={{ background: "#1C0F08", color: "var(--kiln-bg)" }}
    >
      {/* Top-edge oxblood seam */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--kiln-accent) 50%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-44 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(176,73,42,0.28), transparent 75%)",
        }}
      />

      {/* Editorial info row above the wordmark */}
      <div className="relative px-6 md:px-12 grid grid-cols-2 md:grid-cols-12 gap-y-12 md:gap-x-12">
        <FooterCol
          label="Address"
          lines={["14 Pulteney Bridge", "Bath BA2 4DA"]}
          className="md:col-span-3"
        />
        <FooterCol
          label="Hours"
          lines={["Wed–Sun, 19:00", "Closed Mon & Tue"]}
          className="md:col-span-3"
        />
        <FooterCol
          label="Reservations"
          lines={["+44 1225 555 0142", "hello@kilnhouse.uk"]}
          className="md:col-span-3"
        />
        <FooterCol
          label="Newsletter"
          lines={["The Fortnightly Sheet", "One menu drop, no spam"]}
          className="md:col-span-3"
        />
      </div>

      {/* Massive cursor-reveal wordmark */}
      <div className="relative mt-16 md:mt-24 px-2 md:px-4">
        <svg
          ref={svgRef}
          viewBox="0 0 900 200"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-auto block"
          aria-label="Kiln House wordmark"
        >
          <defs>
            <motion.radialGradient
              id="kiln-reveal"
              cx={sx}
              cy={sy}
              r="180"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#999999" />
              <stop offset="100%" stopColor="#000000" />
            </motion.radialGradient>
            <mask id="kiln-mask">
              <rect width="100%" height="100%" fill="url(#kiln-reveal)" />
            </mask>
          </defs>

          {/* Outline base — always visible, bone */}
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke="rgba(244,235,218,0.55)"
            strokeWidth="0.6"
            fill="transparent"
            style={{
              fontFamily: "var(--font-kiln-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "160px",
              letterSpacing: "-0.045em",
            }}
          >
            KILN HOUSE
          </text>

          {/* Oxblood reveal — fills only where mask is white (cursor area) */}
          <motion.text
            x="50%"
            y="55%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke="var(--kiln-accent-soft)"
            strokeWidth="0.8"
            fill="var(--kiln-accent)"
            mask="url(#kiln-mask)"
            initial={{ strokeDasharray: 1800, strokeDashoffset: 1800 }}
            whileInView={{ strokeDashoffset: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "var(--font-kiln-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "160px",
              letterSpacing: "-0.045em",
            }}
          >
            KILN HOUSE
          </motion.text>
        </svg>
      </div>

      {/* Lower legal / colophon strip */}
      <div
        className="relative mt-12 md:mt-20 px-6 md:px-12 pt-7 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        style={{ borderTop: "1px solid rgba(244,235,218,0.15)" }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="kiln-eyebrow"
            style={{ color: "rgba(244,235,218,0.55)" }}
          >
            Bath · MMXXVI
          </span>
          <span
            className="text-[0.8125rem]"
            style={{ color: "rgba(244,235,218,0.7)" }}
          >
            © Kiln House Ltd. Concept project — fictional client.
          </span>
        </div>
        <Link
          href="/"
          className="kiln-link inline-flex items-center gap-1.5 text-[0.8125rem]"
          style={{ color: "rgba(244,235,218,0.75)" }}
        >
          Site by Stuckey <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  lines,
  className = "",
}: {
  label: string;
  lines: string[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <span
        className="kiln-eyebrow"
        style={{ color: "rgba(244,235,218,0.55)" }}
      >
        {label}
      </span>
      <div
        className="flex flex-col gap-1 text-[0.9375rem]"
        style={{ color: "rgba(244,235,218,0.88)" }}
      >
        {lines.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </div>
    </div>
  );
}
