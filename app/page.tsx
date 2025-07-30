import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import FuturisticShowcase from "@/components/futuristic-showcase"
import Experience from "@/components/experience"
import FeaturedDishes from "@/components/featured-dishes"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">
      {/* Elegant gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 -z-10"></div>

      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-3 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.02] -z-10 pointer-events-none"></div>

      <CustomCursor />
      <Navbar />
      <HeroSection />
      <FeaturedDishes />
      <FuturisticShowcase />
      <Experience />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  )
}
