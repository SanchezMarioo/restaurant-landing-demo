import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Playfair_Display, Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  preload: true,
  fallback: ['serif']
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", 
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif']
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Lumière · Restaurante gastronómico en Madrid",
    template: "%s | Lumière"
  },
  description:
    "Restaurante gastronómico en Madrid con cocina de autor y productos de temporada. Reserva tu experiencia culinaria en Lumière.",
  keywords: [
    "restaurante gastronómico en Madrid",
    "restaurantes Madrid",
    "alta cocina Madrid",
    "cocina de autor",
    "degustación",
    "menú degustación Madrid",
    "Lumière restaurant"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
  'max-snippet': -1,
  'max-image-preview': 'large',
  'max-video-preview': -1
    }
  },
  alternates: {
    canonical: "/",
    languages: { es: "/" }
  },
  openGraph: {
    type: "website",
    url: new URL("/", siteUrl),
    title: "Lumière · Restaurante gastronómico en Madrid",
    description:
      "Cocina contemporánea con raíces mediterráneas en el corazón de Madrid.",
    siteName: "Lumière",
    locale: "es_ES",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Lumière Restaurant – Alta gastronomía en Madrid"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumière · Restaurante gastronómico en Madrid",
    description:
      "Vive una experiencia culinaria de alto nivel en Madrid.",
    images: ["/placeholder.jpg"]
  },
  icons: {
    icon: [{ url: "/placeholder-logo.svg" }],
    shortcut: ["/placeholder-logo.svg"],
    apple: ["/placeholder-logo.png"]
  },
  generator: "v0.dev"
}

export const viewport: Viewport = {
  width: "device-width",
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

        {/* JSON-LD: Restaurant */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Restaurant',
              name: 'Lumière',
              url: siteUrl,
              image: new URL('/placeholder.jpg', siteUrl).toString(),
              servesCuisine: ['Mediterránea', 'Contemporánea'],
              priceRange: '€€€',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Madrid',
                addressRegion: 'Madrid',
                addressCountry: 'ES'
              },
              acceptsReservations: true,
              sameAs: []
            })
          }}
        />
        {/* JSON-LD: Website with Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Lumière',
              url: siteUrl,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteUrl}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
      </head>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
