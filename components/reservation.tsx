"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, ChevronDown } from "lucide-react"

export default function Reservation() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    occasion: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - would connect to a server action in a real app
    console.log(formState)
    alert("Reserva enviada con éxito. Te contactaremos pronto para confirmar.")
  }

  return (
    <section id="reservation" className="py-24 px-4 md:px-6 relative bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
              Reserva tu <span className="font-medium">experiencia</span>
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Te invitamos a vivir una experiencia gastronómica única. Completa el formulario y nos pondremos en
              contacto contigo para confirmar tu reserva.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-white/5 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Horario</h3>
                  <p className="text-white/70">
                    Martes a Sábado
                    <br />
                    13:00 - 15:30 y 20:00 - 23:00
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/5 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Grupos</h3>
                  <p className="text-white/70">
                    Para reservas de más de 8 personas,
                    <br />
                    por favor contacta directamente por teléfono.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-white/5 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Política de cancelación</h3>
                  <p className="text-white/70">
                    Cancelaciones con menos de 24 horas de antelación
                    <br />
                    pueden estar sujetas a un cargo.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-white/70 mb-2">
                    Número de personas
                  </label>
                  <div className="relative">
                    <select
                      id="guests"
                      name="guests"
                      value={formState.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20 appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-white/70 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formState.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-white/70 mb-2">
                    Hora
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formState.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="occasion" className="block text-sm font-medium text-white/70 mb-2">
                  Ocasión (opcional)
                </label>
                <div className="relative">
                  <select
                    id="occasion"
                    name="occasion"
                    value={formState.occasion}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20 appearance-none"
                  >
                    <option value="">Seleccionar ocasión</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Cena de negocios">Cena de negocios</option>
                    <option value="Celebración especial">Celebración especial</option>
                    <option value="Otro">Otro</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>

              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">
                  Solicitudes especiales (opcional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                ></textarea>
              </div>

              <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 py-6 text-lg rounded-lg">
                Solicitar Reserva
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
