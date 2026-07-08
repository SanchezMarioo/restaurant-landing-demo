import Image from "next/image"

/**
 * Cabecera de la carta: fotografía a sangre con degradado de carbón cálido
 * y titular crema superpuesto abajo a la izquierda. Entrada CSS (.hero-anim).
 */
export default function MenuHeader() {
  return (
    <header className="relative">
      <div className="relative h-[46vh] min-h-[340px] w-full lg:h-[54vh]">
        <Image
          src="https://images.unsplash.com/photo-1633436375153-d7045cb93e38?q=80&w=2012&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt="Risotto de setas silvestres recién emplatado en la cocina de Lumière"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={85}
        />
        <div
          className="absolute inset-0 bg-gradient-to-tr from-char-deep/85 via-char-deep/40 to-char-deep/10"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 flex items-end">
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-12 md:px-10 lg:pb-16">
          <p
            className="hero-anim text-sm font-medium uppercase tracking-label text-bone/80"
            style={{ animationName: "hero-fade", animationDelay: "0.05s" }}
          >
            Cocina de temporada · Madrid
          </p>
          <h1 className="mt-4 block overflow-hidden font-serif text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[1.05] text-bone">
            <span className="hero-anim block" style={{ animationName: "hero-rise", animationDelay: "0.18s" }}>
              La carta
            </span>
          </h1>
          <p
            className="hero-anim mt-5 max-w-[52ch] text-lg leading-[1.6] text-bone/90"
            style={{ animationName: "hero-fade", animationDelay: "0.4s" }}
          >
            Platos de temporada sobre producto de lonja y de huerta.
            La carta cambia cuando cambia el mercado.
          </p>
        </div>
      </div>
    </header>
  )
}
