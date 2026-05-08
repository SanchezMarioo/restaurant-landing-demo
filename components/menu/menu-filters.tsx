"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Grid, List, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories, dietaryOptions, type Category, type DietaryOption } from "@/data/dishes"

interface MenuFiltersProps {
  activeCategory: Category | "all"
  setActiveCategory: (category: Category | "all") => void
  activeDietary: DietaryOption | "all"
  setActiveDietary: (dietary: DietaryOption | "all") => void
  sortOption: "default" | "price-asc" | "price-desc" | "name"
  setSortOption: (option: "default" | "price-asc" | "price-desc" | "name") => void
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  totalDishes: number
}

export default function MenuFilters({
  activeCategory,
  setActiveCategory,
  activeDietary,
  setActiveDietary,
  sortOption,
  setSortOption,
  viewMode,
  setViewMode,
  totalDishes,
}: MenuFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)

  const sortOptions = [
    { value: "default", label: "Destacados" },
    { value: "price-asc", label: "Precio: menor a mayor" },
    { value: "price-desc", label: "Precio: mayor a menor" },
    { value: "name", label: "Alfabético" },
  ]

  return (
    <div className="mb-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 relative">
        <div className="flex items-center mb-4 md:mb-0">
          <h2 className="text-2xl font-serif font-medium mr-3">Platos</h2>
          <span className="text-white/60 text-sm bg-white/5 px-2 py-1 rounded-full">
            {totalDishes} {totalDishes === 1 ? "resultado" : "resultados"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filtros
            {(activeCategory !== "all" || activeDietary !== "all") && (
              <span className="ml-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
            )}
          </Button>

          <div className="relative z-50">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              Ordenar por
              <ChevronDown className={cn("w-4 h-4 ml-1 transition-transform", isSortOpen && "rotate-180")} />
            </Button>

            {isSortOpen && (
              <div className="absolute right-0 top-full mt-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50 w-56 py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "w-full text-left px-4 py-2 text-sm hover:bg-zinc-800",
                      sortOption === option.value ? "text-emerald-400" : "text-zinc-300",
                    )}
                    onClick={() => {
                      setSortOption(option.value as any)
                      setIsSortOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex border border-zinc-800 rounded-md overflow-hidden">
            <button
              className={cn(
                "p-2",
                viewMode === "grid"
                  ? "bg-zinc-800 text-white"
                  : "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50",
              )}
              onClick={() => setViewMode("grid")}
              aria-label="Vista de cuadrícula"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              className={cn(
                "p-2",
                viewMode === "list"
                  ? "bg-zinc-800 text-white"
                  : "bg-transparent text-zinc-400 hover:text-white hover:bg-zinc-800/50",
              )}
              onClick={() => setViewMode("list")}
              aria-label="Vista de lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded filters */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isFiltersOpen ? "auto" : 0,
          opacity: isFiltersOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden mb-6"
      >
        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Filtros</h3>
            <button
              className="text-zinc-400 hover:text-white"
              onClick={() => {
                setActiveCategory("all")
                setActiveDietary("all")
              }}
            >
              <X className="w-4 h-4" />
              <span className="sr-only">Limpiar filtros</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm text-zinc-400 mb-3">Categoría</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    activeCategory === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700",
                  )}
                  onClick={() => setActiveCategory("all")}
                >
                  Todos
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      activeCategory === category
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700",
                    )}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-zinc-400 mb-3">Opciones dietéticas</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  className={cn(
                    "px-3 py-1 rounded-full text-sm transition-colors",
                    activeDietary === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700",
                  )}
                  onClick={() => setActiveDietary("all")}
                >
                  Todos
                </button>
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    className={cn(
                      "px-3 py-1 rounded-full text-sm transition-colors",
                      activeDietary === option
                        ? "bg-emerald-600 text-white"
                        : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700",
                    )}
                    onClick={() => setActiveDietary(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Active filters display */}
      {(activeCategory !== "all" || activeDietary !== "all") && (
        <div className="flex flex-wrap gap-2 mb-6">
          {activeCategory !== "all" && (
            <div className="bg-zinc-800/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
              Categoría: {activeCategory}
              <button className="ml-2 text-zinc-400 hover:text-white" onClick={() => setActiveCategory("all")}>
                <X className="w-3 h-3" />
                <span className="sr-only">Eliminar filtro</span>
              </button>
            </div>
          )}

          {activeDietary !== "all" && (
            <div className="bg-zinc-800/50 text-white px-3 py-1 rounded-full text-sm flex items-center">
              Dieta: {activeDietary}
              <button className="ml-2 text-zinc-400 hover:text-white" onClick={() => setActiveDietary("all")}>
                <X className="w-3 h-3" />
                <span className="sr-only">Eliminar filtro</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
