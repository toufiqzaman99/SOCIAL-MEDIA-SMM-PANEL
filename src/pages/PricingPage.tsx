import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import { useState } from 'react'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import PricingGrid from '@/components/pricing/PricingGrid'
import MembershipSection from '@/components/membership/MembershipSection'
import FaqSection from '@/components/home/FaqSection'
import PageHeader from '@/components/ui/PageHeader'
import { platforms } from '@/data/platforms'
import { useCheckout } from '@/store/CheckoutContext'
import { cn } from '@/lib/utils'
import type { CheckoutPreset, PlatformId } from '@/types'

type Billing = 'one-time' | 'monthly'

export default function PricingPage() {
  const [platformId, setPlatformId] = useState<PlatformId>('instagram')
  const [billing, setBilling] = useState<Billing>('one-time')
  const { openCheckout } = useCheckout()

  const platform = platforms.find((p) => p.id === platformId) ?? platforms[0]

  const handleOrder = (preset: CheckoutPreset) => {
    openCheckout({ ...preset, platformId: preset.platformId ?? platformId })
  }

  return (
    <>
      <PageHeader
        eyebrow="价格方案"
        title={
          <>
            增长套餐，<span className="text-gradient">价格清晰</span>
          </>
        }
        subtitle="一次性或按自然月计费。每个套餐均包含订单跟踪与客服支持，无隐藏费用。"
      />

      <section className="pb-24">
        <div className="container-x">
          {/* Billing toggle */}
          <div className="flex justify-center">
            <div className="glass inline-flex rounded-full p-1">
              {(['one-time', 'monthly'] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => setBilling(option)}
                  className={cn(
                    'relative rounded-full px-5 py-2 text-sm font-semibold transition-colors',
                    billing === option ? 'text-white' : 'text-slate-400 hover:text-white',
                  )}
                >
                  {billing === option ? (
                    <motion.span
                      layoutId="billing-pill"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      className="bg-brand-gradient absolute inset-0 rounded-full shadow-glow-sm"
                    />
                  ) : null}
                  <span className="relative">{option === 'one-time' ? '一次性' : '月付'}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-slate-500">
            {billing === 'monthly' ? '月付方案按自然月计费，可随时取消。' : '所有套餐均包含订单跟踪与客服支持。'}
          </p>

          {/* Platform tabs */}
          <div className="no-scrollbar -mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div className="flex w-max gap-2 sm:w-full sm:flex-wrap sm:justify-center">
              {platforms.map((p) => {
                const selected = p.id === platformId
                return (
                  <button
                    key={p.id}
                    onClick={() => setPlatformId(p.id)}
                    className={cn(
                      'inline-flex items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200',
                      selected
                        ? 'border-violet-400/50 bg-violet-500/15 text-white shadow-glow-sm'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
                    )}
                  >
                    <PlatformIcon platform={p.id} className="h-4 w-4" />
                    {p.name}
                  </button>
                )
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={platformId + billing}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="mt-10"
            >
              <PricingGrid platform={platform} monthly={billing === 'monthly'} onOrder={handleOrder} />
            </motion.div>
          </AnimatePresence>

          <div className="mx-auto mt-12 flex max-w-3xl items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
            <p className="text-xs leading-relaxed text-slate-400">
              所有套餐均为营销/增长推广。效果可能因人而异，不作保证。交付时间预估指推广预计开始的时间。全程无需任何账号凭证。
            </p>
          </div>
        </div>
      </section>

      <MembershipSection />
      <FaqSection />
    </>
  )
}
