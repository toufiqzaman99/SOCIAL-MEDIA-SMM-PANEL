import { AlertCircle } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import ServiceCard from '@/components/services/ServiceCard'
import PageHeader from '@/components/ui/PageHeader'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { Skeleton } from '@/components/ui/States'
import { isPlatformId, platforms } from '@/data/platforms'
import { services, servicesForPlatform } from '@/data/services'
import { useCheckout } from '@/store/CheckoutContext'
import { useDemoLoading } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import type { PlatformId } from '@/types'

export default function ServicesPage() {
  const [searchParams] = useSearchParams()
  const initialPlatform = searchParams.get('platform')
  const [active, setActive] = useState<PlatformId | 'all'>(
    isPlatformId(initialPlatform) ? initialPlatform : 'all',
  )
  const loading = useDemoLoading(500)
  const { openCheckout } = useCheckout()

  const list = active === 'all' ? services : servicesForPlatform(active)

  const tabs: Array<{ id: PlatformId | 'all'; label: string }> = [
    { id: 'all', label: 'All' },
    ...platforms.map((p) => ({ id: p.id as PlatformId, label: p.name })),
  ]

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Creator Growth <span className="text-gradient">Services</span>
          </>
        }
        subtitle="A full catalog of marketing and growth campaigns across Instagram, TikTok, YouTube, Facebook, X and Telegram. Results may vary and are never guaranteed."
      />

      <section className="pb-24">
        <div className="container-x">
          {/* Platform tabs */}
          <div className="no-scrollbar -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
              {tabs.map((tab) => {
                const selected = active === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActive(tab.id)}
                    className={cn(
                      'inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                      selected
                        ? 'border-violet-400/50 bg-violet-500/15 text-white shadow-glow-sm'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
                    )}
                  >
                    {tab.id !== 'all' ? <PlatformIcon platform={tab.id} className="h-4 w-4" /> : null}
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {loading ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-3xl" />
              ))}
            </div>
          ) : (
            <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((service) => (
                <StaggerItem key={service.id} className="h-full">
                  <ServiceCard
                    service={service}
                    onOrder={(s) => openCheckout({ platformId: s.platform, serviceId: s.id })}
                  />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}

          <div className="mx-auto mt-12 flex max-w-3xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
            <p className="text-xs leading-relaxed text-slate-400">
              All Boostly services are <span className="font-semibold text-slate-200">marketing and growth services</span>{' '}
              delivered gradually as campaigns. Results may vary and are not guaranteed. We never ask for account
              credentials — only a public profile or page URL. Delivery estimates refer to when a campaign is
              estimated to begin.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
