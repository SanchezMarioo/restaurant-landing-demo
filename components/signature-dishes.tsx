"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import DishCard from "./signature-dishes-card" // Import the new component

const signatureDishes = [
  {
    id: 1,
    name: "Solomillo Wellington",
    subtitle: "Especialidad de la Casa",
    description:
      "Solomillo de ternera envuelto en hojaldre con duxelle de setas y foie gras, acompañado de salsa de vino tinto",
    technique: "Técnica tradicional francesa",
    price: "42€",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.9,
    featured: true,
    category: "Especialidad de la Casa",
  },
  {
    id: 2,
    name: "Lubina en Costra de Sal",
    subtitle: "Pescado Fresco",
    description:
      "Lubina fresca del Mediterráneo cocinada en costra de sal con hierbas aromáticas y aceite de oliva virgen extra",
    technique: "Cocción tradicional mediterránea",
    price: "38€",
    image:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.8,
    featured: true,
    category: "Pescado Fresco",
  },
  {
    id: 3,
    name: "Tarta Tatin de Manzana",
    subtitle: "Postre Clásico",
    description:
      "Tarta invertida de manzana caramelizada con masa quebrada artesanal, servida con helado de vainilla bourbon",
    technique: "Repostería francesa tradicional",
    price: "16€",
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.9,
    featured: true,
    category: "Postre Clásico",
  },
  {
    id: 4,
    name: "Ceviche de Pulpo",
    subtitle: "Delicia Marina",
    description: "Fresco pulpo marinado en leche de tigre con boniato y maíz chulpi",
    technique: "Cocina peruana",
    price: "26€",
    image: "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.7,
    featured: false,
    category: "Entrante",
  },
  {
    id: 5,
    name: "Pato Confitado",
    subtitle: "Clásico Francés",
    description: "Muslo de pato confitado lentamente, crujiente por fuera y tierno por dentro, con puré de patata trufado",
    technique: "Cocción lenta tradicional",
    price: "35€",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.9,
    featured: false,
    category: "Principal",
  },
  {
    id: 6,
    name: "Soufflé de Grand Marnier",
    subtitle: "Ligereza y Sabor",
    description: "Soufflé aireado con licor Grand Marnier, servido con salsa de naranja",
    technique: "Repostería clásica",
    price: "15€",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3",
    rating: 4.8,
    featured: false,
    category: "Postre",
  },
]

export default function SignatureDishes() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const [currentPage, setCurrentPage] = useState(0)
  const [direction, setDirection] = useState(0) // 0: initial, 1: next, -1: prev
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const itemsPerPage = 3
  const totalPages = Math.ceil(signatureDishes.length / itemsPerPage)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }, [totalPages])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  // Auto-advance slider
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      nextSlide()
    }, 5000) // Cambia de slide cada 5 segundos

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentPage, nextSlide])

  // Generate particles only on client side to avoid hydration mismatch
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [...Array(15)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 6 + 4,
      }))
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  const startIndex = currentPage * itemsPerPage
  const currentDishes = signatureDishes.slice(startIndex, startIndex + itemsPerPage)

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section id="signature-menu" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -30, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y }} className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <Sparkles className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">ESPECIALIDADES DE LA CASA</span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Nuestras Especialidades
          </h2>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Platos elaborados con técnicas tradicionales y los mejores ingredientes, creando experiencias gastronómicas
            memorables.
          </p>
        </motion.div>

        {/* Signature Dishes Slider */}
        <div className="relative mb-16">
        {/* Navigation Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                prevSlide()
              }}
              className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (timeoutRef.current) clearTimeout(timeoutRef.current)
                    setDirection(index > currentPage ? 1 : -1)
                    setCurrentPage(index)
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentPage ? "bg-emerald-500 w-6" : "bg-white/30 hover:bg-white/50",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current)
                nextSlide()
              }}
              className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {currentDishes.map((dish, index) => (
                <DishCard key={dish.id} dish={dish} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/menu">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 group">
              <span>Explorar Carta Completa</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

