import PricingCard from '@/components/pricing/PricingCard'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { flagshipFor } from '@/data/services'
import type { CheckoutPreset, Platform } from '@/types'

const tierNames = ['入门', '进阶', '专业', '至尊']

const sharedFeatures = [
  '渐进、自然节奏的交付',
  '控制台订单跟踪',
  '无需密码——仅需公开链接',
  '7×24 小时客服支持',
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
            name={pkg.label ?? tierNames[i] ?? 'Package'}
            quantity={pkg.quantity}
            price={pkg.price}
            scopeLabel={`${platform.name} 增长`}
            deliveryEstimate={pkg.deliveryEstimate}
            features={[...sharedFeatures, ...(pkg.bestValue ? ['优先推广队列'] : [])]}
            bestValue={pkg.bestValue}
            monthly={monthly}
            onOrder={() => onOrder({ platformId: platform.id, serviceId: flagship.id, packageId: pkg.id })}
          />
        </StaggerItem>
      ))}
    </StaggerGroup>
  )
}
