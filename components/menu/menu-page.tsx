"use client"

import { useState, useEffect } from "react"
import useSWR from "swr"
import { motion } from "framer-motion"
import MenuHeader from "./menu-header"
import MenuGrid from "./menu-grid"
import MenuFilters from "./menu-filters"
import MenuNavbar from "./menu-navbar"
import Footer from "@/components/footer"
import { allDishes, type Dish, type Category, type DietaryOption } from "@/data/dishes"

export default function MenuPage() {
  const [dishes, setDishes] = useState<Dish[]>(allDishes)
  const [filteredDishes, setFilteredDishes] = useState<Dish[]>(allDishes)
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all")
  const [activeDietary, setActiveDietary] = useState<DietaryOption | "all">("all")
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc" | "name">("default")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoaded, setIsLoaded] = useState(false)

  // Filter and sort dishes when filters change
  useEffect(() => {
    let result = [...dishes]

    // Apply category filter
    if (activeCategory !== "all") {
      result = result.filter((dish) => dish.category === activeCategory)
    }

    // Apply dietary filter
    if (activeDietary !== "all") {
      result = result.filter((dish) => dish.dietary.includes(activeDietary))
    }

    // Apply sorting
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
        // Default sorting (by featured and then id)
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.id - b.id
        })
    }

    setFilteredDishes(result)
  }, [dishes, activeCategory, activeDietary, sortOption])

  // SWR para refresco ligero y revalidación on-focus; cachea y minimiza re-renders
  const fetcher = (url: string) => fetch(url).then((r) => r.json())
  const { data: swrData } = useSWR('/api/dishes', fetcher, {
    revalidateOnFocus: true,
    revalidateIfStale: true,
    refreshInterval: 0, // sin polling por defecto
    dedupingInterval: 3000,
  })

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!swrData) return
    const mapped: Dish[] = swrData.map((d: any) => ({
      id: d.id,
      name: d.name,
      description: d.description,
      price: d.price,
      image: d.image?.url || d.image || '/placeholder.svg',
      category: d.category,
      featured: !!d.featured,
      rating: Number(d.rating ?? 4.8),
      prepTime: d.prepTime,
      dietary: Array.isArray(d.dietary) ? d.dietary : [],
      ingredients: Array.isArray(d.ingredients) ? d.ingredients : [],
    }))
    setDishes(mapped)
    setFilteredDishes(mapped)
  }, [swrData])

  return (
    <>
      <MenuNavbar />

      <div className="pt-20 pb-24">
        <MenuHeader isLoaded={isLoaded} />

        <div className="container mx-auto px-4 md:px-8 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
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
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  )
}
