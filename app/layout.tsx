import type React from "react"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  preload: true,
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
})

export const metadata = {
  title: "Lumière - Experiencia Gastronómica",
  description: "Descubre una experiencia culinaria sublime en Lumière Restaurant",
  generator: 'v0.dev',
  robots: 'index, follow',
  keywords: 'restaurante, gastronomía, cocina gourmet, experiencia culinaria',
  openGraph: {
    title: 'Lumière - Experiencia Gastronómica',
    description: 'Descubre una experiencia culinaria sublime en Lumière Restaurant',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Estilos críticos inline básicos */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .min-h-screen{min-height:100vh}
            .bg-black{background-color:rgb(0 0 0)}
            .text-white{color:rgb(255 255 255)}
            .relative{position:relative}
            .absolute{position:absolute}
            .fixed{position:fixed}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .z-0{z-index:0}
            .z-10{z-index:10}
            .z-50{z-index:50}
            .container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .text-center{text-align:center}
            .font-serif{font-family:var(--font-playfair)}
            .font-sans{font-family:var(--font-inter)}
            .flex{display:flex}
            .hidden{display:none}
            .w-full{width:100%}
            .h-full{height:100%}
            .items-center{align-items:center}
            .justify-between{justify-content:space-between}
            .space-x-8>:not([hidden])~:not([hidden]){margin-left:2rem}
            @media(min-width:1024px){
              .lg\\:flex{display:flex !important}
              .lg\\:hidden{display:none !important}
            }
          `
        }} />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
        
        {/* Preload recursos críticos */}
        <link rel="preload" href="/placeholder.svg" as="image" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
