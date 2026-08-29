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
    title: 'Fast Delivery',
    text: 'Most campaigns begin within 1–24 hours, with delivery estimates shown on every package.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Checkout',
    text: 'A clean checkout flow that never asks for passwords or account credentials — ever.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    text: 'A support team that answers through your dashboard and contact form, around the clock.',
  },
  {
    icon: BadgeDollarSign,
    title: 'Transparent Pricing',
    text: 'Clear package pricing with no hidden fees. What you see at checkout is what you pay.',
  },
  {
    icon: Activity,
    title: 'Order Tracking',
    text: 'Live status updates for every campaign — Pending, Processing, Completed or Cancelled.',
  },
  {
    icon: Sparkles,
    title: 'Creator Friendly',
    text: 'Built for creators and growing brands: multiple campaigns, one simple dashboard.',
  },
]

export default function WhyBoostly() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Boostly"
          title="Everything you need to grow with confidence"
          subtitle="We focused on the details that make a growth platform trustworthy and pleasant to use."
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
