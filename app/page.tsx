import dynamic from "next/dynamic"
import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import CriticalHero from "@/components/critical-hero"

// Load SignatureDishes dynamically with performance optimization
const SignatureDishes = dynamic(() => import("@/components/signature-dishes-working"), { 
  ssr: false,
  loading: () => (
    <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden opacity-0 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
      {/* Simple loading particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/20 rounded-full animate-pulse"
            style={{ left: `${25 + (i * 12)}%`, top: `${40 + (i % 2) * 20}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
            <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 bg-emerald-400/30 rounded-full animate-spin"></div>
            <div className="text-emerald-400 text-xs sm:text-sm font-medium">CARGANDO ESPECIALIDADES</div>
          </div>
          <div className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-600 animate-pulse">
            Nuestras Especialidades
          </div>
          <div className="text-base sm:text-lg lg:text-xl text-zinc-300/70 max-w-3xl mx-auto leading-relaxed px-4">
            Preparando nuestros mejores platos...
          </div>
        </div>
      </div>
    </section>
  )
})

// Lazy load below-the-fold sections with more aggressive loading
const ValuesSection = dynamic(() => import("@/components/values-section"), { 
  ssr: false,
  loading: () => <div className="h-72 bg-zinc-900/10" />
})
const Experience = dynamic(() => import("@/components/experience"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-zinc-900/10" />
})
const ChefSection = dynamic(() => import("@/components/chef-section"), { 
  ssr: false,
  loading: () => <div className="h-80 bg-zinc-900/10" />
})
const Testimonials = dynamic(() => import("@/components/testimonials"), { 
  ssr: false,
  loading: () => <div className="h-64 bg-zinc-900/10" />
})
const ContactSection = dynamic(() => import("@/components/contact-section"), { 
  ssr: false,
  loading: () => <div className="h-96 bg-zinc-900/10" />
})
const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
  loading: () => <div className="h-40 bg-zinc-900/10" />
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
    <main className="min-h-screen">
      {/* Breadcrumbs JSON-LD para mejorar contexto semántico */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Inicio', item: '/' },
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
