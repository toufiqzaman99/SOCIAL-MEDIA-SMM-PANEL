import { ArrowRight } from 'lucide-react'

import { ServiceIcon } from '@/components/icons/ServiceIcons'
import { platformById } from '@/data/platforms'
import type { Service } from '@/types'
import { cn, formatCurrency } from '@/lib/utils'

export interface ServiceCardProps {
  service: Service
  onOrder: (service: Service) => void
}

export default function ServiceCard({ service, onOrder }: ServiceCardProps) {
  const platform = platformById(service.platform)
  const startingPrice = Math.min(...service.packages.map((p) => p.price))

  return (
    <div
      className="glass group relative h-full cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-glow-sm"
      onClick={() => onOrder(service)}
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {service.popular ? (
        <span className="bg-brand-gradient absolute right-4 top-4 rounded-full px-2.5 py-1 text-[11px] font-semibold text-white shadow-glow-sm">
          Popular
        </span>
      ) : null}

      <div className="relative">
        <span
          className={cn(
            'grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110',
            platform?.gradient,
            platform?.glow,
          )}
        >
          <ServiceIcon icon={service.icon} className="h-6 w-6" />
        </span>

        <div className="mt-5 flex items-center gap-2">
          <h3 className="font-display text-lg font-semibold text-white">{service.name}</h3>
        </div>
        <p className="mt-2 min-h-10 text-sm leading-relaxed text-slate-400">{service.description}</p>

        <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4">
          <div>
            <p className="text-xs text-slate-500">From</p>
            <p className="font-display text-lg font-bold text-white">{formatCurrency(startingPrice)}</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-xl border border-violet-400/30 bg-violet-400/10 px-3.5 py-2 text-sm font-semibold text-violet-300 transition group-hover:bg-violet-400/20 group-hover:text-violet-200">
            Order Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
        <p className="mt-3 text-xs text-slate-500">{service.deliveryEstimate} · no password required</p>
      </div>
    </div>
  )
}
