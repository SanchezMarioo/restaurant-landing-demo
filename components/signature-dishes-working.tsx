"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import DishCard from "./signature-dishes-card"
import type { Dish } from "@/lib/api"

export default function SignatureDishesWorking() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [isLoaded, setIsLoaded] = useState(false)

  // Datos de fallback siempre disponibles
  const fallbackDishes: Dish[] = [
    {
      id: 1,
      name: "Solomillo Wellington",
      subtitle: "Especialidad de la Casa", 
      description: "Solomillo de ternera envuelto en hojaldre con técnica francesa",
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
      description: "Lubina fresca con costra de sal y hierbas mediterráneas",
      technique: "Cocción mediterránea", 
      price: "38€",
      image: {
        id: 2,
        url: "/placeholder.jpg",
        alt: "Lubina en Costra",
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
      description: "Tarta de manzana caramelizada con técnica francesa tradicional",
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
    },
    {
      id: 4,
      name: "Risotto de Trufa",
      subtitle: "Arroz Cremoso",
      description: "Risotto cremoso con trufa negra y parmesano envejecido",
      technique: "Cocina italiana",
      price: "32€",
      image: {
        id: 4,
        url: "/placeholder.jpg",
        alt: "Risotto de Trufa",
        width: 600,
        height: 600
      },
      rating: 4.7,
      featured: true,
      category: "Principal"
    },
    {
      id: 5,
      name: "Rodaballo Asado",
      subtitle: "Pescado Premium",
      description: "Rodaballo fresco asado con verduras de temporada",
      technique: "Asado perfecto",
      price: "45€",
      image: {
        id: 5,
        url: "/placeholder.jpg",
        alt: "Rodaballo Asado",
        width: 600,
        height: 600
      },
      rating: 4.8,
      featured: true,
      category: "Pescado"
    },
    {
      id: 6,
      name: "Crème Brûlée",
      subtitle: "Postre Clásico",
      description: "Crema catalana tradicional con azúcar caramelizado",
      technique: "Repostería tradicional",
      price: "14€",
      image: {
        id: 6,
        url: "/placeholder.jpg",
        alt: "Crème Brûlée",
        width: 600,
        height: 600
      },
      rating: 4.9,
      featured: true,
      category: "Postre"
    }
  ]

  // Inicialización inmediata
  useEffect(() => {
    setDishes(fallbackDishes)
    setIsLoaded(true)
    
    // Cargar API en segundo plano
    const loadApiData = async () => {
      try {
        const response = await fetch('/api/dishes')
        if (response.ok) {
          const apiDishes = await response.json()
          if (apiDishes && apiDishes.length > 0) {
            // Usar solo featured=true
            const onlyFeatured = apiDishes.filter((d: Dish) => d.featured)
            if (onlyFeatured.length > 0) setDishes(onlyFeatured)
          }
        }
      } catch (error) {
        console.log('Using fallback data')
      }
    }
    
    // Delay mínimo para evitar problemas de hidratación
    setTimeout(loadApiData, 500)
  }, [])

  // Responsive
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth
      setItemsPerPage(width < 768 ? 1 : width < 1024 ? 2 : 3)
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
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

  // Auto advance
  useEffect(() => {
    if (!isLoaded || totalPages <= 1) return
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalPages)
    }, 6000)

    return () => clearTimeout(timer)
  }, [currentIndex, totalPages, isLoaded])

  const startIndex = currentIndex * itemsPerPage
  const currentDishes = dishes.slice(startIndex, startIndex + itemsPerPage)

  if (!isLoaded) {
    return (
      <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <div className="w-4 h-4 mr-2 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-emerald-400 text-sm font-medium">CARGANDO ESPECIALIDADES</span>
            </div>
            <h2 className="font-serif text-6xl font-bold mb-6 text-emerald-400">
              Nuestras Especialidades
            </h2>
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
            Platos elaborados con técnicas tradicionales y los mejores ingredientes de temporada.
          </p>
        </div>

        {/* Navigation */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-4 mb-8">
            <button
              onClick={prevSlide}
              className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              aria-label="Plato anterior"
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
                  aria-label={`Ir a página ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="bg-white/5 hover:bg-white/10 text-white p-3 rounded-full border border-white/10 hover:border-emerald-500/30 transition-all duration-300"
              aria-label="Siguiente plato"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Dishes Grid */}
        <div className="mb-16">
          <div
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-opacity duration-500"
            style={{ 
              opacity: 1,
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          >
            {currentDishes.map((dish, idx) => (
              <div
                key={dish.id}
                className="transition-all duration-300"
                style={{ 
                  animationDelay: `${idx * 100}ms`,
                  transform: 'translateZ(0)'
                }}
              >
                <DishCard dish={dish} index={idx} />
              </div>
            ))}
          </div>
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
