"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ChefHat } from "lucide-react"

export default function CriticalHero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Background Image - Critical for LCP */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Modern culinary innovation"
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
          quality={85}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div>
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
          </div>

          {/* Critical LCP content - no animation */}
          <div>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-4xl mx-auto mb-4 leading-relaxed">
              <span className="text-emerald-400 font-medium">
                Donde la tradición culinaria se encuentra con la elegancia moderna
              </span>
            </p>
            <p className="text-lg text-zinc-400 max-w-3xl mx-auto mb-12">
              Una experiencia gastronómica refinada con ingredientes de primera calidad y técnicas culinarias
              tradicionales.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
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
              onClick={() => {
                const reservationSection = document.getElementById("reservation")
                if (reservationSection) {
                  window.scrollTo({
                    top: reservationSection.offsetTop - 80,
                    behavior: "smooth",
                  })
                }
              }}
            >
              Reservar Experiencia
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
