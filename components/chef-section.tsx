import Image from "next/image"
import Reveal from "@/components/reveal"

/**
 * Chef: banda de carbón cálido texturizado (nunca negro puro) con retrato
 * grande que rompe la banda por arriba, cita con comillas tipográficas y
 * bio con drop cap Vollkorn. El detalle artesanal vive en la tipografía.
 */
export default function ChefSection() {
  return (
    <section id="chef" className="band-char scroll-mt-24 mt-24 px-6 pb-24 text-bone md:px-10 lg:mt-32 lg:pb-32">
      <div className="mx-auto grid max-w-[1400px] gap-x-12 gap-y-14 lg:grid-cols-12">
        {/* Retrato que sobresale de la banda por arriba */}
        <Reveal className="lg:col-span-5">
          <div className="relative -mt-16 aspect-[3/4] w-full overflow-hidden lg:-mt-24">
            <Image
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Alexandre Dubois, chef ejecutivo de Lumière, en el pase de cocina"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-char-deep/40 to-transparent" aria-hidden="true" />
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-20">
          <Reveal>
            <blockquote>
              <p className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-[1.25]">
                «La innovación debe servir al sabor, no dominarlo. La ciencia da
                herramientas; <em className="font-normal italic text-terracotta-light">la pasión decide el plato</em>.»
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 border-t border-hairline-light pt-7">
              <p className="font-serif text-2xl font-medium">Alexandre Dubois</p>
              <p className="mt-2 text-xs font-medium uppercase tracking-label text-bone/60">
                Chef ejecutivo · Institut Paul Bocuse · Le Cordon Bleu · Una estrella Michelin
              </p>
              <p className="mt-7 max-w-[56ch] text-base leading-[1.7] text-bone/80 first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-[3.4rem] first-letter:font-semibold first-letter:leading-[0.85] first-letter:text-terracotta-light">
                Quince años de alta cocina entre Lyon, París y Madrid. Su propuesta
                cruza la precisión francesa con el producto de temporada español,
                sin artificio: la temporada manda y la técnica obedece. Del pan de
                masa madre que abre la mesa al petit four que la cierra, todo se
                hace en casa.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
