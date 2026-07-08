"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

const SECTIONS = ["hero", "menu", "experience", "chef", "testimonials", "contact"] as const
type SectionId = (typeof SECTIONS)[number]

const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "experience", label: "Experiencia" },
  { id: "chef", label: "Chef" },
  { id: "contact", label: "Contacto" },
]

/**
 * Sobre el hero fotográfico la barra es transparente con texto crema;
 * al hacer scroll (o fuera de la home, o con el menú abierto) pasa a
 * crema texturizada con texto carbón.
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>("hero")
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const solid = isScrolled || !isHomePage || isMenuOpen

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    setIsScrolled(currentScrollY > 40)

    if (isHomePage) {
      const scrollPosition = currentScrollY + 100

      for (const section of SECTIONS) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection((prev) => (prev === section ? prev : section))
            break
          }
        }
      }
    }
  }, [isHomePage])

  useEffect(() => {
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
        const offset = sectionId === "hero" ? 0 : 72
        window.scrollTo({ top: element.offsetTop - offset, behavior: "smooth" })
      }
    } else {
      window.location.href = `/#${sectionId}`
    }
    setIsMenuOpen(false)
  }

  const linkClass = (active: boolean) =>
    cn(
      "group relative text-sm font-medium uppercase tracking-label transition-colors duration-200",
      solid
        ? active
          ? "text-char"
          : "text-umber hover:text-char"
        : active
          ? "text-bone"
          : "text-bone/75 hover:text-bone",
    )

  const underline = (active: boolean) => (
    <span
      aria-hidden="true"
      className={cn(
        "absolute -bottom-1.5 left-0 transition-all duration-300",
        active
          ? "h-[2px] w-full bg-terracotta"
          : cn("h-px w-0 group-hover:w-full", solid ? "bg-char" : "bg-bone"),
      )}
    />
  )

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[padding,background-color] duration-300",
        solid
          ? "texture border-b border-hairline bg-bone py-3"
          : "border-b border-transparent bg-gradient-to-b from-char-deep/60 to-transparent py-5",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-full focus:z-50 focus:bg-char focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-label focus:text-bone"
      >
        Saltar al contenido
      </a>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10">
        {/* Botón de menú móvil */}
        <button
          type="button"
          className={cn("md:hidden", solid ? "text-char" : "text-bone")}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link
          href="/"
          className={cn(
            "font-serif text-xl font-semibold tracking-[0.14em] transition-colors duration-300",
            solid ? "text-char" : "text-bone",
          )}
        >
          LUMIÈRE
        </Link>

        {/* Navegación de escritorio */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {NAV_LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(id)
              }}
              className={linkClass(isHomePage && activeSection === id)}
            >
              {label}
              {underline(isHomePage && activeSection === id)}
            </a>
          ))}

          <Link
            href="/menu"
            className={linkClass(pathname === "/menu" || (isHomePage && activeSection === "menu"))}
          >
            Carta
            {underline(pathname === "/menu" || (isHomePage && activeSection === "menu"))}
          </Link>

          <button
            type="button"
            onClick={() => scrollToSection("contact")}
            className="bg-terracotta px-5 py-2.5 text-sm font-medium uppercase tracking-label text-bone transition-colors duration-300 hover:bg-terracotta-deep"
          >
            Reservar
          </button>
        </nav>

        {/* Contrapeso para centrar el wordmark en móvil */}
        <div className="w-6 md:hidden" aria-hidden="true" />
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div
          id="mobile-nav"
          className="texture absolute left-0 right-0 top-full border-b border-hairline bg-bone px-6 pb-8 pt-4 md:hidden"
        >
          <nav className="flex flex-col" aria-label="Principal móvil">
            {NAV_LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection(id)
                }}
                className="border-b border-hairline py-4 font-serif text-2xl text-char"
              >
                {label}
              </a>
            ))}
            <Link
              href="/menu"
              onClick={() => setIsMenuOpen(false)}
              className="border-b border-hairline py-4 font-serif text-2xl text-char"
            >
              Carta
            </Link>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="mt-8 w-full bg-terracotta py-4 text-sm font-medium uppercase tracking-label text-bone transition-colors duration-300 hover:bg-terracotta-deep"
            >
              Reservar
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}
