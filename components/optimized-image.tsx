"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
  fill?: boolean
  sizes?: string
  quality?: number
  priority?: boolean
  placeholder?: "blur" | "empty"
  blurDataURL?: string
  onLoad?: () => void
  width?: number
  height?: number
}

const generateBlurDataURL = (width = 8, height = 8) => {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#1a1a1a"/>
      <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.3"/>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2a2a2a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>`
  ).toString('base64')}`
}

export default function OptimizedImage({
  src,
  alt,
  className,
  fill = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw",
  quality = 75,
  priority = false,
  placeholder = "blur",
  blurDataURL,
  onLoad,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  const optimizedBlurDataURL = blurDataURL || generateBlurDataURL()

  if (hasError) {
    return (
      <div className={cn("bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center", className)}>
        <div className="text-zinc-500 text-sm">
          Imagen no disponible
        </div>
      </div>
    )
  }

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      fill={fill}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={cn(
        "transition-all duration-500 ease-in-out",
        isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
        className
      )}
      sizes={sizes}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      blurDataURL={optimizedBlurDataURL}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      {...props}
    />
  )
}
