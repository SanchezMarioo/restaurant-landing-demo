"use client"

import type React from "react"

import Link from "next/link"
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white/70 py-16 px-4 md:px-6 border-t border-white/10">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <div>
            <h3 className="font-serif text-2xl font-medium text-white mb-6">LUMIÈRE</h3>
            <p className="mb-6">
              Un espacio donde la gastronomía se convierte en arte, creando experiencias memorables para todos nuestros
              comensales.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Instagram className="h-5 w-5" />} label="Instagram" />
              <SocialLink href="#" icon={<Facebook className="h-5 w-5" />} label="Facebook" />
              <SocialLink href="#" icon={<Twitter className="h-5 w-5" />} label="Twitter" />
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium text-white mb-6">Horario</h3>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Martes - Jueves</span>
                <span className="text-white">13:00 - 15:30 / 20:00 - 23:00</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Viernes - Sábado</span>
                <span className="text-white">13:00 - 15:30 / 20:00 - 23:30</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2">
                <span>Domingo - Lunes</span>
                <span className="text-white">Cerrado</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-medium text-white mb-6">Contacto</h3>
            <address className="not-italic space-y-3">
              <p className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-white/50" />
                <span>Calle Gourmet 123, Madrid, 28001</span>
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-white/50" />
                <span className="text-white">+34 912 345 678</span>
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-white/50" />
                <span className="text-white">reservas@lumiererestaurant.com</span>
              </p>
            </address>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-t border-white/10 mt-12 pt-8 text-center text-white/50"
        >
          <p>© {new Date().getFullYear()} Lumière Restaurant. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-6 mt-4 text-xs">
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Términos de Servicio
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Política de Cookies
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

interface SocialLinkProps {
  href: string
  icon: React.ReactNode
  label: string
}

function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <Link
      href={href}
      className="bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors duration-300"
      aria-label={label}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  )
}
