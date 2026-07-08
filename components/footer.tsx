import Link from "next/link"

/**
 * Footer: banda de carbón cálido texturizado, wordmark grande en Vollkorn,
 * columnas alineadas a la izquierda y hairlines crema. Redes como enlaces
 * de texto, no iconos.
 */
export default function Footer() {
  return (
    <footer className="band-char px-6 py-20 text-bone/75 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-serif text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-none tracking-[0.08em] text-bone">
              LUMIÈRE
            </p>
            <p className="mt-6 max-w-[44ch] text-base leading-[1.7]">
              Cocina de autor y producto de temporada en el centro de Madrid.
              Un espacio donde la gastronomía se convierte en oficio callado.
            </p>
            <div className="mt-8 flex gap-8">
              <a
                href="#"
                className="border-b border-hairline-light pb-0.5 text-xs font-medium uppercase tracking-label text-bone/75 transition-colors duration-300 hover:border-terracotta-light hover:text-terracotta-light"
              >
                Instagram
              </a>
              <a
                href="#"
                className="border-b border-hairline-light pb-0.5 text-xs font-medium uppercase tracking-label text-bone/75 transition-colors duration-300 hover:border-terracotta-light hover:text-terracotta-light"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 lg:col-start-7">
            <h3 className="text-xs font-medium uppercase tracking-label text-bone/50">Horario</h3>
            <ul className="mt-6 space-y-4 text-base">
              <li className="border-b border-hairline-light pb-4">
                <span className="block text-bone/55">Martes — Jueves</span>
                <span className="mt-1 block font-serif text-bone">13:00–15:30 · 20:00–23:00</span>
              </li>
              <li className="border-b border-hairline-light pb-4">
                <span className="block text-bone/55">Viernes — Sábado</span>
                <span className="mt-1 block font-serif text-bone">13:00–15:30 · 20:00–23:30</span>
              </li>
              <li>
                <span className="block text-bone/55">Domingo — Lunes</span>
                <span className="mt-1 block font-serif text-bone">Cerrado</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-xs font-medium uppercase tracking-label text-bone/50">Contacto</h3>
            <address className="mt-6 space-y-4 text-base not-italic">
              <p>Calle Gourmet 123, 28001 Madrid</p>
              <p>
                <a href="tel:+34912345678" className="font-serif text-bone transition-colors duration-300 hover:text-terracotta-light">
                  +34 912 345 678
                </a>
              </p>
              <p>
                <a
                  href="mailto:reservas@lumiererestaurant.com"
                  className="break-all text-bone transition-colors duration-300 hover:text-terracotta-light"
                >
                  reservas@lumiererestaurant.com
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-hairline-light pt-8 text-sm text-bone/50 sm:flex-row sm:items-baseline sm:justify-between">
          <p>© {new Date().getFullYear()} Lumière Restaurant. Todos los derechos reservados.</p>
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="#" className="transition-colors duration-300 hover:text-bone">
              Privacidad
            </Link>
            <Link href="#" className="transition-colors duration-300 hover:text-bone">
              Términos
            </Link>
            <Link href="#" className="transition-colors duration-300 hover:text-bone">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
