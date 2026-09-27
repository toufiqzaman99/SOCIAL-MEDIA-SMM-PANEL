import { Activity, BadgeDollarSign, Headphones, ShieldCheck, Sparkles, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import SectionHeading from '@/components/ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

interface Feature {
  icon: LucideIcon
  title: string
  text: string
}

const features: Feature[] = [
  {
    icon: Zap,
    title: '快速交付',
    text: '大多数推广在 1–24 小时内启动，每个套餐均标注预计交付时间。',
  },
  {
    icon: ShieldCheck,
    title: '安全结算',
    text: '简洁的结算流程，绝不索要密码或账号凭证。',
  },
  {
    icon: Headphones,
    title: '7×24 客服',
    text: '客服团队通过控制台与联系表单全天候为您服务。',
  },
  {
    icon: BadgeDollarSign,
    title: '价格透明',
    text: '套餐价格清晰明了，无隐藏费用。所见即所付。',
  },
  {
    icon: Activity,
    title: '订单跟踪',
    text: '每个推广都有实时状态更新——待处理、处理中、已完成或已取消。',
  },
  {
    icon: Sparkles,
    title: '创作者友好',
    text: '为创作者与成长型品牌打造：多个推广，一个简洁的控制台。',
  },
]

export default function WhyBoostly() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="为什么选择 Boostly"
          title="自信增长所需的一切"
          subtitle="我们专注于那些让增长平台值得信赖、使用愉悦的细节。"
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <StaggerItem key={feature.title}>
              <div className="glass group h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.text}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
