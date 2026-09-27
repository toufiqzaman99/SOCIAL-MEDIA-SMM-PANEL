import { motion } from 'framer-motion'
import { Activity, CreditCard, Link2, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import SectionHeading from '@/components/ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

interface Step {
  icon: LucideIcon
  number: string
  title: string
  text: string
}

const steps: Step[] = [
  {
    icon: Search,
    number: '01',
    title: '选择服务',
    text: '浏览六大平台的增长套餐，挑选符合您目标的推广方案。',
  },
  {
    icon: Link2,
    number: '02',
    title: '填写主页 / 页面链接',
    text: '粘贴您想推广账号的公开链接。绝不索要密码。',
  },
  {
    icon: CreditCard,
    number: '03',
    title: '完成下单',
    text: '核对订单摘要并结算，您会立即收到订单编号。',
  },
  {
    icon: Activity,
    number: '04',
    title: '跟踪推广进度',
    text: '在控制台中查看实时状态更新，从处理中到完成一目了然。',
  },
]

export default function HowItWorks() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="运作流程"
          title="四步完成，从下单到见效"
          subtitle="为创作者设计的简洁透明流程——无需账号凭证，没有隐藏费用。"
        />

        <div className="relative mt-14">
          {/* Connector line (desktop) */}
          <div aria-hidden className="absolute left-0 right-0 top-9 hidden h-px bg-white/10 lg:block" />
          <motion.div
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: 'easeInOut' }}
            className="absolute left-0 right-0 top-9 hidden h-px origin-left bg-gradient-to-r from-violet-500 via-indigo-400 to-fuchsia-500 lg:block"
          />

          <StaggerGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((step) => (
              <StaggerItem key={step.number}>
                <div className="group relative flex flex-col items-center text-center lg:items-start lg:text-left">
                  <div className="glass-strong relative z-10 mb-5 grid h-16 w-16 place-items-center rounded-2xl transition-all duration-300 group-hover:border-violet-400/50 group-hover:shadow-glow-sm lg:h-[4.5rem] lg:w-[4.5rem]">
                    <step.icon className="h-6 w-6 text-violet-300 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-display text-sm font-bold tracking-widest text-violet-400">{step.number}</span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-400">{step.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  )
}
