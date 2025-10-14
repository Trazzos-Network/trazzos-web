"use client";

import Image from "next/image";
import { Linkedin, Instagram, Twitter } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.2 });

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: "spring" as const,
        stiffness: 200,
      },
    }),
  };

  return (
    <footer
      ref={footerRef}
      className="relative border-t border-primary/10 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Image
              src="/logo.png"
              alt="Trazzos"
              width={160}
              height={40}
              className="h-6 w-auto mb-3"
            />
            <p className="text-sm text-foreground/60">Cartagena, Colombia</p>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold mb-3">Contacto</h4>
            <div className="space-y-2 text-sm text-foreground/60">
              <p>contacto@trazzos.com</p>
              <p>www.trazzos.com</p>
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-semibold mb-3">Síguenos</h4>
            <div className="flex gap-4">
              {[
                { Icon: Linkedin, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  custom={i}
                  variants={iconVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors duration-300"
                >
                  <Icon className="w-5 h-5 text-primary" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-primary/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-foreground/50"
        >
          <p>© 2025 Trazzos™. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <motion.a
              href="#"
              whileHover={{ color: "rgb(154, 255, 141)", y: -2 }}
              className="hover:underline transition-colors duration-300"
            >
              Términos y condiciones
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ color: "rgb(154, 255, 141)", y: -2 }}
              className="hover:underline transition-colors duration-300"
            >
              Política de privacidad
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
