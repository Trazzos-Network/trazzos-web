"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ClientsSection } from "./clients-section";

export function HeroSection() {
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${e.clientX}px`;
        cursorGlowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center flex-col overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Cursor glow effect */}
      <div
        ref={cursorGlowRef}
        className="pointer-events-none fixed w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] transition-opacity duration-300 opacity-0 hover:opacity-100 z-0"
        style={{ transition: "left 0.15s ease-out, top 0.15s ease-out" }}
      />

      <motion.div
        style={{ y }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent blur-3xl"
      />

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-5xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-foreground/80">
            Tokeniza, Automatiza y Verifica
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] text-balance"
        >
          Tokeniza el{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            mundo real
          </span>{" "}
          con <br />
          confianza{" "}
          <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
            verificable
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-foreground/60 max-w-3xl mx-auto mb-12 leading-relaxed text-balance"
        >
          Digitaliza, automatiza y tokeniza con Trazzos para construir
          confianza, eficiencia y valor económico desde el origen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="group relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold animate-glow"
          >
            <span className="relative z-10 flex items-center gap-2">
              Agenda una reunión
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </span>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 hover:bg-primary/10 hover:border-primary/50 px-8 py-6 text-lg font-semibold backdrop-blur-sm bg-transparent"
          >
            Conoce más
          </Button>
        </motion.div>

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
          className="absolute top-1/4 right-10 w-32 h-32 border border-primary/20 rounded-lg rotate-12"
          animate={{ rotate: [12, 24, 12] }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "80%"]) }}
          className="absolute bottom-1/4 left-10 w-24 h-24 border border-primary/20 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </motion.div>
      <ClientsSection />
    </section>
  );
}
