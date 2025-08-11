"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

// Define section IDs for better type safety
const SECTIONS = ["hero", "experience", "menu", "testimonials", "reservation"] as const
type SectionId = (typeof SECTIONS)[number]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>("hero")
  const [lastScrollY, setLastScrollY] = useState(0)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Improved scroll spy with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setLastScrollY(currentScrollY)

    // Update navbar background
    setIsScrolled(currentScrollY > 10)

    if (isHomePage) {
      // Scroll spy functionality with offset adjustment
      const scrollPosition = currentScrollY + 100

      // Find the current active section
      for (const section of SECTIONS) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight) {
            if (activeSection !== section) {
              setActiveSection(section)
            }
            break
          }
        }
      }
    }
  }, [activeSection, isHomePage])

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [handleScroll])

  const scrollToSection = (sectionId: SectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId)
      if (element) {
        const offset = sectionId === "hero" ? 0 : 80

        window.scrollTo({
          top: element.offsetTop - offset,
          behavior: "smooth",
        })
      }
    } else {
      window.location.href = `/#${sectionId}`
    }
    setIsMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8",
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/5 py-2" : "bg-transparent py-4",
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white/70 hover:text-white hover:bg-white/5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link href="/" className="font-serif text-2xl font-bold text-white">
            LUMIÈRE
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <a
            href="/#experience"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("experience")
            }}
            className={cn(
              "font-medium transition-all duration-200 relative group text-white/70 hover:text-white",
              isHomePage && activeSection === "experience" && "text-white"
            )}
          >
            Experiencia
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-px bg-white transition-all duration-300",
                isHomePage && activeSection === "experience" ? "w-full" : "w-0 group-hover:w-full"
              )}
            ></span>
          </a>
          <a
            href="/menu"
            onClick={(e) => {
              if (isHomePage) {
                const el = document.getElementById("menu")
                if (el) {
                  e.preventDefault()
                  scrollToSection("menu")
                  return
                }
              }
              // Dejar navegar a /menu normalmente
            }}
            className={cn(
              "font-medium transition-all duration-200 relative group text-white/70 hover:text-white",
              (pathname === "/menu" || (isHomePage && activeSection === "menu")) && "text-white"
            )}
          >
            Menú
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-px bg-white transition-all duration-300",
                (pathname === "/menu" || (isHomePage && activeSection === "menu")) ? "w-full" : "w-0 group-hover:w-full"
              )}
            ></span>
          </a>
          <a
            href="/#testimonials"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("testimonials")
            }}
            className={cn(
              "font-medium transition-all duration-200 relative group text-white/70 hover:text-white",
              isHomePage && activeSection === "testimonials" && "text-white"
            )}
          >
            Testimonios
            <span
              className={cn(
                "absolute -bottom-1 left-0 h-px bg-white transition-all duration-300",
                isHomePage && activeSection === "testimonials" ? "w-full" : "w-0 group-hover:w-full"
              )}
            ></span>
          </a>
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-2 font-medium transition-all duration-200"
            onClick={() => scrollToSection("reservation")}
          >
            Reservar
          </button>
        </nav>

        {/* Mobile menu placeholder to balance the layout */}
        <div className="w-10 lg:hidden"></div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/5 p-4 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <a
            href="/#experience"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("experience")
            }}
            className={cn(
              "font-medium transition-all duration-200 relative group text-white text-lg py-2 block",
              isHomePage && activeSection === "experience" && "text-white"
            )}
          >
            Experiencia
          </a>
          <a
            href="/menu"
            onClick={(e) => {
              if (isHomePage) {
                const el = document.getElementById("menu")
                if (el) {
                  e.preventDefault()
                  scrollToSection("menu")
                  return
                }
              }
              // Cerrar menú móvil y navegar
              setIsMenuOpen(false)
            }}
            className={cn(
              "font-medium transition-all duration-200 relative group text-white text-lg py-2 block",
              (pathname === "/menu" || (isHomePage && activeSection === "menu")) && "text-white"
            )}
          >
            Menú
          </a>
          <a
            href="/#testimonials"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection("testimonials")
            }}
            className={cn(
              "font-medium transition-all duration-200 relative group text-white text-lg py-2 block",
              isHomePage && activeSection === "testimonials" && "text-white"
            )}
          >
            Testimonios
          </a>
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white w-full rounded-full py-3 font-medium transition-all duration-200"
            onClick={() => scrollToSection("reservation")}
          >
            Reservar
          </button>
        </div>
      )}
    </header>
  )
}
