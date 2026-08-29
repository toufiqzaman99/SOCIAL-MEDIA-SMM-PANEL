import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import PricingGrid from '@/components/pricing/PricingGrid'
import SectionHeading from '@/components/ui/SectionHeading'
import { platformById } from '@/data/platforms'
import { useCheckout } from '@/store/CheckoutContext'

export default function PricingSection() {
  const navigate = useNavigate()
  const { openCheckout } = useCheckout()
  const instagram = platformById('instagram')

  if (!instagram) return null

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          subtitle="No hidden fees — the price you see is the price you pay. Every package includes order tracking and support."
        />

        <div className="mt-12">
          <PricingGrid platform={instagram} onOrder={openCheckout} />
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/pricing')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-400/50 hover:bg-white/5"
          >
            View pricing for all platforms
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
