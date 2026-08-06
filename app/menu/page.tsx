import MenuPage from "@/components/menu/menu-page"
import type { Metadata } from "next"
import { absoluteUrl } from "@/lib/site-url"

export const metadata: Metadata = {
  title: "Menú degustación y carta | Lumière",
  description:
    "Carta y menús degustación de Lumière: platos de temporada, especialidades del chef y opciones maridaje en Madrid.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menú degustación y carta | Lumière",
    description:
      "Platos de autor con ingredientes de temporada en Madrid.",
    url: "/menu",
    type: "website",
  },
}

export default function Menu() {
  return (
    <main id="main" className="min-h-screen bg-bone text-char">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Menu',
            name: 'Carta y Menú Degustación - Lumière',
            hasMenuSection: [
              { '@type': 'MenuSection', name: 'Entrantes' },
              { '@type': 'MenuSection', name: 'Principales' },
              { '@type': 'MenuSection', name: 'Postres' }
            ],
            offers: { '@type': 'Offer', availabilityStarts: '17:00', availabilityEnds: '23:30' }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
              { '@type': 'ListItem', position: 2, name: 'Menú', item: absoluteUrl('/menu') }
            ]
          })
        }}
      />
      <MenuPage />
    </main>
  )
}
