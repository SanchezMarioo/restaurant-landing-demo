"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import Reveal from "@/components/reveal"
import { useInView } from "@/hooks/use-in-view"

// El mapa se carga solo cuando la sección entra en viewport
const SimpleLeafletMap = dynamic(() => import("./simple-leaflet-map"), {
  ssr: false,
  loading: () => (
    <div className="texture flex h-full w-full items-center justify-center bg-bone-deep">
      <p className="text-xs uppercase tracking-label text-umber">Cargando mapa…</p>
    </div>
  ),
})

const contactRows = [
  {
    term: "Dirección",
    detail: (
      <>
        Calle Gourmet 123
        <br />
        28001 Madrid, España
      </>
    ),
  },
  {
    term: "Reservas",
    detail: (
      <a
        href="tel:+34912345678"
        className="underline decoration-terracotta/50 underline-offset-4 transition-colors duration-300 hover:text-terracotta-deep hover:decoration-terracotta-deep"
      >
        +34 912 345 678
      </a>
    ),
  },
  {
    term: "Email",
    detail: (
      <a
        href="mailto:reservas@lumiererestaurant.com"
        className="break-all underline decoration-terracotta/50 underline-offset-4 transition-colors duration-300 hover:text-terracotta-deep hover:decoration-terracotta-deep"
      >
        reservas@lumiererestaurant.com
      </a>
    ),
  },
  {
    term: "Horario",
    detail: (
      <>
        Mar–Sáb · 13:00–15:30 / 20:00–23:00
        <br />
        Domingo y lunes, cerrado
      </>
    ),
  },
  {
    term: "Servicios",
    detail: (
      <>
        Valet parking
        <br />
        Salón privado para hasta 20 personas
      </>
    ),
  },
]

export default function ContactSection() {
  const [mapRef, mapInView] = useInView<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: "100px",
    once: true,
  })
  const [shouldLoadMap, setShouldLoadMap] = useState(false)

  useEffect(() => {
    if (mapInView) {
      const timer = setTimeout(() => setShouldLoadMap(true), 200)
      return () => clearTimeout(timer)
    }
  }, [mapInView])

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 md:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-tight text-char">
              Reservas <em className="font-normal italic text-terracotta">y contacto</em>
            </h2>
            <p className="mt-7 max-w-[48ch] text-base leading-[1.65] text-umber">
              La mesa se reserva por teléfono o por correo. Para grupos de más de
              seis comensales y para el salón privado, escríbanos con antelación.
            </p>
          </Reveal>

          <dl className="mt-10 border-b border-hairline">
            {contactRows.map((row, index) => (
              <Reveal key={row.term} delay={index * 0.05}>
                <div className="grid gap-1 border-t border-hairline py-5 sm:grid-cols-12 sm:items-baseline">
                  <dt className="text-xs font-medium uppercase tracking-label text-umber sm:col-span-4">
                    {row.term}
                  </dt>
                  <dd className="text-base leading-relaxed text-char sm:col-span-8">{row.detail}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Mapa + fotografía de la sala en capas */}
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.15}>
            <div ref={mapRef} className="relative aspect-[4/3] w-full overflow-hidden border border-hairline">
              {shouldLoadMap ? (
                <SimpleLeafletMap />
              ) : (
                <div className="texture flex h-full w-full items-center justify-center bg-bone-deep">
                  <p className="text-xs uppercase tracking-label text-umber">Mapa</p>
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.25} className="relative z-10 -mt-16 ml-auto w-2/3 lg:-mt-20">
            <div className="relative aspect-[16/10] w-full overflow-hidden border-[10px] border-bone">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="La sala de Lumière lista para el servicio de la noche"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 66vw, 33vw"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
