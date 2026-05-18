import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { Grain } from "@/components/grain";
import { CursorLabel } from "@/components/motion/cursor-label";

const generalSans = localFont({
  src: [
    {
      path: "../public/fonts/GeneralSans-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "../public/fonts/GeneralSans-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const switzer = localFont({
  src: [
    {
      path: "../public/fonts/Switzer-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Switzer-VariableItalic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stuckey — Websites that pay for themselves",
  description:
    "Websites for tradespeople, restaurants and professional services across the UK. Built in four weeks, in profit by ninety days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-GB"
      className={`${generalSans.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <Grain />
        <CursorLabel />
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
