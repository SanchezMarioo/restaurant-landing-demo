// components/signature-dishes-loading.tsx
export default function SignatureDishesLoading() {
  return (
    <section id="signature-menu" className="py-16 sm:py-24 lg:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 sm:mb-8">
            <div className="w-4 h-4 sm:w-5 sm:h-5 mr-2 bg-emerald-400/20 rounded animate-pulse"></div>
            <div className="w-48 h-4 bg-white/10 rounded animate-pulse"></div>
          </div>

          <div className="w-96 h-12 bg-gradient-to-r from-white/10 to-white/5 rounded-lg mx-auto mb-6 animate-pulse"></div>
          <div className="w-full max-w-3xl h-6 bg-white/5 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Dishes Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="overflow-hidden rounded-2xl sm:rounded-3xl bg-zinc-900/50 backdrop-blur-sm border border-white/10">
              {/* Image skeleton */}
              <div className="aspect-[4/3] w-full bg-gradient-to-b from-zinc-800/70 to-zinc-900/70 animate-pulse"></div>
              
              {/* Content skeleton */}
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="h-5 sm:h-6 bg-zinc-800/70 rounded-md w-3/4 animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-full animate-pulse"></div>
                <div className="h-3 sm:h-4 bg-zinc-800/70 rounded-md w-2/3 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-zinc-800/70 rounded w-16 animate-pulse"></div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-zinc-800/70 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Skeleton */}
        <div className="text-center">
          <div className="w-64 h-14 bg-gradient-to-r from-emerald-600/20 to-teal-700/20 rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
