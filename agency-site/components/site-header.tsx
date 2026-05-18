"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { studio } from "@/lib/studio";
import { Magnetic } from "@/components/motion/magnetic";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function SiteHeader() {
  const pathname = usePathname();
  if (pathname?.startsWith("/demos")) return null;
  const prefersReduced = useReducedMotion();
  const fade = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: EASE_QUART },
      };

  return (
    <motion.header className="w-full" {...fade}>
      <div className="mx-auto flex items-baseline justify-between px-6 pt-6 pb-5 md:px-10 md:pt-8">
        <Magnetic radius={70} maxPull={4}>
          <Link
            href="/"
            className="font-display text-[1.375rem] leading-none tracking-tight inline-block"
            aria-label={`${studio.wordmark} — home`}
          >
            {studio.wordmark}
            <span className="text-accent">.</span>
          </Link>
        </Magnetic>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-7 text-[0.875rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Magnetic radius={50} maxPull={3}>
                  <Link
                    href={item.href}
                    data-cursor="Open"
                    className="link-underline"
                  >
                    {item.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="rule mx-6 md:mx-10" />
    </motion.header>
  );
}
