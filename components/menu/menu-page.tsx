"use client"

import { useState, useEffect } from "react"
import MenuHeader from "./menu-header"
import MenuGrid from "./menu-grid"
import MenuFilters from "./menu-filters"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { allDishes, type Dish, type Category, type DietaryOption } from "@/data/dishes"

export default function MenuPage() {
  const [dishes] = useState<Dish[]>(allDishes)
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes)
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all")
  const [activeDietary, setActiveDietary] = useState<DietaryOption | "all">("all")
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc" | "name">("default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filtrado y orden reactivos
  useEffect(() => {
    let result = [...dishes]

    if (activeCategory !== "all") {
      result = result.filter((dish) => dish.category === activeCategory)
    }

    if (activeDietary !== "all") {
      result = result.filter((dish) => dish.dietary.includes(activeDietary))
    }

    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => Number.parseFloat(a.price.replace("€", "")) - Number.parseFloat(b.price.replace("€", "")))
        break
      case "price-desc":
        result.sort((a, b) => Number.parseFloat(b.price.replace("€", "")) - Number.parseFloat(a.price.replace("€", "")))
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.id - b.id
        })
    }

    setFilteredDishes(result)
  }, [dishes, activeCategory, activeDietary, sortOption])

  return (
    <>
      <Navbar />

      <div className="text-char">
        <MenuHeader />

        <div className="mx-auto max-w-[1400px] px-6 pb-28 pt-12 md:px-10 lg:pt-16">
          <MenuFilters
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeDietary={activeDietary}
            setActiveDietary={setActiveDietary}
            sortOption={sortOption}
            setSortOption={setSortOption}
            viewMode={viewMode}
            setViewMode={setViewMode}
            totalDishes={filteredDishes.length}
          />

          <MenuGrid dishes={filteredDishes} viewMode={viewMode} />
        </div>
      </div>

      <Footer />
    </>
  )
}
