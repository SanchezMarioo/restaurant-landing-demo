"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Utensils, Wine, ChefHat } from "lucide-react"
import Link from "next/link"

const showcaseItems = [
  {
    id: 1,
    title: "Cocina de Vanguardia",
    subtitle: "Técnicas innovadoras",
    description: "Fusionamos tradición culinaria con técnicas modernas para crear experiencias únicas",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3",
    color: "from-emerald-500 to-teal-600",
    icon: <ChefHat className="w-6 h-6" />,
  },
  {
    id: 2,
    title: "Ambiente Sofisticado",
    subtitle: "Diseño contemporáneo",
    description: "Espacios diseñados para complementar la experiencia gastronómica con elegancia moderna",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3",
    color: "from-slate-600 to-slate-700",
    icon: <Utensils className="w-6 h-6" />,
  },
  {
    id: 3,
    title: "Maridajes Excepcionales",
    subtitle: "Selección premium",
    description: "Carta de vinos cuidadosamente seleccionada para realzar cada creación culinaria",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1671&auto=format&fit=crop&ixlib=rb-4.0.3",
    color: "from-amber-600 to-orange-700",
    icon: <Wine className="w-6 h-6" />,
  },
]

export default function FuturisticShowcase() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Posiciones predefinidas para las partículas
  const particlePositions = [
    { left: 15.45, top: 25.30 },
    { left: 82.67, top: 75.21 },
    { left: 45.23, top: 12.88 },
    { left: 68.91, top: 89.44 },
    { left: 33.78, top: 56.12 },
    { left: 91.12, top: 34.67 },
    { left: 7.89, top: 78.95 },
    { left: 59.34, top: 41.23 },
  ]

  // Auto-rotate showcase items
  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseItems.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="experience" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      {/* Elegant background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      {/* Floating subtle elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            animate={isLoaded ? {
              x: [0, (i % 2 === 0 ? 25 : -25)],
              y: [0, (i % 3 === 0 ? 15 : -15)],
              opacity: [0.3, 0.7, 0.3],
            } : {}}
            transition={{
              duration: 3 + (i % 2),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.3,
            }}
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-emerald-400 text-sm font-medium">EXPERIENCIA CULINARIA</span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Nuestra Propuesta
          </h2>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Un espacio donde cada detalle está pensado para crear momentos únicos a través de la gastronomía de autor.
          </p>
        </motion.div>

        {/* Simple grid of features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {showcaseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} mb-2`}>{item.icon}</div>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-3">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.description}</p>
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
          <Link
            href="#menu"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-medium rounded-full hover:from-emerald-500 hover:to-teal-600 transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 group"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
          >
            <span>Descubrir Nuestra Carta</span>
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
