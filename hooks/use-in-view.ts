"use client"

import { useState, useEffect, useRef, type RefObject } from "react"

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {},
): [RefObject<T>, boolean] {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options
  const ref = useRef<T>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || (once && isInView)) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once && observer && element) {
            observer.unobserve(element)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)

    return () => {
      if (observer && element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, once, isInView])

  return [ref, isInView]
}
