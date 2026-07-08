"use client"

import type React from "react"
import { motion, useReducedMotion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

/**
 * Reveal on-scroll sobrio y único del sistema: fade + 12px, una sola vez,
 * ease-out exponencial. Con prefers-reduced-motion pasa a crossfade corto
 * sin desplazamiento.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.2 : 0.7,
        delay: reduce ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}
