"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

interface OptimizedParticlesProps {
  count?: number
  className?: string
  opacity?: number
  size?: 'sm' | 'md' | 'lg'
  speed?: 'slow' | 'medium' | 'fast'
}

export default function OptimizedParticles({ 
  count = 8, 
  className = "bg-emerald-400/20",
  opacity = 0.2,
  size = 'sm',
  speed = 'slow'
}: OptimizedParticlesProps) {
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])

  useEffect(() => {
    // Check for reduced motion preference
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const generateParticles = () => {
      const newParticles = [...Array(count)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: speed === 'fast' ? Math.random() * 3 + 2 : 
                 speed === 'medium' ? Math.random() * 4 + 4 : 
                 Math.random() * 6 + 6,
      }))
      setParticles(newParticles)
    }

    // Delay generation to not block initial render
    const timer = setTimeout(generateParticles, 300)
    return () => clearTimeout(timer)
  }, [count, speed])

  const sizeClass = {
    sm: 'w-1 h-1',
    md: 'w-1.5 h-1.5', 
    lg: 'w-2 h-2'
  }[size]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute ${sizeClass} ${className} rounded-full`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [opacity * 0.5, opacity, opacity * 0.5],
            y: [0, -15, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}
