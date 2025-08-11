import MenuPage from "@/components/menu/menu-page"
import type { Metadata } from "next"

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
    <main className="min-h-screen bg-black text-white overflow-hidden">
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
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: '/' },
              { '@type': 'ListItem', position: 2, name: 'Menú', item: '/menu' }
            ]
          })
        }}
      />
      {/* Gradient background */}
      <div className="fixed inset-0 bg-gradient-radial from-zinc-800/20 via-black to-black -z-10"></div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] -z-10 pointer-events-none"></div>

      <MenuPage />
    </main>
  )
}
