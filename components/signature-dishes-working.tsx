import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { allDishes, type Dish } from "@/data/dishes"

/**
 * Especialidades como collage: tres fotografías solapadas con marco crema
 * (fotos apiladas sobre la mesa, no cards) y un bloque de texto entrelazado.
 * Los solapamientos solo actúan en escritorio; en móvil apilan con ritmo.
 */

const featured = allDishes.filter((dish) => dish.featured).slice(0, 3)

function Caption({ dish }: { dish: Dish }) {
  return (
    <figcaption className="mt-4">
      <div className="flex items-baseline">
        <h3 className="font-serif text-2xl font-medium text-char">{dish.name}</h3>
        <span className="leaders" aria-hidden="true" />
        <span className="font-serif text-lg text-terracotta-deep">{dish.price}</span>
      </div>
      <p className="mt-1 max-w-[46ch] text-base leading-relaxed text-umber">{dish.description}</p>
    </figcaption>
  )
}

export default function SignatureDishes() {
  const [first, second, third] = featured

  return (
    <section id="menu" className="scroll-mt-24 overflow-hidden px-6 pb-24 pt-32 md:px-10 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-tight text-char">
              Lo que sale <em className="font-normal italic text-terracotta">del fuego</em>
            </h2>
            <Link
              href="/menu"
              className="border-b border-char pb-1 text-sm font-medium uppercase tracking-label text-char transition-colors duration-300 hover:border-terracotta hover:text-terracotta"
            >
              La carta completa
            </Link>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-y-14 lg:grid-cols-12 lg:gap-y-0">
          {first && (
            <Reveal className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
              <figure>
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={first.image}
                    alt={`${first.name} — ${first.description}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                </div>
                <Caption dish={first} />
              </figure>
            </Reveal>
          )}

          {second && (
            <Reveal delay={0.15} className="relative z-10 lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:-ml-16 lg:mt-40">
              <figure>
                <div className="relative aspect-[3/4] w-full overflow-hidden border-[10px] border-bone">
                  <Image
                    src={second.image}
                    alt={`${second.name} — ${second.description}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <Caption dish={second} />
              </figure>
            </Reveal>
          )}

          {third && (
            <Reveal delay={0.25} className="relative z-20 lg:col-span-4 lg:col-start-3 lg:row-start-2 lg:-mt-28">
              <figure>
                <div className="relative aspect-square w-full overflow-hidden border-[10px] border-bone">
                  <Image
                    src={third.image}
                    alt={`${third.name} — ${third.description}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <Caption dish={third} />
              </figure>
            </Reveal>
          )}

          {/* Texto entrelazado con el collage */}
          <Reveal delay={0.3} className="lg:col-span-3 lg:col-start-9 lg:row-start-2 lg:mt-24 lg:pl-2">
            <p className="max-w-[36ch] font-serif text-xl italic leading-[1.5] text-umber">
              «Tres platos que cuentan la casa: la lonja de la mañana, el arroz
              que no tiene prisa y el dulce que cierra la sobremesa.»
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
