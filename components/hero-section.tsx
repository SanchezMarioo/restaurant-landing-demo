"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChefHat } from "lucide-react"

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Posiciones predefinidas para evitar hydration mismatch (reducidas para mejor rendimiento)
  const particlePositions = [
    { left: 84.76, top: 76.60 },
    { left: 21.07, top: 47.18 },
    { left: 39.65, top: 87.98 },
    { left: 44.17, top: 52.26 },
    { left: 47.22, top: 1.50 },
    { left: 54.80, top: 96.54 },
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
      {/* Innovative culinary background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Modern culinary innovation"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black"></div>
      </div>

      {/* Interactive light effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.1), transparent 40%)`,
        }}
      />

      {/* Floating molecular elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={isLoaded ? {
              scale: [0.5, 1.5, 0.5],
              opacity: [0.2, 0.8, 0.2],
              x: [0, (i % 2 === 0 ? 30 : -30)],
              y: [0, (i % 3 === 0 ? 20 : -20)],
            } : {}}
            transition={{
              duration: 6 + (i % 4),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
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
            {/* Innovation badge */}
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 mb-8">
              <ChefHat className="w-5 h-5 mr-2 text-emerald-400" />
              <span className="text-emerald-300 font-medium">ALTA GASTRONOMÍA</span>
            </div>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light mb-8 tracking-tight">
              <span className="block text-white/90">LUMIÈRE</span>
              <span className="block font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 relative">
                RESTAURANT
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-4 leading-relaxed">
              <span className="text-emerald-400 font-medium">
                Donde la tradición culinaria se encuentra con la elegancia moderna
              </span>
            </p>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-12">
              Una experiencia gastronómica refinada con ingredientes de primera calidad y técnicas culinarias
              tradicionales.
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
              onClick={() => {
                const menuSection = document.getElementById("menu")
                if (menuSection) {
                  window.scrollTo({
                    top: menuSection.offsetTop - 80,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Ver Nuestra Carta
            </Button>

            <Button
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50 px-10 py-6 text-lg rounded-full backdrop-blur-xl transition-all duration-300 bg-transparent"
              onClick={scrollToReservation}
            >
              Reservar Experiencia
            </Button>
          </motion.div>

          {/* Scroll indicator */}
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
              <span className="text-emerald-400 text-sm mb-3 font-medium">DESCUBRE LA EXCELENCIA</span>
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
