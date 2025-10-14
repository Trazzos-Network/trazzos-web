"use client";

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "Luis Ángel Carmona Tache",
    role: "Director Financiero – KMA Construcciones S.A.S.",
    description:
      "+10 años en estructuración financiera y gestión de riesgos en proyectos de infraestructura. Magíster en Proyectos de Inversión, especialista en Finanzas y máster en Fintech e Innovación Financiera (EADA – Barcelona). Experiencia en project finance (+$50 billones COP) e innovación financiera con enfoque en blockchain y tokenización.",
    image: "/team/1.png",
    keywords: [
      "Project finance",
      "Tokenización",
      "Gestión de riesgo",
      "Legal Tech",
    ],
  },
  {
    name: "Jennifer Salazar Duke",
    role: "CEO – Salazar Duke Impact Hub",
    description:
      "Administradora de Negocios Internacionales y Especialista en Finanzas y Proyectos. CDEO (Chief Data & Digital Transformation Officer) con experiencia en machine learning, innovación digital e impacto social. 6 años como traductora y paralegal en casos de extradición, integrando gestión financiera, tecnología y compromiso social para liderar procesos de transformación.",
    image: "/team/2.png",
    keywords: [
      "Innovación digital",
      "Impacto social",
      "Machine learning",
      "Agentic Flows",
    ],
  },
  {
    name: "Fito Segrera",
    role: "Desarrollador Full-Stack & Emprendedor Tecnológico",
    description:
      "Becario Fulbright y MFA in Design & Technology (Parsons, NY). Fundador de CAC Lab (Shanghái) y líder en Blazar Labs, donde impulsa tokenización, trazabilidad, IoT y dApps con impacto social. Especialista en Cardano, Ethereum/Polygon y stack full-stack/IoT, aporta al equipo ejecución técnica sólida y visión estratégica para transformar industrias con tecnología disruptiva.",
    image: "/team/3.png",
    keywords: [
      "Fullstack Senior Developer",
      "Blockchain",
      "IoT",
      "dApps",
      " Ai / Agents",
      "Cardano",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.8, 0.2, 1] as const,
    },
  },
};

export function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section ref={sectionRef} className="relative py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-balance">
            Nuestro equipo
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto text-balance">
            Expertos en tecnología, finanzas e innovación trabajando para
            transformar industrias
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-10 md:grid-cols-3"
        >
          {team.map((member, index) => (
            <motion.article key={member.name} variants={cardVariants}>
              <motion.div
                className="group h-full"
                whileHover={{ y: -10, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
              >
                <Card className="relative flex h-full flex-col overflow-hidden border-white/10 bg-card/70 p-8 backdrop-blur">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative rounded-full mb-6 overflow-hidden border border-white/10 bg-black/40">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={640}
                      height={720}
                      className="h-80 rounded-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="relative space-y-3">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-semibold text-foreground">
                        {member.name}
                      </h3>
                      {/* <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                        {member.role}
                      </p> */}
                      <p className="text-sm capitalize tracking-[0.1em] text-primary/80">
                        {member.keywords.join(" • ")}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/70">
                      {member.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/40">
                      <span className="inline-flex h-2 w-2 rounded-full bg-primary/70" />
                      <span>Trazzos Leadership</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
