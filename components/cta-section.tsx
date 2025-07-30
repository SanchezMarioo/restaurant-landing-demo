"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function CTASection() {
  return (
    <section id="reservation" className="py-20 px-4 md:px-8 relative">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-[300px] md:h-[400px] w-full rounded-2xl overflow-hidden mb-6">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Menú degustación"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent"></div>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
              Descubre Nuestro Menú
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Nuestra carta evoluciona constantemente, inspirada en los mejores ingredientes de temporada y técnicas
              culinarias innovadoras. Cada plato es una obra de arte diseñada para estimular todos tus sentidos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/menu">
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                  Ver Menú Completo
                </Button>
              </Link>
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white rounded-full"
              >
                Carta de Vinos
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-8 border border-zinc-800/50 shadow-xl">
              <h3 className="font-serif text-2xl font-bold text-emerald-400 mb-6 text-center">
                Reserva Tu Experiencia
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-zinc-400 mb-1">
                      Fecha
                    </label>
                    <input
                      type="date"
                      id="date"
                      className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-zinc-400 mb-1">
                      Hora
                    </label>
                    <input
                      type="time"
                      id="time"
                      className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-zinc-400 mb-1">
                    Número de Personas
                  </label>
                  <select
                    id="guests"
                    className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 personas</option>
                    <option value="3">3 personas</option>
                    <option value="4">4 personas</option>
                    <option value="5">5 personas</option>
                    <option value="6">6+ personas</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-zinc-400 mb-1">
                    Tipo de Experiencia
                  </label>
                  <select
                    id="experience"
                    className="w-full px-4 py-2 rounded-xl bg-zinc-800/50 border border-zinc-700/50 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="regular">Menú Regular</option>
                    <option value="tasting">Menú Degustación</option>
                    <option value="chef">Experiencia Chef's Table</option>
                    <option value="private">Sala Privada</option>
                  </select>
                </div>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
                  Confirmar Reserva
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
