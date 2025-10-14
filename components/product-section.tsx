"use client"

import { Card } from "@/components/ui/card"
import { Bot, Globe, BarChart3 } from "lucide-react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"

const tripodElements = [
  {
    icon: Bot,
    title: "Automatización + IoT",
    description: "Digitaliza procesos físicos, reduce errores y mejora tiempos con tecnología inteligente.",
  },
  {
    icon: Globe,
    title: "Tokenización Blockchain",
    description: "Convierte productos y procesos en activos digitales únicos, auditables y comerciables.",
  },
  {
    icon: BarChart3,
    title: "Trazabilidad Digital",
    description:
      "Brinda confianza verificable a consumidores y aliados mostrando cada paso del ciclo de vida del activo.",
  },
]

export function ProductSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const backgroundRotate = useTransform(scrollYProgress, [0, 1], [0, 45])

  const card1Y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -150])
  const cardYTransforms = [card1Y, card2Y, card3Y]

  return (
    <section ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div
        style={{ y: backgroundY, rotate: backgroundRotate }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-conic from-primary/5 via-transparent to-transparent blur-3xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-balance">
            El Trípode{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent">
              Trazzos
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Así funciona nuestra tecnología para transformar tu industria
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {tripodElements.map((element, index) => {
            const Icon = element.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                style={{ y: cardYTransforms[index] }}
              >
                <Card className="relative p-8 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-500 group h-full">
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{
                        scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }}
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-glow"
                    >
                      <Icon className="w-8 h-8 text-primary" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-balance">{element.title}</h3>

                    <p className="text-foreground/70 leading-relaxed">{element.description}</p>
                  </div>

                  {/* Connection line indicator */}
                  {index < tripodElements.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                      className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/40 to-transparent origin-left"
                    />
                  )}
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 backdrop-blur-sm">
            <p className="text-xl sm:text-2xl font-semibold text-balance">
              <span className="text-foreground/80">El resultado:</span>{" "}
              <span className="text-primary">Eficiencia operativa</span>
              {" + "}
              <span className="text-primary">Confianza verificable</span>
              {" + "}
              <span className="text-primary">Nuevas economías</span>
              {" = "}
              <span className="text-foreground font-bold">Impacto Trazzos</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
