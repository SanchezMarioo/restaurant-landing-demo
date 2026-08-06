import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import CriticalHero from "@/components/critical-hero"
import { absoluteUrl } from "@/lib/site-url"

// Secciones bajo el pliegue: carga diferida con fallbacks neutros
// que reservan altura sin ornamento.
const SignatureDishes = dynamic(() => import("@/components/signature-dishes-working"), {
  loading: () => <section className="min-h-[60vh] bg-bone" aria-hidden="true" />,
})
const ValuesSection = dynamic(() => import("@/components/values-section"), {
  loading: () => <div className="min-h-72 bg-bone-deep" aria-hidden="true" />,
})
const Experience = dynamic(() => import("@/components/experience"), {
  loading: () => <div className="min-h-96 bg-bone" aria-hidden="true" />,
})
const ChefSection = dynamic(() => import("@/components/chef-section"), {
  loading: () => <div className="band-char min-h-96" aria-hidden="true" />,
})
const Testimonials = dynamic(() => import("@/components/testimonials"), {
  loading: () => <div className="min-h-72 bg-char-deep" aria-hidden="true" />,
})
const ContactSection = dynamic(() => import("@/components/contact-section"), {
  loading: () => <div className="min-h-96 bg-bone" aria-hidden="true" />,
})
const Footer = dynamic(() => import("@/components/footer"), {
  loading: () => <div className="band-char min-h-40" aria-hidden="true" />,
})

export const metadata: Metadata = {
  title: "Restaurante gastronómico en Madrid | Lumière",
  description:
    "Lumière, cocina de autor y alta gastronomía en Madrid. Reserva tu mesa y descubre nuestro menú degustación.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Restaurante gastronómico en Madrid | Lumière",
    description:
      "Cocina contemporánea con raíces mediterráneas en Madrid.",
    url: "/",
    type: "website",
  },
}

export default function Home() {
  return (
    <main id="main" className="relative min-h-screen bg-bone text-char">
      {/* Breadcrumbs JSON-LD para mejorar contexto semántico */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
            ],
          }),
        }}
      />
      <Navbar />
      <CriticalHero />
      <SignatureDishes />
      <ValuesSection />
      <Experience />
      <ChefSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </main>
  )
}
