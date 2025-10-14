"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const logos = [
  "/logos/1.svg",
  "/logos/2.svg",
  "/logos/3.svg",
  "/logos/4.svg",
  "/logos/5.svg",
  "/logos/6.svg",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* <p className="text-sm uppercase tracking-[0.3em] text-foreground/50">Nuestros Clientes</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mt-2">Confían en Trazzos para transformar sus cadenas de valor</h2> */}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center"
        >
          {logos.map((logoSrc, index) => (
            <motion.div
              key={logoSrc}
              variants={itemVariants}
              className="relative flex items-center justify-center rounded-lg border border-primary/10 bg-card/40 px-6 py-4 backdrop-blur transition hover:border-primary/30"
            >
              <Image
                src={logoSrc}
                alt={`Logo cliente ${index + 1}`}
                width={180}
                height={64}
                className="h-12 w-auto opacity-80"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
