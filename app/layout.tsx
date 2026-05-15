import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iskandar Hilmi",
  description:
    "Software engineer and indie maker shipping mobile, web, and AI products from Kuala Lumpur.",
  openGraph: {
    title: "Iskandar Hilmi",
    description:
      "Software engineer and indie maker shipping mobile, web, and AI products from Kuala Lumpur.",
    type: "website",
    url: "https://iskandarzhilmi.github.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
