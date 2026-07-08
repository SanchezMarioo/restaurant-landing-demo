"use client"

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

const sortOptions = [
  { value: "default", label: "Destacados" },
  { value: "price-asc", label: "Precio, de menor a mayor" },
  { value: "price-desc", label: "Precio, de mayor a menor" },
  { value: "name", label: "Alfabético" },
] as const

/**
 * Filtros como fila tipográfica: pestañas de texto con subrayado activo
 * terracota, select nativo para ordenar y conmutador de vista textual.
 * Sin pills, sin paneles plegables, sin iconos.
 */
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
  const tabClass = (active: boolean) =>
    cn(
      "whitespace-nowrap border-b-2 pb-3 text-sm font-medium uppercase tracking-label transition-colors duration-200",
      active ? "border-terracotta text-char" : "border-transparent text-umber hover:text-char",
    )

  const toggleClass = (active: boolean) =>
    cn(
      "text-sm font-medium uppercase tracking-label transition-colors duration-200",
      active
        ? "text-char underline decoration-terracotta decoration-2 underline-offset-8"
        : "text-umber hover:text-char",
    )

  return (
    <div className="mb-14">
      {/* Categorías */}
      <div
        className="flex gap-7 overflow-x-auto border-b border-hairline"
        role="group"
        aria-label="Filtrar por categoría"
      >
        <button
          type="button"
          aria-pressed={activeCategory === "all"}
          className={tabClass(activeCategory === "all")}
          onClick={() => setActiveCategory("all")}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            className={tabClass(activeCategory === category)}
            onClick={() => setActiveCategory(category)}
          >
            {category}s
          </button>
        ))}
      </div>

      {/* Dieta · recuento · orden · vista */}
      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-5">
        <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3" role="group" aria-label="Filtrar por dieta">
          <span className="text-xs uppercase tracking-label text-umber">Dieta</span>
          <button
            type="button"
            aria-pressed={activeDietary === "all"}
            className={toggleClass(activeDietary === "all")}
            onClick={() => setActiveDietary("all")}
          >
            Todas
          </button>
          {dietaryOptions.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={activeDietary === option}
              className={toggleClass(activeDietary === option)}
              onClick={() => setActiveDietary(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-baseline gap-x-10 gap-y-5">
          <p className="text-sm text-umber" aria-live="polite">
            {totalDishes} {totalDishes === 1 ? "plato" : "platos"}
          </p>

          <label className="flex items-baseline gap-3 text-xs uppercase tracking-label text-umber">
            Ordenar
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as MenuFiltersProps["sortOption"])}
              className="cursor-pointer border-b border-char bg-transparent pb-1 text-sm font-medium uppercase tracking-label text-char"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-baseline gap-5" role="group" aria-label="Modo de vista">
            <button
              type="button"
              aria-pressed={viewMode === "grid"}
              className={toggleClass(viewMode === "grid")}
              onClick={() => setViewMode("grid")}
            >
              Cuadrícula
            </button>
            <button
              type="button"
              aria-pressed={viewMode === "list"}
              className={toggleClass(viewMode === "list")}
              onClick={() => setViewMode("list")}
            >
              Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
