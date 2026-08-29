import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

const sizes = {
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'w-full max-w-6xl',
} as const

export interface ModalProps {
  open: boolean
  onClose: () => void
  size?: keyof typeof sizes
  title?: string
  description?: string
  dismissible?: boolean
  children: ReactNode
}

export default function Modal({
  open,
  onClose,
  size = 'md',
  title,
  description,
  dismissible = true,
  children,
}: ModalProps) {
  // Lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dismissible) onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, dismissible, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismissible ? onClose : undefined}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={cn(
              'relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-2xl',
              sizes[size],
            )}
          >
            {title || dismissible ? (
              <div className="flex items-start justify-between gap-4 border-b border-white/5 px-6 py-4">
                <div className="min-w-0">
                  {title ? <h3 className="font-display text-lg font-semibold text-white">{title}</h3> : null}
                  {description ? <p className="mt-0.5 text-sm text-slate-400">{description}</p> : null}
                </div>
                {dismissible ? (
                  <button
                    onClick={onClose}
                    aria-label="Close dialog"
                    className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                ) : null}
              </div>
            ) : null}
            <div className="flex-1 overflow-y-auto px-6 py-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
