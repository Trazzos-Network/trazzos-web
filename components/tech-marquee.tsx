"use client";

import Image from "next/image";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useMemo } from "react";

const LOGO_PATHS = [
  "/tech-logos/1.png",
  "/tech-logos/2.png",
  "/tech-logos/3.png",
  "/tech-logos/4.png",
  "/tech-logos/5.png",
  "/tech-logos/6.png",
  "/tech-logos/7.png",
  "/tech-logos/8.png",
  "/tech-logos/9.png",
  "/tech-logos/10.png",
] as const;

const ANIMATION_DURATION = 24;

export function TechMarquee() {
  const controls = useAnimationControls();
  const duplicatedLogos = useMemo(() => [...LOGO_PATHS, ...LOGO_PATHS], []);

  useEffect(() => {
    controls.start({
      x: "-50%",
      transition: {
        duration: ANIMATION_DURATION,
        ease: "linear",
        repeat: Infinity,
      },
    });
  }, [controls]);

  return (
    <div className="relative border-y border-white/10 bg-[#131313] py-12">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-primary/70">
          Nuestra stack tecnológica
        </p>
        <h3 className="mt-3 text-3xl font-semibold text-foreground/90">
          Tecnología aliada en la que confiamos para construir Trazzos
        </h3>
      </div>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#131313] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#131313] to-transparent" />

        <motion.div
          className="flex w-[200%] gap-16"
          animate={controls}
          initial={{ x: 0 }}
        >
          {duplicatedLogos.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex min-w-[160px] items-center justify-center opacity-80 transition hover:opacity-100"
            >
              <Image
                src={logo}
                alt="Tecnología aliada"
                width={160}
                height={64}
                className="h-12 w-auto object-contain"
                priority={index < LOGO_PATHS.length}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
