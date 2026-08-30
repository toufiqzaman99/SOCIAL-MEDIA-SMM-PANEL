import { Check } from 'lucide-react'

import Button from '@/components/ui/Button'
import { useApp } from '@/store/AppContext'
import { formatNumber, cn } from '@/lib/utils'

export interface PricingCardProps {
  name: string
  quantity: number
  price: number
  /** e.g. "Instagram Growth" */
  scopeLabel: string
  deliveryEstimate: string
  features: string[]
  bestValue?: boolean
  monthly?: boolean
  onOrder: () => void
}

export default function PricingCard({
  name,
  quantity,
  price,
  scopeLabel,
  deliveryEstimate,
  features,
  bestValue = false,
  monthly = false,
  onOrder,
}: PricingCardProps) {
  const { format, formatPerUnit } = useApp()
  const displayPrice = monthly ? Math.round(price * 0.8 * 100) / 100 : price

  return (
    <div
      className={cn(
        'relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5',
        bestValue
          ? 'border-violet-400/50 bg-violet-500/[0.07] shadow-glow-sm'
          : 'glass hover:border-white/20 hover:shadow-card',
      )}
    >
      {bestValue ? (
        <span className="bg-brand-gradient absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow-sm">
          Best value
        </span>
      ) : null}

      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{scopeLabel}</p>
      <h3 className="mt-2 font-display text-xl font-semibold text-white">{name}</h3>

      <p className="mt-4 font-display text-2xl font-bold text-white">
        {formatNumber(quantity)} <span className="text-base font-medium text-slate-400">Growth Credits</span>
      </p>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span className="font-display text-4xl font-bold tracking-tight text-white">
          {format(displayPrice)}
        </span>
        {monthly ? <span className="text-sm text-slate-400">/mo</span> : null}
      </div>
      <p className="mt-1 text-xs text-slate-500">
        ≈ {formatPerUnit(displayPrice / quantity)} per credit{monthly ? ' · demo billing' : ''}
      </p>

      <ul className="mt-6 flex-1 space-y-3 border-t border-white/5 pt-5">
        <li className="flex items-center gap-2.5 text-sm text-slate-300">
          <Check className="h-4 w-4 shrink-0 text-emerald-400" />
          {deliveryEstimate}
        </li>
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-300">
            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
            {feature}
          </li>
        ))}
      </ul>

      <Button
        variant={bestValue ? 'primary' : 'outline'}
        fullWidth
        className="mt-6"
        onClick={onOrder}
      >
        Order Now
      </Button>
      <p className="mt-3 text-center text-[11px] leading-relaxed text-slate-600">
        Marketing/growth service — results may vary and are not guaranteed.
      </p>
    </div>
  )
}
