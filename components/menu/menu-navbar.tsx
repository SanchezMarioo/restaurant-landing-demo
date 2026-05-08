"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function MenuNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)")
    const updateViewport = () => setIsDesktop(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)

    return () => mediaQuery.removeEventListener("change", updateViewport)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
          : "bg-black/70 backdrop-blur-md border-b border-white/5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)]",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile menu button */}
        {!isDesktop && (
          <Button
            variant="ghost"
            size="icon"
            className="text-white/70 hover:text-white hover:bg-white/5"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        )}

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            LUMIÈRE
          </Link>
        </motion.div>

        {/* Desktop navigation */}
        {isDesktop && (
          <nav className="flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="text-white/70 hover:text-white transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
          <Link href="/#experience" className="text-white/70 hover:text-white transition-colors">
            Experiencia
          </Link>
          <Link href="/#testimonials" className="text-white/70 hover:text-white transition-colors">
            Testimonios
          </Link>
          <Button
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-lg shadow-emerald-600/20"
            onClick={() => (window.location.href = "/#reservation")}
          >
            Reservar
          </Button>
          </nav>
        )}

        {/* Mobile menu placeholder to balance the layout */}
        {!isDesktop && <div className="w-10"></div>}
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {!isDesktop && isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/5 p-4 flex flex-col space-y-4"
          >
            <Link href="/" className="text-white text-lg py-2 block" onClick={() => setIsMenuOpen(false)}>
              <ArrowLeft className="w-4 h-4 inline mr-2" />
              Volver al inicio
            </Link>
            <Link href="/#experience" className="text-white text-lg py-2 block" onClick={() => setIsMenuOpen(false)}>
              Experiencia
            </Link>
            <Link href="/#testimonials" className="text-white text-lg py-2 block" onClick={() => setIsMenuOpen(false)}>
              Testimonios
            </Link>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-full"
              onClick={() => {
                setIsMenuOpen(false)
                window.location.href = "/#reservation"
              }}
            >
              Reservar
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
