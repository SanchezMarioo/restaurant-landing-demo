"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const featuredDishes = [
  {
    id: 1,
    name: "Tartar de Atún Rojo",
    description: "Con aguacate, mango y emulsión de wasabi",
    price: "24€",
    image: "https://images.unsplash.com/photo-1546039907-7fa05f864c02?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Entrante",
    featured: true,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Risotto de Setas Silvestres",
    description: "Con trufa negra y parmesano de 24 meses",
    price: "28€",
    image:
      "https://images.unsplash.com/photo-1633436375153-d7045cb93e38?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Principal",
    featured: true,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Cordero a Baja Temperatura",
    description: "Con puré de apionabo y reducción de Oporto",
    price: "32€",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Principal",
    featured: false,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Esfera de Chocolate",
    description: "Rellena de mousse de maracuyá y corazón líquido de mango",
    price: "16€",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Postre",
    featured: true,
    rating: 4.9,
  },
  {
    id: 5,
    name: "Vieiras a la Plancha",
    description: "Con crema de coliflor y caviar de trufa",
    price: "26€",
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Entrante",
    featured: false,
    rating: 4.8,
  },
  {
    id: 6,
    name: "Solomillo Wellington",
    description: "Con duxelle de hongos y salsa de vino tinto",
    price: "38€",
    image:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    category: "Principal",
    featured: true,
    rating: 5.0,
  },
]

export default function FeaturedDishes() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  // Usar solo los platos con featured=true
  const onlyFeatured = featuredDishes.filter((dish) => dish.featured)
  const categories = ["all", ...new Set(onlyFeatured.map((dish) => dish.category))]

  const filteredDishes = (activeCategory === "all"
    ? onlyFeatured
    : onlyFeatured.filter((dish) => dish.category === activeCategory))

  return (
    <section id="menu" className="py-24 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 opacity-50"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent"></div>

      <motion.div style={{ y, opacity }} className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-0"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600">
              Nuestros platos destacados
            </h2>
            <p className="text-lg text-zinc-400 max-w-xl">
              Una selección de nuestras creaciones más emblemáticas, donde tradición e innovación se encuentran para
              crear experiencias gastronómicas inolvidables.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-700",
                )}
              >
                {category === "all" ? "Todos" : category}
              </button>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredDishes.map((dish, index) => (
            <DishCard key={dish.id} dish={dish} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/menu">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-6 text-lg rounded-full group">
              <span>Ver carta completa</span>
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}

interface DishCardProps {
  dish: {
    id: number
    name: string
    description: string
    price: string
    image: string
    category: string
    featured: boolean
    rating: number
  }
  index: number
}

function DishCard({ dish, index }: DishCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <motion.div
      ref={cardRef}
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
            priority={index < 2}
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
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif text-xl font-medium">{dish.name}</h3>
          <span className="text-lg font-light">{dish.price}</span>
        </div>
        <p className="text-zinc-300 text-sm mb-4">{dish.description}</p>

        <div className="flex items-center">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm font-medium">{dish.rating.toFixed(1)}</span>
          </div>
          <div className="ml-auto">
            <Link href="/menu">
              <span className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors">
                Ver más
              </span>
            </Link>
          </div>
        </div>
      </div>

      <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </motion.div>
  )
}
