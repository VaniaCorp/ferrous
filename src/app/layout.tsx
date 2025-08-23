import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { ReactLenis } from "@/lib/lenis";
import "./globals.css";
import LenisProvider from "@/providers/lenis-provider";

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
      <LenisProvider>
        <body
          className={`${dmSans.variable} ${robotoMono.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          {children}
        </body>
      </LenisProvider>
    </html>
  );
}
