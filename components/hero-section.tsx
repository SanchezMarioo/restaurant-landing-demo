"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Valores fijos para evitar hydration mismatch
  const floatingElements = [
    { width: 85, height: 72, left: 15, top: 25, duration: 20 },
    { width: 62, height: 55, left: 75, top: 15, duration: 25 },
    { width: 78, height: 68, left: 45, top: 65, duration: 18 },
    { width: 55, height: 62, left: 85, top: 45, duration: 22 },
    { width: 70, height: 58, left: 25, top: 80, duration: 27 },
    { width: 90, height: 75, left: 65, top: 35, duration: 19 },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToReservation = () => {
    const reservationSection = document.getElementById("reservation")
    if (reservationSection) {
      window.scrollTo({
        top: reservationSection.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Restaurant ambiance"
          fill
          priority
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/40 to-black"></div>
      </div>

      {/* Subtle interactive light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`,
        }}
      />

      {/* Elegant floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {floatingElements.map((element, i) => (
          <motion.div
            key={i}
            className="absolute border border-white/10 rounded-lg"
            style={{
              width: element.width,
              height: element.height,
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Elegant badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 mb-8">
              <Sparkles className="w-5 h-5 mr-2 text-emerald-400" />
              <span className="text-emerald-300 font-medium">EXPERIENCIA GASTRONÓMICA ÚNICA</span>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight">
              <span className="block text-white/90">LUMIÈRE</span>
              <span className="block font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 relative">
                RESTAURANT
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 blur-sm opacity-50"
                  animate={{ opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  RESTAURANT
                </motion.div>
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Donde la <span className="text-emerald-400 font-medium">tradición culinaria</span> se encuentra con la
              <span className="text-teal-400 font-medium"> innovación moderna</span> para crear experiencias
              gastronómicas que trascienden lo ordinario.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-10 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
              onClick={scrollToReservation}
            >
              Reservar Mesa
            </Button>

            <Link
              href="/menu"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50 px-10 py-6 text-lg rounded-full backdrop-blur-xl transition-all duration-300 bg-transparent"
            >
              Explorar Menú
            </Link>
          </motion.div>

          {/* Elegant scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : -10 }}
            transition={{
              duration: 0.8,
              delay: 1.4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 0.5,
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-emerald-400 text-sm mb-3 font-medium">DESCUBRE MÁS</span>
              <div className="w-px h-12 bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent relative">
                <motion.div
                  className="absolute top-0 left-0 w-px h-4 bg-gradient-to-b from-emerald-400 to-teal-400"
                  animate={{ y: [0, 32, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
