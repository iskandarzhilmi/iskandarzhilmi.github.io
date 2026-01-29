import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iskandar Hilmi | Software Engineer",
  description:
    "Software Engineer specializing in Flutter, React, and AI-driven solutions. Building scalable apps that solve real problems.",
  openGraph: {
    title: "Iskandar Hilmi | Software Engineer",
    description:
      "Software Engineer specializing in Flutter, React, and AI-driven solutions.",
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
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
