"use client"

import { Card } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

export function SocialProofSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const cardY = useTransform(scrollYProgress, [0, 1], [50, -50])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8])

  return (
    <section ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance">Han confiado en nosotros</h2>
          <p className="text-lg text-foreground/60 text-balance">Productores en Colombia, Shanghái y Nueva York</p>
        </motion.div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotateX: 0 } : { opacity: 0, scale: 0.9, rotateX: 10 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ y: cardY }}
        >
          <Card className="relative p-12 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-primary/20 overflow-hidden">
            <motion.div
              style={{ scale: glowScale }}
              className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
            />

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, rotate: -45 }}
                animate={isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -45 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Quote className="w-12 h-12 text-primary mb-6" />
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl sm:text-3xl font-medium leading-relaxed mb-6 text-balance"
              >
                "Nuestros clientes ahora conocen el origen exacto de cada botella. La confianza ha aumentado, y nuestras
                ventas también."
              </motion.blockquote>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center"
                >
                  <span className="text-primary font-bold text-lg">V</span>
                </motion.div>
                <div>
                  <p className="font-semibold">Viñedo Partner</p>
                  <p className="text-sm text-foreground/60">Cliente verificado</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.05 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(rgba(154, 255, 141, 0.5) 1.5px, transparent 1.5px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
