import Image from "next/image"
import Reveal from "@/components/reveal"
import { cn } from "@/lib/utils"

/**
 * Valores: fotografía lateral a sangre (las manos en el producto) y lista
 * editorial sobre panel crema profundo texturizado. Sin iconos, sin cards.
 */

const values = [
  {
    term: "Producto",
    description:
      "Selección diaria en lonja y mercado. La carta cambia con la temporada, no con el calendario.",
  },
  {
    term: "Técnica",
    description:
      "Precisión clásica francesa al servicio del recetario mediterráneo. La técnica nunca por encima del sabor.",
  },
  {
    term: "Sostenibilidad",
    description:
      "Pesca responsable, huerta de proximidad y una cocina que aprovecha el producto entero.",
  },
  {
    term: "Sala",
    description:
      "Servicio cercano y preciso, sin liturgia impostada. La mesa se cuida tanto como el plato.",
  },
]

export default function ValuesSection() {
  return (
    <section className="relative">
      {/* Foto a sangre hasta el borde izquierdo */}
      <div className="relative aspect-[4/3] w-full lg:absolute lg:inset-y-0 lg:left-0 lg:aspect-auto lg:w-[42%]">
        <Image
          src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Las manos del equipo de cocina emplatando con producto de temporada"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 42vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char-deep/30 to-transparent lg:bg-gradient-to-r" aria-hidden="true" />
      </div>

      {/* Panel de valores */}
      <div className="lg:ml-[46%]">
        <div className="texture border-y border-hairline bg-bone-deep px-6 py-20 md:px-12 lg:py-28">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-tight text-char">
              En qué <em className="font-normal italic text-terracotta">creemos</em>
            </h2>
          </Reveal>

          <dl className="mt-12 border-b border-hairline">
            {values.map((value, index) => (
              <Reveal key={value.term} delay={index * 0.06}>
                <div className="group grid gap-2 border-t border-hairline py-7 sm:grid-cols-12 sm:items-baseline lg:py-8">
                  <dt
                    className={cn(
                      "relative font-serif text-[1.625rem] font-medium leading-tight text-char sm:col-span-5",
                      index % 2 === 1 && "sm:col-start-2 sm:col-span-4",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-5 top-1/2 h-7 w-[2px] origin-center -translate-y-1/2 scale-y-0 bg-terracotta transition-transform duration-300 group-hover:scale-y-100 motion-reduce:transition-none"
                    />
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none">
                      {value.term}
                    </span>
                  </dt>
                  <dd className="max-w-[46ch] text-base leading-[1.65] text-umber sm:col-span-6 sm:col-start-7">
                    {value.description}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
