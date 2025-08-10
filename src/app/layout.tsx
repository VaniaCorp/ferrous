import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ferrous",
  description: "Ferrous bridges blocked economies to the global money pool turning local currency into smart investments using AI and DeFi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
