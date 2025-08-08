"use client"

import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import CriticalHero from "@/components/critical-hero"

// Load SignatureDishes dynamically with better hydration handling
const SignatureDishes = dynamic(() => import("@/components/signature-dishes-dynamic"), { 
  ssr: false,
  loading: () => (
    <section className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
            <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 bg-emerald-400/20 rounded animate-pulse"></div>
            <div className="w-48 h-4 bg-white/10 rounded animate-pulse"></div>
          </div>
          <div className="w-96 h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mx-auto mb-6 animate-pulse"></div>
          <div className="w-full max-w-3xl h-6 bg-white/5 rounded mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10">
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-zinc-800/70 to-zinc-900/70 animate-pulse"></div>
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="h-5 sm:h-6 bg-zinc-800/70 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-full animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-2/3 animate-pulse"></div>
              </div>
            </div>
          ))}
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
