"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "María García",
    role: "Cliente habitual",
    quote:
      "Una experiencia gastronómica excepcional. Cada plato es una obra de arte que sorprende por su equilibrio de sabores y presentación impecable.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    name: "Javier Rodríguez",
    role: "Crítico gastronómico",
    quote:
      "Lumière representa la vanguardia culinaria en su máxima expresión. El chef ha logrado crear un menú que respeta la tradición mientras innova de manera brillante.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    name: "Laura Martínez",
    role: "Influencer gastronómica",
    quote:
      "El maridaje propuesto por el sumiller elevó cada plato a otro nivel. Una experiencia sensorial completa que recomiendo a todos los amantes de la buena mesa.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    name: "Carlos Mendoza",
    quote:
      "La atención al detalle es extraordinaria, desde la recepción hasta el último postre. El servicio es impecable y el ambiente sofisticado pero acogedor.",
    rating: 5,
    role: "Empresario",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Check if section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Auto-advance testimonials
  useEffect(() => {
    const startTimeout = () => {
      timeoutRef.current = setTimeout(() => {
        nextTestimonial()
      }, 6000)
    }

    if (isInView) {
      startTimeout()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [current, isInView])

  // Reset timeout when manually changing testimonial
  const handleManualChange = (callback: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    callback()
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <section id="testimonials" className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

      <div className="container mx-auto max-w-7xl relative z-10" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Experiencias compartidas por quienes han disfrutado de nuestra propuesta gastronómica.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Restaurant ambiance"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
            </div>

            <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-2/3 aspect-video rounded-2xl overflow-hidden border-4 border-zinc-950">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Fine dining"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-xs">
              <div className="flex items-center mb-3">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-sm font-medium">5.0</span>
              </div>
              <p className="text-sm text-white/90">
                "Más de 500 reseñas con una calificación promedio de 4.9 estrellas en Google y TripAdvisor."
              </p>
            </div>
          </motion.div>

          <div className="relative">
            <Quote className="absolute -top-10 -left-10 w-20 h-20 text-white/5" />

            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12"
              >
                <div className="flex flex-col">
                  <div className="flex mb-6">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl md:text-2xl font-serif italic mb-8">
                    "{testimonials[current].quote}"
                  </blockquote>
                  <div className="flex items-center mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative mr-4">
                      <Image
                        src={testimonials[current].image || "/placeholder.svg"}
                        alt={testimonials[current].name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{testimonials[current].name}</p>
                      <p className="text-white/70">{testimonials[current].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => handleManualChange(prevTestimonial)}
                className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > current ? 1 : -1)
                      handleManualChange(() => setCurrent(index))
                    }}
                    className={`w-2 h-2 mx-1 rounded-full transition-all ${
                      index === current ? "bg-emerald-500 w-6" : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => handleManualChange(nextTestimonial)}
                className="bg-white/5 hover:bg-white/10 text-white/70 hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
