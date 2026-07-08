import Image from "next/image"
import Reveal from "@/components/reveal"

/**
 * Experiencia: fotografía ancha a sangre con pull-quote en panel crema
 * superpuesto que rompe el borde inferior de la foto; debajo, las claves
 * del servicio como lista tipográfica a dos columnas.
 */

const experienceFeatures = [
  {
    title: "Cocina de autor",
    description: "Creaciones propias que parten del recetario clásico y terminan en otro sitio.",
  },
  {
    title: "Maridajes",
    description: "Bodega nacional e internacional elegida plato a plato por nuestro sumiller.",
  },
  {
    title: "Servicio",
    description: "Atención meticulosa y discreta; presente cuando hace falta, invisible cuando no.",
  },
  {
    title: "El espacio",
    description: "Una sala serena de luz baja, lino crudo y madera que ya tiene años de sobremesa.",
  },
]

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 pb-24 lg:pb-32">
      {/* Fotografía ancha a sangre */}
      <div className="relative">
        <div className="relative h-[55vh] w-full lg:h-[72vh]">
          <Image
            src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="El comedor de Lumière: madera, lino crudo y luz cálida de servicio"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-char-deep/50 via-transparent to-transparent" aria-hidden="true" />
        </div>

        {/* Pull-quote superpuesta que rompe el borde de la foto */}
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <Reveal className="relative z-10 -mt-20 max-w-xl lg:-mt-24">
            <blockquote className="texture border border-hairline bg-bone px-8 py-7 lg:px-10 lg:py-9">
              <p className="font-serif text-[clamp(1.375rem,2.5vw,1.75rem)] italic leading-[1.4] text-char">
                «Cada visita se construye despacio: el ritmo de los pases, la
                temperatura de la sala, el vino que llega justo antes de hacer
                falta.»
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* Claves del servicio */}
      <div className="mx-auto mt-16 grid w-full max-w-[1400px] gap-x-12 gap-y-2 px-6 md:px-10 lg:mt-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <h2 className="font-serif text-[clamp(2.25rem,4.5vw,3.75rem)] font-medium leading-tight text-char">
            Una mesa que <em className="font-normal italic text-terracotta">se recuerda</em>
          </h2>
        </Reveal>

        <dl className="mt-8 lg:col-span-7 lg:col-start-6 lg:mt-2">
          {experienceFeatures.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 0.06}>
              <div className="grid gap-1 border-t border-hairline py-6 sm:grid-cols-12 sm:items-baseline">
                <dt className="font-serif text-xl font-medium text-char sm:col-span-4">{feature.title}</dt>
                <dd className="max-w-[48ch] text-base leading-relaxed text-umber sm:col-span-8">
                  {feature.description}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
