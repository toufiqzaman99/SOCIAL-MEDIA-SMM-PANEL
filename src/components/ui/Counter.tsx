import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { formatCompact, formatNumber } from '@/lib/utils'

export interface CounterProps {
  value: number
  /** int → 12,450 · compact → 12.4K / 245K */
  format?: 'int' | 'compact'
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}

/** Animated number counter that starts when scrolled into view. */
export default function Counter({
  value,
  format = 'int',
  prefix = '',
  suffix = '',
  className,
  duration = 1.8,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduced) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, reduced, value, duration])

  const formatted = format === 'compact' ? formatCompact(display) : formatNumber(display)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
