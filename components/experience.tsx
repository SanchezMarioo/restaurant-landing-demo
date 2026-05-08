"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Utensils, Wine, Users, Award } from "lucide-react"

const experienceFeatures = [
  {
    icon: <Utensils className="w-6 h-6" />,
    title: "Cocina de Autor",
    description: "Creaciones únicas que fusionan técnicas tradicionales con enfoques contemporáneos.",
    color: "from-emerald-400 to-teal-500",
  },
  {
    icon: <Wine className="w-6 h-6" />,
    title: "Maridajes Excepcionales",
    description: "Una cuidada selección de vinos nacionales e internacionales para complementar cada plato.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Servicio Personalizado",
    description: "Atención meticulosa y discreta para que cada momento sea especial.",
    color: "from-rose-400 to-pink-500",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Experiencia Premium",
    description: "Un viaje gastronómico donde cada detalle está cuidadosamente diseñado.",
    color: "from-purple-400 to-violet-500",
  },
]

export default function Experience() {
  const [isLoaded, setIsLoaded] = useState(false)

  // Posiciones predefinidas para evitar hydration mismatch
  const particlePositions = [
    { left: 96.87, top: 28.63 },
    { left: 74.49, top: 10.47 },
    { left: 76.37, top: 96.76 },
    { left: 37.93, top: 42.22 },
    { left: 78.32, top: 12.51 },
  ]

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="experience" className="py-32 px-4 md:px-6 relative overflow-hidden">
      {/* Elegant background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Subtle animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {particlePositions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-emerald-400/20 rounded-full"
            animate={isLoaded ? {
              x: [0, (i % 2 === 0 ? 30 : -30)],
              y: [0, (i % 3 === 0 ? 20 : -20)],
              opacity: [0.2, 0.5, 0.2],
              scale: [0.5, 1, 0.5],
            } : {}}
            transition={{
              duration: 4 + (i % 3),
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.4,
            }}
            style={{
              left: `${position.left}%`,
              top: `${position.top}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div className="relative">
            {/* Main image with elegant effect */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-zinc-900/50 backdrop-blur-sm border border-white/10">
              <Image
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Restaurant interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              {/* Elegant overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10"></div>
            </div>

            {/* Floating secondary image */}
            <div className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-2/3 aspect-video rounded-2xl overflow-hidden border-4 border-zinc-950 bg-zinc-900/50 backdrop-blur-sm">
              <Image
                src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Chef preparing food"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-orange-500/10"></div>
            </div>

            {/* Elegant info card */}
            <div className="absolute top-8 left-8 bg-black/50 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-emerald-400 rounded-full mr-2"></div>
                <span className="text-emerald-400 text-sm font-medium">EXPERIENCIA ACTIVA</span>
              </div>
              <div className="text-xs text-zinc-300">Creando momentos únicos</div>
            </div>
          </motion.div>

          <motion.div className="lg:pl-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
                <span className="text-emerald-400 text-sm font-medium">EXCELENCIA CULINARIA</span>
              </div>

              <h2 className="font-serif text-4xl md:text-6xl font-light mb-6">
                Una{" "}
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
                  experiencia
                </span>
                <br />
                <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-600">
                  memorable
                </span>
              </h2>

              <p className="text-lg text-zinc-300 mb-12 leading-relaxed">
                En Lumière, cada visita es una experiencia única. Nuestro equipo de profesionales trabaja con pasión
                para crear momentos inolvidables a través de la gastronomía, el servicio y el ambiente sofisticado.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {experienceFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300">
                    <div
                      className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-medium mb-3 text-white">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                  </div>

                  {/* Subtle hover glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300 -z-10`}
                  ></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
