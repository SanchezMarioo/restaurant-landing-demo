"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from 'lucide-react'
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"

interface DishCardProps {
  dish: {
    id: number
    name: string
    subtitle: string
    description: string
    technique: string
    price: string
    image: string
    rating: number
    featured: boolean
    category: string // Added category to props
  }
  index: number
}

export default function DishCard({ dish, index }: DishCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10 hover:border-emerald-500/30 transition-all duration-500"
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800/50 animate-pulse z-0">
          <div className="aspect-[4/3] w-full bg-gradient-to-b from-zinc-800/70 to-zinc-900/70"></div>
          <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div className="h-5 sm:h-6 bg-zinc-800/70 rounded-md w-3/4"></div>
            <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-full"></div>
            <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-2/3"></div>
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
            filter: isHovered ? "brightness(1.05)" : "brightness(1)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="h-full w-full"
        >
          <Image
            src={dish.image || "/placeholder.svg"}
            alt={dish.name}
            fill
            className={cn("object-cover transition-all duration-500", isLoaded ? "opacity-100" : "opacity-0")}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={index < 2}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>

        {/* Floating price */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-sm px-2 py-1 sm:px-3 sm:py-1 rounded-full">
          <span className="text-emerald-400 font-medium text-sm sm:text-base">{dish.price}</span>
        </div>

        {/* Featured badge */}
        {dish.featured && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-emerald-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium">
            Signature
          </div>
        )}

        {/* Technique overlay - Only show on hover for desktop */}
        <motion.div
          className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 hidden sm:block"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="bg-emerald-600/90 backdrop-blur-sm px-3 py-2 rounded-lg">
            <p className="text-white text-xs font-medium">{dish.technique}</p>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-emerald-400 text-xs sm:text-sm font-medium">{dish.subtitle}</span>
          <div className="flex items-center">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-xs sm:text-sm font-medium">{dish.rating}</span>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-white mb-2 sm:mb-3 leading-tight">{dish.name}</h3>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-3 sm:hidden">{dish.technique}</p>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">{dish.description}</p>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl sm:rounded-3xl -z-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.02 : 0.95,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </motion.div>
  )
}
