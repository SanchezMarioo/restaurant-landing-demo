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
        {/* Estilos críticos inline expandidos */}
        <style dangerouslySetInnerHTML={{
          __html: `
            *{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}
            html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif}
            body{margin:0;line-height:inherit}
            .min-h-screen{min-height:100vh}
            .bg-black{background-color:rgb(0 0 0)}
            .text-white{color:rgb(255 255 255)}
            .relative{position:relative}
            .absolute{position:absolute}
            .inset-0{top:0;right:0;bottom:0;left:0}
            .z-0{z-index:0}
            .z-10{z-index:10}
            .z-20{z-index:20}
            .z-30{z-index:30}
            .z-40{z-index:40}
            .z-50{z-index:50}
            .container{width:100%;margin-left:auto;margin-right:auto;padding-left:1rem;padding-right:1rem}
            .mx-auto{margin-left:auto;margin-right:auto}
            .text-center{text-align:center}
            .font-serif{font-family:var(--font-playfair)}
            .font-sans{font-family:var(--font-inter)}
            .flex{display:flex}
            .grid{display:grid}
            .hidden{display:none}
            .w-full{width:100%}
            .h-full{height:100%}
            .object-cover{object-fit:cover}
            .transition-all{transition-property:all;transition-timing-function:cubic-bezier(0.4,0,0.2,1);transition-duration:150ms}
            .duration-300{transition-duration:300ms}
            .duration-500{transition-duration:500ms}
            .opacity-0{opacity:0}
            .opacity-100{opacity:1}
            @media(max-width:768px){.container{padding-left:0.5rem;padding-right:0.5rem}}
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
