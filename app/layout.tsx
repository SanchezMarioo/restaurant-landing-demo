import type React from "react"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Lumière - Experiencia Gastronómica",
  description: "Descubre una experiencia culinaria sublime en Lumière Restaurant",
  generator: 'v0.dev',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Estilos críticos inline */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .min-h-screen{min-height:100vh}
            .bg-black{background-color:rgb(0 0 0)}
            .text-white{color:rgb(255 255 255)}
            .relative{position:relative}
            .absolute{position:absolute}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .z-0{z-index:0}
            .z-10{z-index:10}
            .container{width:100%}
            .mx-auto{margin-left:auto;margin-right:auto}
            .text-center{text-align:center}
            .font-serif{font-family:var(--font-playfair)}
            .font-sans{font-family:var(--font-inter)}
          `
        }} />
        
        {/* Preconnect para recursos externos */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://tile.openstreetmap.org" />
        <link rel="dns-prefetch" href="https://unpkg.com" />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
