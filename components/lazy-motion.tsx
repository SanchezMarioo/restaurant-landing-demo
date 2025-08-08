"use client"

import { lazy, Suspense } from 'react'

// Lazy load framer-motion components
const MotionDiv = lazy(() => 
  import('framer-motion').then(mod => ({ default: mod.motion.div }))
)

const MotionSection = lazy(() => 
  import('framer-motion').then(mod => ({ default: mod.motion.section }))
)

const MotionSpan = lazy(() => 
  import('framer-motion').then(mod => ({ default: mod.motion.span }))
)

// Fallback component for loading
const MotionFallback = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
)

// Wrapper components with proper typing
interface MotionProps {
  children: React.ReactNode
  className?: string
  initial?: any
  animate?: any
  transition?: any
  whileHover?: any
  whileInView?: any
  viewport?: any
  [key: string]: any
}

export const LazyMotionDiv = ({ children, ...props }: MotionProps) => (
  <Suspense fallback={<MotionFallback className={props.className}>{children}</MotionFallback>}>
    <MotionDiv {...props}>{children}</MotionDiv>
  </Suspense>
)

export const LazyMotionSection = ({ children, ...props }: MotionProps) => (
  <Suspense fallback={<MotionFallback className={props.className}>{children}</MotionFallback>}>
    <MotionSection {...props}>{children}</MotionSection>
  </Suspense>
)

export const LazyMotionSpan = ({ children, ...props }: MotionProps) => (
  <Suspense fallback={<MotionFallback className={props.className}>{children}</MotionFallback>}>
    <MotionSpan {...props}>{children}</MotionSpan>
  </Suspense>
)
