"use client"

import { motion } from "framer-motion"

interface MenuHeaderProps {
  isLoaded: boolean
}

export default function MenuHeader({ isLoaded }: MenuHeaderProps) {
  return (
    <div className="relative bg-black/50 backdrop-blur-sm">
      {/* Header background */}
      <div className="relative h-[240px] md:h-[300px] w-full overflow-hidden bg-gradient-to-b from-zinc-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
      </div>

      {/* Header content */}
      <div className="absolute inset-0 flex items-end justify-center pb-10 md:pb-14">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
              Nuestra Carta
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
              Descubre nuestra selección de platos de temporada, elaborados con ingredientes frescos y técnicas
              culinarias innovadoras.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
