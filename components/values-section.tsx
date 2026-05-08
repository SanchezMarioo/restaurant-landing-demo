"use client"

import { motion } from "framer-motion"
import { Leaf, MapPin, Award, Users } from "lucide-react"

const values = [
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Ingredientes Locales",
    description: "Selección diaria de productos frescos de productores locales",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Técnicas Modernas",
    description: "Aplicación de las últimas innovaciones en gastronomía molecular",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Sostenibilidad",
    description: "Compromiso con prácticas culinarias responsables y eco-friendly",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Experiencia Única",
    description: "Cada visita es un viaje sensorial personalizado e inolvidable",
    color: "from-amber-500 to-orange-600",
  },
]

export default function ValuesSection() {
  return (
    <section className="py-20 px-4 md:px-8 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950"></div>

      <motion.div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Nuestros Valores
          </h2>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Los pilares que definen nuestra filosofía culinaria y compromiso con la excelencia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div
                className={`bg-gradient-to-r ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {value.icon}
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-3">{value.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
