import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import { BackgroundRandomWalker } from "@/components/BackgroundRandomWalker";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trazzos - Tokeniza, Automatiza y Verifica el Mundo Real",
  description:
    "Transforma productos reales en activos digitales confiables con blockchain, IoT y automatización inteligente.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <BackgroundRandomWalker
          gap={50}
          speed={1200}
          opacity={0.05}
          trailLength={100}
          walkerCount={100}
        />
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full items-center px-4 sm:px-6 lg:px-8">
              <Image
                src="/logo.png"
                alt="Trazzos"
                width={124}
                height={24}
                priority
                className="h-6 w-auto"
              />
            </div>
          </header>
          <Suspense fallback={null}>{children}</Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
