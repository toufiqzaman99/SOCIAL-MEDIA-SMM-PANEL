import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { currencies } from '@/lib/currency'
import { useApp } from '@/store/AppContext'
import { cn } from '@/lib/utils'

export interface CurrencySwitcherProps {
  /** dropdown → navbar pill · row → 4 buttons (mobile sheet) */
  variant?: 'dropdown' | 'row'
  className?: string
}

export default function CurrencySwitcher({ variant = 'dropdown', className }: CurrencySwitcherProps) {
  const { currency, setCurrency } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  if (variant === 'row') {
    return (
      <div className="grid grid-cols-4 gap-2">
        {currencies.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => setCurrency(c.code)}
            aria-pressed={currency === c.code}
            className={cn(
              'rounded-xl border px-1 py-2 text-sm font-semibold transition-all duration-200',
              currency === c.code
                ? 'border-violet-400/50 bg-violet-500/15 text-white'
                : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
            )}
          >
            {c.symbol}
            <span className="block text-[10px] font-normal text-slate-500">{c.code}</span>
          </button>
        ))}
      </div>
    )
  }

  const current = currencies.find((c) => c.code === currency) ?? currencies[1]

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose currency"
        aria-expanded={open}
        className="glass flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold text-white transition hover:border-violet-400/40"
      >
        <span>{current.symbol}</span>
        <span className="text-slate-400">{current.code}</span>
        <ChevronDown className={cn('h-3.5 w-3.5 text-slate-400 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="glass-strong absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-2xl bg-ink-900/95 p-1.5 shadow-card"
          >
            {currencies.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setCurrency(c.code)
                  setOpen(false)
                }}
                className={cn(
                  'flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition hover:bg-white/5',
                  currency === c.code ? 'text-white' : 'text-slate-300',
                )}
              >
                <span>
                  <span className="font-semibold">{c.symbol}</span>
                  <span className="ml-2 text-xs text-slate-400">{c.name}</span>
                </span>
                {currency === c.code ? <Check className="h-4 w-4 text-violet-300" /> : null}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
