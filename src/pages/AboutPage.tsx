import { Heart, ShieldCheck, Target } from 'lucide-react'

import CtaBanner from '@/components/home/CtaBanner'
import PageHeader from '@/components/ui/PageHeader'
import Counter from '@/components/ui/Counter'
import { Reveal, StaggerGroup, StaggerItem } from '@/components/ui/Reveal'

const values = [
  {
    icon: Target,
    title: '清晰为先',
    text: '价格透明、交付预估务实、措辞诚实——没有小字条款，也不做无法兑现的承诺。',
  },
  {
    icon: ShieldCheck,
    title: '安全为本',
    text: '我们绝不索要密码或账号凭证。一个公开主页链接就足够了。',
  },
  {
    icon: Heart,
    title: '为创作者而生',
    text: '从结算到控制台，每一个功能都围绕创作者的实际工作方式设计。',
  },
]

const stats = [
  { value: 128000, format: 'compact' as const, label: '创作者推广' },
  { value: 340000, format: 'compact' as const, label: '已交付订单' },
  { value: 6, format: 'int' as const, label: '支持平台' },
  { value: 24, format: 'int' as const, suffix: '/7', label: '客服覆盖' },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="关于我们"
        title={
          <>
            帮助创作者<span className="text-gradient">崭露头角、不断成长</span>
          </>
        }
        subtitle="Boostly 是面向创作者、品牌与企业的社媒增长营销服务平台。我们的使命很简单：让增长受众的过程，和您发布的内容一样干净、专业。"
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
              数据截至 2026 年 9 月。
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
