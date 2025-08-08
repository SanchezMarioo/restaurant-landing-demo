"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import DishCard from "./signature-dishes-card"
import type { Dish } from "@/lib/api"

export default function SignatureDishesDynamic() {
  const [isClient, setIsClient] = useState(false)
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isManualNavigation, setIsManualNavigation] = useState(false)
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([])
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)

  // Responsive items per page
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Manejar hidratación del cliente
  useEffect(() => {
    // Timeout para asegurar hidratación completa
    const timer = setTimeout(() => {
      setIsClient(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  // Fetch dishes from API
  useEffect(() => {
    if (!isClient) return
    
    const fetchDishes = async () => {
      try {
        const response = await fetch('/api/dishes')
        if (response.ok) {
          const data = await response.json()
          setDishes(data)
        } else {
          // Fallback to static data if API fails
          setDishes([
            {
              id: 1,
              name: "Solomillo Wellington",
              subtitle: "Especialidad de la Casa",
              description: "Solomillo de ternera envuelto en hojaldre con duxelle de setas y foie gras, acompañado de salsa de vino tinto",
              technique: "Técnica tradicional francesa",
              price: "42€",
              image: {
                id: 1,
                url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Solomillo Wellington",
                width: 800,
                height: 600
              },
              rating: 4.9,
              featured: true,
              category: "Especialidad de la Casa",
            },
            {
              id: 2,
              name: "Lubina en Costra de Sal",
              subtitle: "Pescado Fresco",
              description: "Lubina fresca del Mediterráneo cocinada en costra de sal con hierbas aromáticas y aceite de oliva virgen extra",
              technique: "Cocción tradicional mediterránea",
              price: "38€",
              image: {
                id: 2,
                url: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Lubina en Costra de Sal",
                width: 800,
                height: 600
              },
              rating: 4.8,
              featured: true,
              category: "Pescado Fresco",
            },
            {
              id: 3,
              name: "Tarta Tatin de Manzana",
              subtitle: "Postre Clásico",
              description: "Tarta invertida de manzana caramelizada con masa quebrada artesanal, servida con helado de vainilla bourbon",
              technique: "Repostería francesa tradicional",
              price: "16€",
              image: {
                id: 3,
                url: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3",
                alt: "Tarta Tatin de Manzana",
                width: 800,
                height: 600
              },
              rating: 4.9,
              featured: true,
              category: "Postre Clásico",
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching dishes:', error)
        // Use fallback data
        setDishes([
          {
            id: 1,
            name: "Solomillo Wellington",
            subtitle: "Especialidad de la Casa",
            description: "Solomillo de ternera envuelto en hojaldre con duxelle de setas y foie gras, acompañado de salsa de vino tinto",
            technique: "Técnica tradicional francesa",
            price: "42€",
            image: {
              id: 1,
              url: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
              alt: "Solomillo Wellington",
              width: 800,
              height: 600
            },
            rating: 4.9,
            featured: true,
            category: "Especialidad de la Casa",
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchDishes()
  }, [isClient])
  
  useEffect(() => {
    if (!isClient) return
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2)
      } else {
        setItemsPerPage(3)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isClient])

  const totalPages = Math.ceil(dishes.length / itemsPerPage)

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalPages) {
      setCurrentIndex(index)
      setIsManualNavigation(true)
      
      // Clear existing timeout
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
      
      // Resume auto-play after 8 seconds
      autoPlayRef.current = setTimeout(() => {
        setIsManualNavigation(false)
      }, 8000)
    }
  }, [totalPages])

  const nextSlide = useCallback(() => {
    goToSlide((currentIndex + 1) % totalPages)
  }, [currentIndex, totalPages, goToSlide])

  const prevSlide = useCallback(() => {
    goToSlide((currentIndex - 1 + totalPages) % totalPages)
  }, [currentIndex, totalPages, goToSlide])

  // Auto-advance slider (only when not manually navigating)
  useEffect(() => {
    if (!isClient || totalPages <= 1) return
    
    if (!isManualNavigation && totalPages > 1) {
      autoPlayRef.current = setTimeout(() => {
        setCurrentIndex(prev => (prev + 1) % totalPages)
      }, 6000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current)
      }
    }
  }, [currentIndex, isManualNavigation, totalPages, isClient])

  // Generate particles only on client side
  useEffect(() => {
    if (!isClient) return
    
    // Only generate particles if user doesn't prefer reduced motion
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
    
    const generateParticles = () => {
      const particleCount = window.innerWidth < 768 ? 6 : 12 // Reduced count
      const newParticles = [...Array(particleCount)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 6, // Slower animations
      }))
      setParticles(newParticles)
    }

    // Delay particle generation to not block initial render
    const timer = setTimeout(generateParticles, 500)
    return () => clearTimeout(timer)
  }, [isClient])

  const startIndex = currentIndex * itemsPerPage
  const currentDishes = dishes.slice(startIndex, startIndex + itemsPerPage)

  // Mostrar loader hasta que esté hidratado y los datos estén listos
  if (!isClient || loading) {
    return (
      <section id="signature-menu" className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
              <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 bg-emerald-400/20 rounded animate-pulse"></div>
              <div className="w-48 h-4 bg-white/10 rounded animate-pulse"></div>
            </div>
            <div className="w-96 h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mx-auto mb-6 animate-pulse"></div>
            <div className="w-full max-w-3xl h-6 bg-white/5 rounded mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10">
                <div className="aspect-[4/3] w-full bg-gradient-to-b from-zinc-800/70 to-zinc-900/70 animate-pulse"></div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div className="h-5 sm:h-6 bg-zinc-800/70 rounded-md w-3/4 animate-pulse"></div>
                  <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-full animate-pulse"></div>
                  <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="signature-menu" className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              scale: [0.8, 1, 0.8],
              opacity: [0.2, 0.5, 0.2],
              y: [0, -15, 0],
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

      <motion.div 
        className="container mx-auto max-w-7xl relative z-10"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-400" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium">ESPECIALIDADES DE LA CASA</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Nuestras Especialidades
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed px-4">
            Platos elaborados con técnicas tradicionales y los mejores ingredientes, creando experiencias gastronómicas
            memorables.
          </p>
        </motion.div>

        {/* Dishes Grid/Slider */}
        <div className="relative mb-12 sm:mb-16">
          {/* Navigation Controls - Only show when there are multiple pages */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <button
                onClick={prevSlide}
                className="bg-white/5 hover:bg-white/10 text-white p-2 sm:p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              <div className="flex space-x-1.5 sm:space-x-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 focus:outline-none",
                      index === currentIndex 
                        ? "bg-emerald-500 w-6 sm:w-8" 
                        : "bg-white/30 hover:bg-white/50 w-2"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="bg-white/5 hover:bg-white/10 text-white p-2 sm:p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          )}

          {/* Dishes Display */}
          <div className="overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
                ease: "easeInOut"
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            >
              {currentDishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                >
                  <DishCard dish={dish} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/menu">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 group transition-all duration-300">
              <span>Explorar Carta Completa</span>
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
