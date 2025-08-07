"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MapPin, Phone, Mail, Clock, Car, Utensils } from "lucide-react"
import dynamic from "next/dynamic"

// Importar el mapa de forma dinámica para evitar problemas de SSR
const SimpleLeafletMap = dynamic(() => import('./simple-leaflet-map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center rounded-2xl">
      <div className="text-center text-white">
        <div className="text-2xl mb-2">🗺️</div>
        <p>Cargando mapa...</p>
      </div>
    </div>
  ),
})

const contactInfo = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Dirección",
    details: ["Calle Gourmet 123", "28001 Madrid, España"],
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: <Phone className="w-6 h-6" />,
    title: "Teléfono",
    details: ["+34 912 345 678", "Reservas y consultas"],
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Email",
    details: ["reservas@lumiererestaurant.com", "info@lumiererestaurant.com"],
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Horarios",
    details: ["Mar-Sáb: 13:00-15:30 / 20:00-23:00", "Dom-Lun: Cerrado"],
    color: "from-amber-500 to-orange-600",
  },
]

const additionalServices = [
  {
    icon: <Car className="w-5 h-5" />,
    title: "Aparcamiento",
    description: "Servicio de valet parking disponible",
  },
  {
    icon: <Utensils className="w-5 h-5" />,
    title: "Eventos Privados",
    description: "Salón privado para hasta 20 personas",
  },
]

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="contact" className="py-32 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
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
            <MapPin className="w-5 h-5 mr-2 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-medium">VISÍTANOS</span>
          </div>

          <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
            Contacto
          </h2>

          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Estamos aquí para hacer de tu experiencia gastronómica algo inolvidable. Contáctanos para reservas o
            cualquier consulta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div
                    className={`bg-gradient-to-r ${info.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}
                  >
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mb-3">{info.title}</h3>
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-zinc-400 text-sm mb-1">
                      {detail}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Additional Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-zinc-900/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-xl font-serif font-bold text-white mb-6">Servicios Adicionales</h3>
              <div className="space-y-4">
                {additionalServices.map((service, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-emerald-600 w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{service.title}</h4>
                      <p className="text-zinc-400 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Map and Location */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Map placeholder */}
            <div className="relative h-96 w-full rounded-2xl overflow-hidden mb-6">
              <SimpleLeafletMap />
            </div>

            {/* Location details */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Cómo Llegar</h3>
              <div className="space-y-3 text-sm text-zinc-400">
                <p>
                  <span className="text-white font-medium">Metro:</span> Línea 1 - Estación Gran Vía (5 min a pie)
                </p>
                <p>
                  <span className="text-white font-medium">Autobús:</span> Líneas 3, 25, 39 - Parada Calle Mayor
                </p>
                <p>
                  <span className="text-white font-medium">Parking:</span> Parking público a 100m - Plaza de Oriente
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
