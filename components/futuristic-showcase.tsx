"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Utensils, Wine, ChefHat } from "lucide-react"
import Link from "next/link"

const showcaseItems = [
  {
    id: 1,
    title: "Cocina de Vanguardia",
    subtitle: "Técnicas innovadoras",
    description: "Fusionamos tradición culinaria con técnicas modernas para crear experiencias únicas",
    image:
      "https://sdmntprukwest.oaiusercontent.com/files/00000000-49ac-6243-a1a5-7cb51ac2cbe0/raw?se=2025-07-30T17%3A02%3A09Z&sp=r&sv=2024-08-04&sr=b&scid=d2a14215-1cdc-50b1-be6d-ea6e7b9e97f6&skoid=d9a3f0e9-8380-4267-a144-3f27388a5c5d&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-30T04%3A39%3A22Z&ske=2025-07-31T04%3A39%3A22Z&sks=b&skv=2024-08-04&sig=Qb3vMYOzDeOojv0poj4u6DUVC1ljLATXPljwlD4FWoE%3D",
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
      "https://images.unsplash.com/photo-1578911373434-0cb395d2cbfb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  // Valores fijos para evitar hydration mismatch
  const floatingDots = [
    { left: 16, top: 12, moveX: -12, moveY: 15, duration: 5, delay: 0 },
    { left: 74, top: 33, moveX: 18, moveY: -10, duration: 4, delay: 0.5 },
    { left: 12, top: 62, moveX: -8, moveY: 20, duration: 6, delay: 1 },
    { left: 23, top: 97, moveX: 15, moveY: -5, duration: 4.5, delay: 0.2 },
    { left: 51, top: 79, moveX: -20, moveY: 12, duration: 5.5, delay: 0.8 },
    { left: 76, top: 27, moveX: 10, moveY: -18, duration: 3.5, delay: 1.2 },
    { left: 4, top: 22, moveX: 25, moveY: 8, duration: 6.5, delay: 0.3 },
    { left: 77, top: 50, moveX: -15, moveY: 22, duration: 4.8, delay: 1.5 },
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  // Auto-rotate showcase items
  useEffect(() => {
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
        {floatingDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full"
            animate={{
              x: [0, dot.moveX],
              y: [0, dot.moveY],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: dot.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: dot.delay,
            }}
            style={{
              left: `${dot.left}%`,
              top: `${dot.top}%`,
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
          className="text-center mb-20"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
            <span className="text-emerald-400 text-sm font-medium">EXPERIENCIA CULINARIA</span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Nuestra Filosofía
          </h2>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Donde la tradición culinaria se encuentra con la innovación moderna para crear experiencias gastronómicas
            memorables y sofisticadas.
          </p>
        </motion.div>

        {/* Main showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Interactive showcase */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/10">
              {/* Main image */}
              <div className="relative h-full w-full">
                <Image
                  src={showcaseItems[activeIndex].image || "/placeholder.svg"}
                  alt={showcaseItems[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>

              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10"></div>

              {/* Content overlay */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${showcaseItems[activeIndex].color} mr-3`}>
                      {showcaseItems[activeIndex].icon}
                    </div>
                    <span className="text-emerald-400 text-sm font-medium">{showcaseItems[activeIndex].subtitle}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mb-3">{showcaseItems[activeIndex].title}</h3>
                  <p className="text-zinc-300 text-sm">{showcaseItems[activeIndex].description}</p>
                </div>
              </div>

              {/* Subtle animation effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent h-8 opacity-50"
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Control panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {showcaseItems.map((item, index) => (
              <motion.div
                key={item.id}
                className={cn(
                  "relative p-6 rounded-2xl border cursor-pointer transition-all duration-300",
                  activeIndex === index
                    ? "bg-white/5 backdrop-blur-sm border-emerald-500/50 shadow-lg shadow-emerald-500/10"
                    : "bg-zinc-900/30 border-zinc-700/50 hover:border-emerald-500/30 hover:bg-white/5",
                )}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start">
                  <div
                    className={cn(
                      "p-3 rounded-xl mr-4 transition-all duration-300",
                      activeIndex === index ? `bg-gradient-to-r ${item.color}` : "bg-zinc-800",
                    )}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-emerald-400 text-sm mb-3">{item.subtitle}</p>
                    <p className="text-zinc-400 text-sm leading-relaxed">{item.description}</p>
                  </div>

                  {activeIndex === index && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-emerald-400 rounded-full"
                    />
                  )}
                </div>

                {/* Progress bar */}
                {activeIndex === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
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
