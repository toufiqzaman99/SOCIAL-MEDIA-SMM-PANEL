import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { fadeUp } from '@/components/ui/Reveal'
import { cn } from '@/lib/utils'

export interface PageHeaderProps {
  eyebrow?: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
  className?: string
}

/** Shared header for inner pages — clears the fixed navbar. */
export default function PageHeader({ eyebrow, title, subtitle, align = 'center', className }: PageHeaderProps) {
  const centered = align === 'center'
  return (
    <section className={cn('relative overflow-hidden pb-12 pt-28 sm:pb-16 sm:pt-36', className)}>
      <div className="container-x">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={cn('max-w-3xl', centered && 'mx-auto text-center')}
        >
          {eyebrow ? (
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-300">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {subtitle ? <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p> : null}
        </motion.div>
      </div>
    </section>
  )
}
