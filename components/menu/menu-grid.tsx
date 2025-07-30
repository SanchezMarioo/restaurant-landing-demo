"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Star, Clock, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Dish } from "@/data/dishes"
import { useInView } from "@/hooks/use-in-view"

interface MenuGridProps {
  dishes: Dish[]
  viewMode: "grid" | "list"
}

export default function MenuGrid({ dishes, viewMode }: MenuGridProps) {
  return (
    <div
      className={cn(
        viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" : "space-y-6",
      )}
    >
      {dishes.length > 0 ? (
        dishes.map((dish, index) =>
          viewMode === "grid" ? (
            <DishCard key={dish.id} dish={dish} index={index} />
          ) : (
            <DishListItem key={dish.id} dish={dish} index={index} />
          ),
        )
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-zinc-400 text-lg">No se encontraron platos con los filtros seleccionados.</p>
        </div>
      )}
    </div>
  )
}

interface DishCardProps {
  dish: Dish
  index: number
}

function DishCard({ dish, index }: DishCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 shadow-xl h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Loading skeleton */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-800/50 animate-pulse z-0">
          <div className="aspect-[4/3] w-full bg-gradient-to-b from-zinc-800/70 to-zinc-900/70"></div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-zinc-800/70 rounded-md w-3/4"></div>
            <div className="h-4 bg-zinc-800/70 rounded-md w-full"></div>
            <div className="h-4 bg-zinc-800/70 rounded-md w-2/3"></div>
          </div>
        </div>
      )}

      <div className="aspect-[4/3] relative overflow-hidden">
        <motion.div
          className="h-full w-full"
          animate={{
            scale: isHovered ? 1.05 : 1,
            filter: isHovered ? "brightness(1.1)" : "brightness(1)",
          }}
          transition={{ duration: 0.4 }}
        >
          <Image
            src={dish.image || "/placeholder.svg"}
            alt={dish.name}
            fill
            className={cn("object-cover transition-all duration-500", isLoaded ? "opacity-100" : "opacity-0")}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 6}
            onLoad={() => setIsLoaded(true)}
          />
        </motion.div>

        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
          {dish.category}
        </div>

        {dish.featured && (
          <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Destacado
          </div>
        )}

        {dish.dietary.length > 0 && (
          <div className="absolute bottom-3 left-3 flex gap-1">
            {dish.dietary.map((option) => (
              <span
                key={option}
                className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium"
                title={getDietaryLabel(option)}
              >
                {getDietaryShortLabel(option)}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-medium">{dish.name}</h3>
          <span className="text-lg font-light">{dish.price}</span>
        </div>
        <p className="text-zinc-300 text-sm mb-4">{dish.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{dish.rating.toFixed(1)}</span>
          </div>

          {dish.prepTime && (
            <div className="flex items-center text-zinc-400">
              <Clock className="w-3 h-3 mr-1" />
              <span className="text-xs">{dish.prepTime} min</span>
            </div>
          )}
        </div>
      </div>

      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </motion.div>
  )
}

function DishListItem({ dish, index }: DishCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [ref, isInView] = useInView<HTMLDivElement>()

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden rounded-xl bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/50 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex flex-col md:flex-row">
        {/* Image container */}
        <div className="md:w-1/3 relative">
          {/* Loading skeleton */}
          {!isLoaded && <div className="absolute inset-0 bg-zinc-800/50 animate-pulse z-0"></div>}

          <div className="aspect-video md:aspect-square relative overflow-hidden">
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? "brightness(1.1)" : "brightness(1)",
              }}
              transition={{ duration: 0.4 }}
              className="h-full w-full"
            >
              <Image
                src={dish.image || "/placeholder.svg"}
                alt={dish.name}
                fill
                className={cn("object-cover transition-all duration-500", isLoaded ? "opacity-100" : "opacity-0")}
                sizes="(max-width: 768px) 100vw, 33vw"
                onLoad={() => setIsLoaded(true)}
              />
            </motion.div>
          </div>

          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            {dish.category}
          </div>

          {dish.featured && (
            <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              Destacado
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 md:w-2/3 flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl font-medium">{dish.name}</h3>
            <span className="text-lg font-light ml-4">{dish.price}</span>
          </div>

          <p className="text-zinc-300 text-sm mb-4 flex-grow">{dish.description}</p>

          <div className="flex flex-wrap items-center gap-4 mt-auto">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium">{dish.rating.toFixed(1)}</span>
            </div>

            {dish.prepTime && (
              <div className="flex items-center text-zinc-400">
                <Clock className="w-3 h-3 mr-1" />
                <span className="text-xs">{dish.prepTime} min</span>
              </div>
            )}

            {dish.dietary.length > 0 && (
              <div className="flex gap-1 items-center">
                <Info className="w-3 h-3 text-zinc-400 mr-1" />
                {dish.dietary.map((option) => (
                  <span
                    key={option}
                    className="bg-zinc-800 px-2 py-0.5 rounded-full text-xs font-medium"
                    title={getDietaryLabel(option)}
                  >
                    {getDietaryShortLabel(option)}
                  </span>
                ))}
              </div>
            )}

            {dish.ingredients && (
              <div className="w-full mt-2">
                <p className="text-xs text-zinc-400">
                  <span className="font-medium">Ingredientes:</span> {dish.ingredients.join(", ")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function getDietaryLabel(option: string): string {
  switch (option) {
    case "Vegetariano":
      return "Vegetariano"
    case "Vegano":
      return "Vegano"
    case "Sin Gluten":
      return "Sin Gluten"
    case "Sin Lactosa":
      return "Sin Lactosa"
    default:
      return option
  }
}

function getDietaryShortLabel(option: string): string {
  switch (option) {
    case "Vegetariano":
      return "VG"
    case "Vegano":
      return "VE"
    case "Sin Gluten":
      return "SG"
    case "Sin Lactosa":
      return "SL"
    default:
      return option
  }
}
