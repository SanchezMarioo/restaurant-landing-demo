import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import SignatureDishes from "@/components/signature-dishes"
import ValuesSection from "@/components/values-section"
import Experience from "@/components/experience"
import ChefSection from "@/components/chef-section"
import Testimonials from "@/components/testimonials"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"
import PersistentCTA from "@/components/persistent-cta"
import { ThemeProvider } from "@/components/theme-provider"
import CustomCursor from "@/components/custom-cursor"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
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
    </ThemeProvider>
  )
}
