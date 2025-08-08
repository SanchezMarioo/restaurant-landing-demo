"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import type { Dish } from "@/lib/api"

// Componente de tarjeta optimizado sin Framer Motion
function OptimizedDishCard({ dish, index }: { dish: Dish; index: number }) {
  return (
    <div 
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 transition-all duration-500 hover:bg-zinc-800/50 hover:border-emerald-500/30"
      style={{
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
    >
      <div className="aspect-[4/3] w-full relative overflow-hidden">
        <img
          src={dish.image.url}
          alt={dish.image.alt || dish.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          width={600}
          height={450}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm">
            <div className="w-3 h-3 text-yellow-400">★</div>
            <span className="text-white text-sm font-medium">{dish.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300 truncate">
                {dish.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-400 font-medium mb-2">
              {dish.subtitle}
            </p>
            <p className="text-sm sm:text-base text-zinc-300 line-clamp-2 leading-relaxed">
              {dish.description}
            </p>
          </div>
          <div className="flex-shrink-0 text-right">
            <div className="text-lg sm:text-xl font-bold text-emerald-400">
              {dish.price}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-xs sm:text-sm text-zinc-400">
              {dish.technique}
            </span>
            <span className="text-xs sm:text-sm text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-full">
              {dish.category}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SignatureDishesPure() {
  const [dishes, setDishes] = useState<Dish[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
  const [mounted, setMounted] = useState(false)

  // Datos de fallback ultra-ligeros
  const fallbackDishes: Dish[] = [
    {
      id: 1,
      name: "Solomillo Wellington",
      subtitle: "Especialidad de la Casa", 
      description: "Solomillo de ternera envuelto en hojaldre con técnica francesa tradicional",
      technique: "Técnica francesa",
      price: "42€",
      image: {
        id: 1,
        url: "/placeholder.jpg",
        alt: "Solomillo Wellington",
        width: 600,
        height: 450
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
        height: 450
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
        height: 450
      },
      rating: 4.9,
      featured: true,
      category: "Postre"
    }
  ]

  // Mount effect optimizado
  useEffect(() => {
    setMounted(true)
    setDishes(fallbackDishes)
    
    // API fetch diferido para no bloquear el render inicial
    const timer = setTimeout(async () => {
      try {
        const response = await fetch('/api/dishes')
        if (response.ok) {
          const apiDishes = await response.json()
          if (apiDishes && apiDishes.length > 0) {
            setDishes(apiDishes)
          }
        }
      } catch (error) {
        console.log('Using fallback data')
      }
    }, 100) // Micro delay para no bloquear

    return () => clearTimeout(timer)
  }, [])

  // Responsive optimizado
  useEffect(() => {
    if (!mounted) return

    const updateItemsPerPage = () => {
      const width = window.innerWidth
      setItemsPerPage(width < 768 ? 1 : width < 1024 ? 2 : 3)
    }

    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [mounted])

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

  // Auto advance optimizado
  useEffect(() => {
    if (!mounted || totalPages <= 1) return
    
    const timer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalPages)
    }, 6000)

    return () => clearTimeout(timer)
  }, [currentIndex, totalPages, mounted])

  const startIndex = currentIndex * itemsPerPage
  const currentDishes = dishes.slice(startIndex, startIndex + itemsPerPage)

  // Loading mínimo
  if (!mounted) {
    return (
      <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <div className="w-4 h-4 mr-2 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-emerald-400 text-sm font-medium">ESPECIALIDADES</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl font-bold mb-6 text-emerald-400">
              Nuestras Especialidades
            </h2>
            <p className="text-lg text-zinc-300 max-w-3xl mx-auto">
              Los mejores platos de nuestra cocina
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header crítico optimizado */}
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

        {/* Navigation optimizada */}
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

        {/* Grid optimizado sin animaciones pesadas */}
        <div className="mb-16">
          <div
            key={currentIndex}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 opacity-0 animate-in fade-in duration-500"
            style={{ animationFillMode: 'forwards' }}
          >
            {currentDishes.map((dish, idx) => (
              <OptimizedDishCard key={dish.id} dish={dish} index={idx} />
            ))}
          </div>
        </div>

        {/* CTA optimizado */}
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
