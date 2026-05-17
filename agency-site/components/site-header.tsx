import Link from "next/link";
import { studio } from "@/lib/studio";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="w-full">
      <div className="mx-auto flex items-baseline justify-between px-6 pt-6 pb-5 md:px-10 md:pt-8">
        <Link
          href="/"
          className="font-display text-[1.375rem] leading-none tracking-tight"
          aria-label={`${studio.wordmark} — home`}
        >
          {studio.wordmark}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary">
          <ul className="flex items-center gap-7 text-[0.875rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="rule mx-6 md:mx-10" />
    </header>
  );
}
