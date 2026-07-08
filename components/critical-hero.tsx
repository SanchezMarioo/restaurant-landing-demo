import Image from "next/image"
import Link from "next/link"

/**
 * Hero fotográfico: la foto ES el hero (viewport completo, a sangre),
 * con degradado de carbón cálido direccional —nunca negro puro— y el
 * texto en crema abajo a la izquierda. Un panel crema texturizado se
 * solapa con la sección siguiente rompiendo el límite entre capas.
 * Server component: la entrada orquestada es CSS pura (.hero-anim).
 */
export default function CriticalHero() {
  return (
    <section id="hero" className="relative">
      {/* Fotografía protagonista */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="hero-anim relative h-full w-full"
          style={{ animationName: "hero-settle", animationDuration: "1.6s" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Mesa de Lumière en penumbra cálida, un plato emplatado bajo la luz de la lámpara"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            quality={85}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
          />
        </div>
        {/* Degradado cálido direccional: denso abajo-izquierda, aire arriba-derecha */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-char-deep/90 via-char-deep/45 to-char-deep/10"
          aria-hidden="true"
        />
      </div>

      {/* Texto sobre la foto */}
      <div className="on-photo relative z-10 flex min-h-[100svh] flex-col justify-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-40 md:px-10">
          <h1>
            <span
              className="hero-anim block text-sm font-medium uppercase tracking-label text-bone/80"
              style={{ animationName: "hero-fade", animationDelay: "0.15s" }}
            >
              Restaurante gastronómico en Madrid
            </span>
            <span className="mt-6 block font-serif text-[clamp(2.75rem,7.5vw,6rem)] font-medium leading-[1.04] text-bone">
              <span className="block overflow-hidden">
                <span className="hero-anim block" style={{ animationName: "hero-rise", animationDelay: "0.3s" }}>
                  El fuego <em className="font-normal italic text-terracotta-light">lento</em>
                </span>
              </span>
              <span className="block overflow-hidden">
                <span className="hero-anim block" style={{ animationName: "hero-rise", animationDelay: "0.42s" }}>
                  de Madrid
                </span>
              </span>
            </span>
          </h1>

          <p
            className="hero-anim mt-8 max-w-[46ch] text-lg leading-[1.6] text-bone/90"
            style={{ animationName: "hero-fade", animationDelay: "0.6s" }}
          >
            Cocina de autor sobre producto de lonja y de huerta. Menú degustación
            de siete pases, de martes a sábado.
          </p>

          <div
            className="hero-anim mt-10 flex flex-wrap items-center gap-x-10 gap-y-6"
            style={{ animationName: "hero-fade", animationDelay: "0.72s" }}
          >
            <a
              href="#contact"
              className="bg-terracotta px-8 py-4 text-sm font-medium uppercase tracking-label text-bone transition-colors duration-300 hover:bg-terracotta-deep"
            >
              Reservar mesa
            </a>
            <Link
              href="/menu"
              className="border-b border-bone/70 pb-1 text-sm font-medium uppercase tracking-label text-bone transition-colors duration-300 hover:border-terracotta-light hover:text-terracotta-light"
            >
              Ver la carta
            </Link>
          </div>
        </div>

        {/* Panel crema solapado: rompe el borde entre foto y sección siguiente */}
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div
            className="hero-anim texture relative z-20 -mb-12 inline-block border border-hairline bg-bone px-7 py-5"
            style={{ animationName: "hero-fade", animationDelay: "0.9s" }}
          >
            <p className="text-xs font-medium uppercase tracking-label text-terracotta">Servicio de hoy</p>
            <p className="mt-2 font-serif text-lg text-char">13:00–15:30 · 20:00–23:00</p>
            <p className="mt-0.5 text-sm text-umber">Calle Gourmet 123 · Madrid</p>
          </div>
        </div>
      </div>
    </section>
  )
}
