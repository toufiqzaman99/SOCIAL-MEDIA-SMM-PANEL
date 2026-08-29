import { Heart, ShieldCheck, Target } from 'lucide-react'

import CtaBanner from '@/components/home/CtaBanner'
import PageHeader from '@/components/ui/PageHeader'
import Counter from '@/components/ui/Counter'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

const values = [
  {
    icon: Target,
    title: 'Clarity first',
    text: 'Clear pricing, realistic delivery estimates and honest wording — no fine print and no guarantees we cannot keep.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety by design',
    text: 'We never ask for passwords or account credentials. A public profile link is all we ever need.',
  },
  {
    icon: Heart,
    title: 'Built for creators',
    text: 'Every feature — from the checkout to the dashboard — is designed around how creators actually work.',
  },
]

const stats = [
  { value: 128000, format: 'compact' as const, label: 'Creator campaigns' },
  { value: 340000, format: 'compact' as const, label: 'Orders delivered' },
  { value: 6, format: 'int' as const, label: 'Platforms supported' },
  { value: 24, format: 'int' as const, suffix: '/7', label: 'Support coverage' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            We help creators <span className="text-gradient">show up and grow</span>
          </>
        }
        subtitle="Boostly is a social media growth and marketing services platform for creators, brands and businesses. Our mission is simple: make growing an audience feel as clean and professional as the content you publish."
      />

      <section className="pb-20">
        <div className="container-x">
          {/* Stats strip */}
          <Reveal>
            <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <Counter
                    value={stat.value}
                    format={stat.format}
                    suffix={stat.suffix ?? ''}
                    className="font-display text-3xl font-bold text-white sm:text-4xl"
                  />
                  <p className="mt-1.5 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[11px] text-slate-600">
              Illustrative demo figures — this is a demonstration platform.
            </p>
          </Reveal>

          {/* Values */}
          <StaggerGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="glass h-full rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/10 text-violet-300">
                    <value.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{value.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
