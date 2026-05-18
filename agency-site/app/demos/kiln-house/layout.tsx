import type { Metadata } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";

/**
 * Demo client site — Kiln House, a fictional fine-dining restaurant.
 * Lives at /demos/kiln-house. Built as if shipped to a paying client to
 * show the agency's range. Agency chrome (SiteHeader, CursorLabel, Grain)
 * is path-gated off this subtree so the demo reads as a standalone brand.
 */

// Boska — distinctive editorial serif for the restaurant. Scoped variable
// so it doesn't fight the agency's General Sans on /.
const boska = localFont({
  src: [
    {
      path: "../../../public/fonts/Boska-Variable.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Boska-VariableItalic.woff2",
      weight: "200 900",
      style: "italic",
    },
  ],
  variable: "--font-kiln-display",
  display: "swap",
});

const switzer = localFont({
  src: [
    {
      path: "../../../public/fonts/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-kiln-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiln House — Wood-fire dining, Bath",
  description:
    "A fine-dining room above Pulteney Bridge. Wood-fire kitchen, regional wines, a 32-cover seasonal menu changed twice a month.",
};

export default function KilnHouseLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${boska.variable} ${switzer.variable} kiln-root`}
      style={
        {
          // Scoped palette — warm restaurant, deliberately different from
          // the agency's forest-on-dark.
          "--kiln-bg": "#F4EBDA",
          "--kiln-bg-deep": "#E8DCC4",
          "--kiln-paper": "#FBF5E6",
          "--kiln-ink": "#1C1814",
          "--kiln-ink-soft": "#3A332A",
          "--kiln-accent": "#B0492A",
          // Darkened from #8D7E66 → #6E6451 on 2026-05-18 to pass WCAG AA
          // (4.5:1) for body-size text on bone backgrounds. Used for menu
          // course notes, eyebrow labels, story chapter rail, disclaimer.
          "--kiln-accent-soft": "#D77A56",
          "--kiln-muted": "#6E6451",
          "--kiln-rule": "#1C18141A",
        } as React.CSSProperties
      }
    >
      {children}
      <style>{`
        .kiln-root {
          background: var(--kiln-bg);
          color: var(--kiln-ink);
          font-family: var(--font-kiln-body);
          min-height: 100svh;
        }
        .kiln-display { font-family: var(--font-kiln-display); }
        .kiln-eyebrow {
          font-family: var(--font-kiln-body);
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--kiln-muted);
        }
        .kiln-rule { border-top: 1px solid var(--kiln-rule); }
        .kiln-link {
          color: inherit;
          position: relative;
          display: inline-block;
        }
        .kiln-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -0.1em;
          height: 1px;
          width: 100%;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .kiln-link:hover::after { transform: scaleX(1); }
      `}</style>
    </div>
  );
}
