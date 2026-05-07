import type { Metadata } from "next";
import { Fraunces, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-body",
  axes: ["opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iskandar Hilmi — Dossier",
  description:
    "A working dossier of an engineer & indie maker shipping mobile, web, and AI products from Kuala Lumpur.",
  openGraph: {
    title: "Iskandar Hilmi — Dossier",
    description:
      "A working dossier of an engineer & indie maker shipping mobile, web, and AI products from Kuala Lumpur.",
    type: "website",
    url: "https://iskandarzhilmi.github.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
