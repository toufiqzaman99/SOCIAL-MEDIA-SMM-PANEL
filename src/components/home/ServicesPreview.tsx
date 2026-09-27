import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import ServiceCard from '@/components/services/ServiceCard'
import SectionHeading from '@/components/ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { popularServices } from '@/data/services'
import { useCheckout } from '@/store/CheckoutContext'

export default function ServicesPreview() {
  const navigate = useNavigate()
  const { openCheckout } = useCheckout()
  const services = popularServices(6)

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="创作者增长"
          title="热门互动套餐"
          subtitle="完整目录抢先看——覆盖六大平台的粉丝、点赞、播放量与互动推广。"
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id} className="h-full">
              <ServiceCard
                service={service}
                onOrder={(s) => openCheckout({ platformId: s.platform, serviceId: s.id })}
              />
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-violet-400/50 hover:bg-white/5"
          >
            查看全部服务
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
