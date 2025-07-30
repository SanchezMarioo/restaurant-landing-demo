import MenuPage from "@/components/menu/menu-page"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Menú Completo | Lumière Restaurant",
  description: "Explora nuestra carta completa con platos de temporada y especialidades del chef.",
}

export default function Menu() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
      <main className="min-h-screen bg-black text-white overflow-hidden">
        {/* Gradient background */}
        <div className="fixed inset-0 bg-gradient-radial from-zinc-800/20 via-black to-black -z-10"></div>

        {/* Noise texture overlay */}
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-[0.03] -z-10 pointer-events-none"></div>

        <MenuPage />
      </main>
    </ThemeProvider>
  )
}
