"use client"

import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import CriticalHero from "@/components/critical-hero"

// Load SignatureDishes dynamically with better hydration handling
const SignatureDishes = dynamic(() => import("@/components/signature-dishes-final"), { 
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
            style={{
              left: `${25 + (i * 12)}%`,
              top: `${40 + (i % 2) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10">
              <div className="aspect-[4/3] w-full relative bg-gradient-to-br from-zinc-800/70 via-zinc-700/50 to-zinc-900/70 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
              </div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="h-5 sm:h-6 bg-zinc-800/70 rounded-md w-3/4 animate-pulse" />
                <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-2/3 animate-pulse" style={{ animationDelay: '0.4s' }} />
                <div className="flex items-center gap-1 pt-2">
                  {[...Array(5)].map((_, starIndex) => (
                    <div
                      key={starIndex}
                      className="w-3 h-3 bg-emerald-400/20 rounded-full animate-pulse"
                      style={{ animationDelay: `${starIndex * 0.1 + index * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <div className="inline-flex items-center px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-full bg-gradient-to-r from-emerald-600/20 to-teal-700/20 border border-emerald-500/10 animate-pulse">
            <div className="w-4 h-4 mr-2 border-2 border-emerald-400/50 border-t-emerald-400 rounded-full animate-spin" />
            <span className="text-emerald-400/70 font-medium">Cargando carta completa...</span>
          </div>
        </div>
      </div>
    </section>
  )
})

// Lazy load all below-the-fold components to minimize initial JS bundle  
const ValuesSection = dynamic(() => import("@/components/values-section"), { 
  ssr: false, 
  loading: () => <div className="h-72 bg-zinc-900/20 animate-pulse" />
})

const Experience = dynamic(() => import("@/components/experience"), { 
  ssr: false, 
  loading: () => <div className="h-96 bg-zinc-900/20 animate-pulse" />
})

const ChefSection = dynamic(() => import("@/components/chef-section"), { 
  ssr: false, 
  loading: () => <div className="h-80 bg-zinc-900/20 animate-pulse" />
})

const Testimonials = dynamic(() => import("@/components/testimonials"), { 
  ssr: false, 
  loading: () => <div className="h-64 bg-zinc-900/20 animate-pulse" />
})

const ContactSection = dynamic(() => import("@/components/contact-section"), { 
  ssr: false, 
  loading: () => <div className="h-96 bg-zinc-900/20 animate-pulse" />
})

const CTASection = dynamic(() => import("@/components/cta-section"), { 
  ssr: false, 
  loading: () => <div className="h-48 bg-zinc-900/20 animate-pulse" />
})

const Footer = dynamic(() => import("@/components/footer"), { 
  ssr: false, 
  loading: () => <div className="h-40 bg-zinc-900/20 animate-pulse" />
})

const PersistentCTA = dynamic(() => import("@/components/persistent-cta"), { 
  ssr: false, 
  loading: () => null 
})

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { 
  ssr: false, 
  loading: () => null 
})

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Elegant gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 -z-10"></div>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-3 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

  {/* Mount custom cursor only on clients; dynamic import ensures it's not in initial JS */}
  <CustomCursor />
      <Navbar />
      <CriticalHero />
      <SignatureDishes />
      <ValuesSection />
      <Experience />
      <ChefSection />
      <Testimonials />
      <ContactSection />
      <CTASection />
      <Footer />
      <PersistentCTA />
    </main>
  )
}
