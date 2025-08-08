"use client"

import dynamic from "next/dynamic"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"

// Lazy load all below-the-fold components to minimize initial JS bundle
const SignatureDishes = dynamic(() => import("@/components/signature-dishes"), { 
  ssr: false, 
  loading: () => <div className="h-96 bg-zinc-900/20 animate-pulse" />
})

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
      <HeroSection />
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
