
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
        <body className="font-sans">{children}</body>
      </html>
    </ThemeProvider>
  )
}
