"use client"

import { Card } from "@/components/ui/card"
import { Briefcase, Lightbulb, Code } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const team = [
  {
    name: "Luis Carmona",
    role: "Director Financiero",
    description:
      "Experto en Fintech y Project Finance con más de 10 años de experiencia estructurando proyectos por +$50 billones COP.",
    icon: Briefcase,
  },
  {
    name: "Jennifer Salazar",
    role: "CEO",
    description:
      "Líder en transformación digital, combina impacto social, datos e innovación para rediseñar realidades.",
    icon: Lightbulb,
  },
  {
    name: "Fito Segrera",
    role: "CTO",
    description:
      "Emprendedor global y desarrollador full-stack, especializado en tokenización, IoT y blockchain con propósito.",
    icon: Code,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: -15 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
}

export function TeamSection() {
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">Nuestro equipo</h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Expertos en tecnología, finanzas e innovación trabajando para transformar industrias
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {team.map((member, index) => {
            const Icon = member.icon

            return (
              <motion.div key={index} variants={cardVariants}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card className="group relative p-8 bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-500 h-full">
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-b from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />

                    <div className="relative">
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6"
                      >
                        <Icon className="w-6 h-6 text-primary" />
                      </motion.div>

                      <h3 className="text-2xl font-bold mb-1">{member.name}</h3>

                      <p className="text-primary font-semibold mb-4">{member.role}</p>

                      <p className="text-foreground/60 leading-relaxed text-sm">{member.description}</p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-primary/20 rounded-bl-lg group-hover:border-primary/40 transition-colors duration-300" />
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
