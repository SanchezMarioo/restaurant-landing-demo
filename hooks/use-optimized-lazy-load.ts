"use client"

import { useEffect, useRef, useState } from 'react'
import { LAZY_CONFIG } from '@/lib/performance-config'

interface UseOptimizedLazyLoadOptions {
  rootMargin?: string
  threshold?: number
  triggerOnce?: boolean
}

export function useOptimizedLazyLoad<T extends HTMLElement>(
  options: UseOptimizedLazyLoadOptions = {}
) {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<T>(null)

  const {
    rootMargin = LAZY_CONFIG.rootMargin,
    threshold = LAZY_CONFIG.threshold,
    triggerOnce = true,
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsInView(false)
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold, triggerOnce])

  const markAsLoaded = () => setIsLoaded(true)

  return {
    ref,
    isInView,
    isLoaded,
    markAsLoaded,
  }
}

// Hook específico para imágenes
export function useImageLazyLoad<T extends HTMLElement>(
  options: UseOptimizedLazyLoadOptions = {}
) {
  const { ref, isInView, isLoaded, markAsLoaded } = useOptimizedLazyLoad<T>(options)
  
  const [hasError, setHasError] = useState(false)

  const handleImageLoad = () => {
    markAsLoaded()
  }

  const handleImageError = () => {
    setHasError(true)
    markAsLoaded()
  }

  return {
    ref,
    isInView,
    isLoaded,
    hasError,
    handleImageLoad,
    handleImageError,
  }
}

// Hook para componentes pesados con delay
export function useComponentLazyLoad<T extends HTMLElement>(
  delay: number = LAZY_CONFIG.componentDelay
) {
  const { ref, isInView, isLoaded, markAsLoaded } = useOptimizedLazyLoad<T>()
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    if (isInView && !shouldLoad) {
      const timer = setTimeout(() => {
        setShouldLoad(true)
        markAsLoaded()
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, shouldLoad, delay, markAsLoaded])

  return {
    ref,
    isInView,
    shouldLoad,
    isLoaded,
  }
}
