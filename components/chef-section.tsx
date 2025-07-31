"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Award, BookOpen, Users } from "lucide-react"

export default function ChefSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="chef" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      <motion.div style={{ y }} className="container mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Chef Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Chef Alexandre Dubois"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            </div>

            {/* Floating achievement card */}
            <div className="absolute -bottom-8 -right-8 bg-black/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-xs">
              <div className="flex items-center mb-3">
                <Award className="w-6 h-6 text-yellow-400 mr-2" />
                <span className="text-yellow-400 font-medium">Michelin Star</span>
              </div>
              <p className="text-zinc-300 text-sm">Reconocido por su innovación en gastronomía molecular</p>
            </div>
          </motion.div>

          {/* Chef Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:pl-10"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-8">
              <span className="text-emerald-400 text-sm font-medium">CHEF EJECUTIVO</span>
            </div>

            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Chef</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
                Alexandre Dubois
              </span>
            </h2>

            <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
              Con más de 15 años de experiencia en alta cocina, Alexandre lidera nuestra propuesta de vanguardia
              fusionando técnicas tradicionales francesas con innovaciones moleculares.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-emerald-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Formación</h3>
                  <p className="text-zinc-400">Institut Paul Bocuse, Lyon • Le Cordon Bleu, París</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Reconocimientos</h3>
                  <p className="text-zinc-400">Estrella Michelin • James Beard Award • Chef del Año 2023</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Filosofía</h3>
                  <p className="text-zinc-400">"La innovación debe servir al sabor, no dominarlo"</p>
                </div>
              </div>
            </div>

            <blockquote className="border-l-4 border-emerald-500 pl-6 italic text-lg text-zinc-300">
              "Cada plato es una oportunidad de contar una historia, de crear una emoción. La ciencia nos da las
              herramientas, pero la pasión guía cada creación."
            </blockquote>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
