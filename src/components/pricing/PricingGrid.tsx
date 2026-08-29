import PricingCard from '@/components/pricing/PricingCard'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { flagshipFor } from '@/data/services'
import type { CheckoutPreset, Platform } from '@/types'

const tierNames = ['Starter', 'Growth', 'Pro', 'Max']

const sharedFeatures = [
  'Gradual, natural-paced delivery',
  'Order tracking in your dashboard',
  'No password required — public link only',
  '24/7 customer support',
]

export interface PricingGridProps {
  platform: Platform
  monthly?: boolean
  onOrder: (preset: CheckoutPreset) => void
}

/** The 4 flagship tiers for one platform. */
export default function PricingGrid({ platform, monthly = false, onOrder }: PricingGridProps) {
  const flagship = flagshipFor(platform.id)

  if (!flagship) return null

  return (
    <StaggerGroup className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {flagship.packages.map((pkg, i) => (
        <StaggerItem key={pkg.id} className="h-full">
          <PricingCard
            name={tierNames[i] ?? pkg.label}
            quantity={pkg.quantity}
            price={pkg.price}
            scopeLabel={`${platform.name} Growth`}
            deliveryEstimate={pkg.deliveryEstimate}
            features={[...sharedFeatures, ...(pkg.bestValue ? ['Priority campaign queue'] : [])]}
            bestValue={pkg.bestValue}
            monthly={monthly}
            onOrder={() => onOrder({ platformId: platform.id, serviceId: flagship.id, packageId: pkg.id })}
          />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
