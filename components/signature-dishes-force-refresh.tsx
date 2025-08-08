"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"
import { Star, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import DishCard from "./signature-dishes-card"
import type { Dish } from "@/lib/api"

export default function SignatureDishesForcedRefresh() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [showContent, setShowContent] = useState(false)
  const hasInitializedRef = useRef(false)

  // Fetch dishes immediately
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch('/api/dishes')
        if (response.ok) {
          const data = await response.json()
          setDishes(data)
        } else {
          // Fallback data
          setDishes([
            {
              id: 1,
              name: "Solomillo Wellington",
              subtitle: "Especialidad de la Casa", 
              description: "Solomillo de ternera envuelto en hojaldre",
              technique: "Técnica francesa",
              price: "42€",
              image: {
                id: 1,
                url: "/placeholder.jpg",
                alt: "Solomillo Wellington",
                width: 600,
                height: 600
              },
              rating: 4.9,
              featured: true,
              category: "Principal"
            },
            {
              id: 2,
              name: "Lubina en Costra",
              subtitle: "Pescado Fresco",
              description: "Lubina con costra de sal y hierbas",
              technique: "Cocción mediterránea", 
              price: "38€",
              image: {
                id: 2,
                url: "/placeholder.jpg",
                alt: "Lubina",
                width: 600,
                height: 600
              },
              rating: 4.8,
              featured: true,
              category: "Pescado"
            },
            {
              id: 3,
              name: "Tarta Tatin",
              subtitle: "Postre Clásico",
              description: "Tarta de manzana caramelizada",
              technique: "Repostería francesa",
              price: "16€", 
              image: {
                id: 3,
                url: "/placeholder.jpg",
                alt: "Tarta Tatin",
                width: 600,
                height: 600
              },
              rating: 4.9,
              featured: true,
              category: "Postre"
            }
          ])
        }
      } catch (error) {
        console.error('Error fetching dishes:', error)
        setDishes([]) // En caso de error, array vacío
      } finally {
        setLoading(false)
        // Trigger immediate refresh after load
        if (!hasInitializedRef.current) {
          hasInitializedRef.current = true
          setTimeout(() => {
            setShowContent(true)
          }, 1000) // 1 segundo de delay inicial
        }
      }
    }

    fetchDishes()
  }, [])

  // Handle responsive items per page
  useEffect(() => {
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
  }, [])

  const totalPages = Math.ceil(dishes.length / itemsPerPage)

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % totalPages)
  }, [totalPages])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + totalPages) % totalPages)
  }, [totalPages])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  // Auto advance effect - activado por showContent
  useEffect(() => {
    if (totalPages <= 1 || !showContent) return
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => {
        const newIndex = (prev + 1) % totalPages
        return newIndex
      })
    }, 6000)

    return () => clearTimeout(timer)
  }, [currentIndex, totalPages, showContent])

  const startIndex = currentIndex * itemsPerPage
  const currentDishes = dishes.slice(startIndex, startIndex + itemsPerPage)

  // Mostrar skeleton mientras está cargando O durante el delay inicial
  if (loading || !showContent) {
    return (
      <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <div className="w-4 h-4 mr-2 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-emerald-400 text-sm font-medium">
                {loading ? "CARGANDO ESPECIALIDADES" : "PREPARANDO PRESENTACIÓN"}
              </span>
            </div>
            <h2 className="font-serif text-6xl font-bold mb-6 text-emerald-400">
              Nuestras Especialidades
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              {loading ? "Preparando nuestros mejores platos..." : "Iniciando presentación automática..."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-zinc-900/50 rounded-2xl border border-white/10 overflow-hidden">
                <div className="aspect-[4/3] bg-zinc-800/50 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-zinc-800/50 rounded animate-pulse"></div>
                  <div className="h-4 bg-zinc-800/50 rounded animate-pulse"></div>
                  <div className="h-4 bg-zinc-800/50 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-emerald-400" />
            <span className="text-emerald-400 text-xs sm:text-sm font-medium">ESPECIALIDADES DE LA CASA</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Nuestras Especialidades
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed px-4">
            Platos elaborados con técnicas tradicionales y los mejores ingredientes.
          </p>
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={prevSlide}
              className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentIndex 
                      ? "bg-emerald-500 w-8" 
                      : "bg-white/30 hover:bg-white/50 w-2"
                  )}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        <div className="mb-16">
          <motion.div
            key={`${currentIndex}-${showContent ? 'active' : 'loading'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {currentDishes.map((dish, idx) => (
              <motion.div
                key={`${dish.id}-${showContent ? 'loaded' : 'loading'}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <DishCard dish={dish} index={idx} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/menu">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 group transition-all duration-300">
              <span>Explorar Carta Completa</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
