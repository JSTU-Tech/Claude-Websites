import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";

const boska = localFont({
  src: [
    {
      path: "../public/fonts/Boska-Variable.woff2",
      weight: "200 900",
      style: "normal",
    },
    {
      path: "../public/fonts/Boska-VariableItalic.woff2",
      weight: "200 900",
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
  title: "Stuckey — Websites that turn local searches into booked jobs",
  description:
    "I build websites for trades, hospitality, and professional services that book more jobs than the one you have now. Most sites pay for themselves in 60–90 days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${boska.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <SiteHeader />
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
