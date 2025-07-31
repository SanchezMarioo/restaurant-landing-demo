"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { Thermometer, Droplets, Zap, Beaker, Quote } from "lucide-react"

const techniques = [
  {
    id: 1,
    name: "Sous-Vide",
    description: "Cocción a baja temperatura en vacío para texturas perfectas",
    icon: <Thermometer className="w-6 h-6" />,
    color: "from-red-500 to-orange-600",
    detail: "Precisión de temperatura al grado para carnes jugosas y verduras con textura ideal",
  },
  {
    id: 2,
    name: "Gastronomía Molecular",
    description: "Transformación de texturas y sabores mediante ciencia",
    icon: <Beaker className="w-6 h-6" />,
    color: "from-purple-500 to-pink-600",
    detail: "Esferificaciones, geles y espumas que sorprenden al paladar",
  },
  {
    id: 3,
    name: "Aire Infusionado",
    description: "Aromas y sabores concentrados en texturas etéreas",
    icon: <Droplets className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-600",
    detail: "Espumas aromáticas que intensifican la experiencia sensorial",
  },
  {
    id: 4,
    name: "Fermentación Controlada",
    description: "Desarrollo de sabores únicos mediante procesos naturales",
    icon: <Zap className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    detail: "Umami profundo y complejidad de sabores desarrollados en nuestro laboratorio",
  },
]

const chefQuotes = [
  "La innovación no es cambiar por cambiar, es encontrar nuevas formas de expresar la esencia de cada ingrediente",
  "Cada técnica moderna que aplicamos tiene un propósito: realzar, no enmascarar, los sabores naturales",
  "La ciencia nos da las herramientas, pero la pasión y la creatividad guían cada creación",
]

export default function CulinaryInnovation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const [activeQuote, setActiveQuote] = useState(0)

  return (
    <section id="innovation" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Molecular pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        ></div>
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
            <Beaker className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">TÉCNICAS INNOVADORAS</span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Cocina de Vanguardia
          </h2>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-12">
            Aplicamos las técnicas más avanzadas de la gastronomía moderna para crear experiencias culinarias que
            desafían los sentidos y elevan cada ingrediente a su máximo potencial.
          </p>
        </motion.div>

        {/* Techniques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {techniques.map((technique, index) => (
            <motion.div
              key={technique.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 h-full">
                <div
                  className={`bg-gradient-to-r ${technique.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {technique.icon}
                </div>

                <h3 className="text-xl font-serif font-bold text-white mb-3">{technique.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{technique.description}</p>
                <p className="text-zinc-500 text-xs leading-relaxed">{technique.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chef Quotes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center"
        >
          <Quote className="w-12 h-12 text-emerald-400/50 mx-auto mb-6" />

          <motion.blockquote
            key={activeQuote}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl md:text-2xl font-serif italic text-white mb-6 max-w-4xl mx-auto"
          >
            "{chefQuotes[activeQuote]}"
          </motion.blockquote>

          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Chef"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="text-left">
              <p className="text-white font-medium">Chef Alexandre Dubois</p>
              <p className="text-zinc-400 text-sm">Director Culinario</p>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {chefQuotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveQuote(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeQuote ? "bg-emerald-500 w-6" : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Laboratory Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Culinary laboratory"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-md">
                <h3 className="text-2xl font-serif font-bold text-white mb-3">Nuestro Laboratorio</h3>
                <p className="text-zinc-300 text-sm">
                  Donde la ciencia y el arte culinario se encuentran para crear experiencias gastronómicas únicas.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
