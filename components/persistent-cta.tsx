"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, X } from "lucide-react"

export default function PersistentCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Show CTA after scrolling past hero section
      setIsVisible(scrollY > windowHeight * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToReservation = () => {
    const reservationSection = document.getElementById("reservation")
    if (reservationSection) {
      window.scrollTo({
        top: reservationSection.offsetTop - 80,
        behavior: "smooth",
      })
    }
    setIsExpanded(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 max-w-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-serif font-bold text-white">Reserva tu experiencia</h3>
                  <button onClick={() => setIsExpanded(false)} className="text-zinc-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-zinc-300 text-sm mb-4">
                  Vive una experiencia gastronómica única en un ambiente elegante y sofisticado.
                </p>

                <Button
                  onClick={scrollToReservation}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white rounded-full"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Reservar Mesa
                </Button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsExpanded(true)}
                className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-4 rounded-full shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 group"
              >
                <Calendar className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="sr-only">Reservar experiencia</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
