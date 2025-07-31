"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Star, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
  },
]

export default function SignatureDishes() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const [hoveredDish, setHoveredDish] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  // Posiciones predefinidas para las partículas
  const particlePositions = [
    { left: 38.08, top: 5.25 },
    { left: 43.48, top: 58.94 },
    { left: 23.78, top: 92.35 },
    { left: 71.59, top: 45.52 },
    { left: 83.20, top: 71.99 },
    { left: 76.80, top: 41.02 },
    { left: 41.57, top: 43.02 },
    { left: 53.02, top: 67.29 },
    { left: 66.62, top: 23.64 },
    { left: 16.28, top: 1.55 },
    { left: 31.24, top: 78.63 },
    { left: 94.14, top: 47.66 },
    { left: 40.71, top: 51.76 },
    { left: 4.74, top: 98.90 },
    { left: 8.64, top: 61.53 },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="signature-menu" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
            animate={isLoaded ? {
              scale: [0.5, 1.2, 0.5],
              opacity: [0.3, 0.8, 0.3],
              y: [0, -30, 0],
            } : {}}
            transition={{
              duration: 4 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
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

        {/* Signature Dishes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {signatureDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative"
              onHoverStart={() => setHoveredDish(dish.id)}
              onHoverEnd={() => setHoveredDish(null)}
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image || "/placeholder.svg"}
                    alt={dish.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Floating price */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-emerald-400 font-medium">{dish.price}</span>
                  </div>

                  {/* Featured badge */}
                  {dish.featured && (
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Signature
                    </div>
                  )}

                  {/* Technique overlay */}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: hoveredDish === dish.id ? 1 : 0, y: hoveredDish === dish.id ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-emerald-600/90 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <p className="text-white text-xs font-medium">{dish.technique}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-emerald-400 text-sm font-medium">{dish.subtitle}</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium">{dish.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold text-white mb-3">{dish.name}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{dish.description}</p>
                </div>
              </div>

              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: hoveredDish === dish.id ? 1 : 0,
                  scale: hoveredDish === dish.id ? 1.05 : 0.8,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
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
