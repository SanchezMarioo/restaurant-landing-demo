import Image from "next/image"
import Reveal from "@/components/reveal"

/**
 * Testimonios: cita protagonista en Vollkorn itálica sobre fotografía de
 * ambiente atenuada con carbón cálido, y dos voces secundarias sobre el
 * mismo fondo. Estático: sin carrusel, sin estrellas, sin avatares.
 */

const mainQuote = {
  quote:
    "Lumière representa la vanguardia culinaria en su máxima expresión: un menú que respeta la tradición mientras innova con una brillantez poco común.",
  name: "Javier Rodríguez",
  role: "Crítico gastronómico",
}

const secondaryQuotes = [
  {
    quote:
      "El maridaje propuesto por el sumiller elevó cada plato a otro nivel. Una experiencia sensorial completa.",
    name: "Laura Martínez",
    role: "Cliente",
  },
  {
    quote:
      "La atención al detalle es extraordinaria, desde la recepción hasta el último postre. Sofisticado sin dejar de ser acogedor.",
    name: "Carlos Mendoza",
    role: "Cliente habitual",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="on-photo relative scroll-mt-24 overflow-hidden">
      {/* Fotografía de ambiente como fondo, atenuada en cálido */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt=""
          role="presentation"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-char-deep/85" aria-hidden="true" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-24 text-bone md:px-10 lg:py-32">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-label text-bone/60">La sobremesa</p>
          <figure className="mt-8 lg:w-10/12">
            <blockquote>
              <p className="font-serif text-[clamp(1.625rem,3.2vw,2.75rem)] italic leading-[1.3]">
                «{mainQuote.quote}»
              </p>
            </blockquote>
            <figcaption className="mt-8 text-xs font-medium uppercase tracking-label text-bone/70">
              {mainQuote.name} — {mainQuote.role}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-16 grid gap-y-10 border-t border-hairline-light pt-12 sm:grid-cols-2 sm:gap-x-12">
          {secondaryQuotes.map((item, index) => (
            <Reveal key={item.name} delay={0.1 + index * 0.08}>
              <figure className={index === 1 ? "sm:border-l sm:border-hairline-light sm:pl-12" : undefined}>
                <blockquote>
                  <p className="max-w-[52ch] text-base leading-[1.65] text-bone/85">«{item.quote}»</p>
                </blockquote>
                <figcaption className="mt-5 text-xs font-medium uppercase tracking-label text-bone/60">
                  {item.name} — {item.role}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
