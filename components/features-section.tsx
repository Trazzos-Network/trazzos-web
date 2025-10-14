"use client"

import { Card } from "@/components/ui/card"
import { Search, Cog, Coins } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const features = [
  {
    icon: Search,
    title: "Trazabilidad verificada",
    description: "Transparencia total sobre el origen y recorrido de productos físicos.",
  },
  {
    icon: Cog,
    title: "Automatización inteligente",
    description: "Optimiza operaciones con IA e IoT para mayor eficiencia.",
  },
  {
    icon: Coins,
    title: "Tokenización con propósito",
    description: "Convierte productos únicos en activos digitales con valor global.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <section ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">Beneficios clave</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Construye confianza y eficiencia en cada paso de tu cadena de valor
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="group relative p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-500 h-full">
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 -z-10"
                    whileHover={{
                      background:
                        "linear-gradient(to bottom right, rgba(154, 255, 141, 0.05), rgba(154, 255, 141, 0.1), rgba(154, 255, 141, 0.05))",
                    }}
                    transition={{ duration: 0.5 }}
                  />

                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                    >
                      <Icon className="w-7 h-7 text-primary" />
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                      {feature.title}
                    </h3>

                    <p className="text-foreground/60 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t border-r border-primary/20 rounded-tr-lg group-hover:border-primary/40 transition-colors duration-300" />
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
