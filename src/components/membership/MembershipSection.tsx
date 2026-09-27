import { Check, CreditCard, Crown, Info, Sparkles, Star, Zap } from 'lucide-react'
import { useState } from 'react'
import type { ComponentType } from 'react'

import AlipayIcon from '@/components/icons/AlipayIcon'
import WechatIcon from '@/components/icons/WechatIcon'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import SectionHeading from '@/components/ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn } from '@/lib/utils'

interface MembershipTier {
  id: string
  name: string
  /** HKD base price per month — converted for display like every other price */
  monthlyPriceHkd: number
  icon: ComponentType<{ className?: string }>
  benefits: string[]
  featured?: boolean
}

const tiers: MembershipTier[] = [
  {
    id: 'membership-basic',
    name: '基础会员',
    monthlyPriceHkd: 88,
    icon: Star,
    benefits: ['每月 10,000 直播观看额度', '标准交付速度', '基础客服支持'],
  },
  {
    id: 'membership-pro',
    name: '专业会员',
    monthlyPriceHkd: 238,
    icon: Zap,
    featured: true,
    benefits: ['每月 50,000 直播观看额度', '优先交付队列', '专属客服通道', '全部服务 95 折'],
  },
  {
    id: 'membership-max',
    name: '至尊会员',
    monthlyPriceHkd: 498,
    icon: Crown,
    benefits: ['每月 200,000 直播观看额度', '顶级优先交付', '7×24 专属客服', '全部服务 9 折', '每月专属赠礼'],
  },
]

const payMethods: Array<{ id: string; label: string; icon: ComponentType<{ className?: string }> }> = [
  { id: 'alipay', label: '支付宝', icon: AlipayIcon },
  { id: 'wechat', label: '微信支付', icon: WechatIcon },
  { id: 'card', label: '银行卡', icon: CreditCard },
]

export default function MembershipSection() {
  const { format } = useApp()
  const { push } = useToast()
  const [selected, setSelected] = useState<MembershipTier | null>(null)
  const [method, setMethod] = useState('alipay')
  const [busy, setBusy] = useState(false)

  const handleSubscribe = () => {
    if (!selected) return
    setBusy(true)
    // Subscription confirmation — simulated locally for this demo build.
    setTimeout(() => {
      setBusy(false)
      setSelected(null)
      push({
        title: '会员开通成功',
        description: `您已开通${selected.name}，会员权益立即生效。`,
        type: 'success',
      })
    }, 700)
  }

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="月度会员"
          title={
            <>
              会员套餐 · <span className="text-gradient">直播增长</span>
            </>
          }
          subtitle="每月定额直播观看，配套专属权益。开通后立即生效。"
        />

        <StaggerGroup className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {tiers.map((tier) => (
            <StaggerItem key={tier.id} className="h-full">
              <div
                className={cn(
                  'relative flex h-full flex-col rounded-3xl border p-6 transition-all duration-300 hover:-translate-y-1.5',
                  tier.featured
                    ? 'border-violet-400/50 bg-violet-500/[0.07] shadow-glow-sm'
                    : 'glass hover:border-white/20 hover:shadow-card',
                )}
              >
                {tier.featured ? (
                  <span className="bg-brand-gradient absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-glow-sm">
                    推荐
                  </span>
                ) : null}

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid h-11 w-11 place-items-center rounded-2xl',
                      tier.featured ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-500/10 text-violet-300',
                    )}
                  >
                    <tier.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-white">{tier.name}</h3>
                </div>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-bold tracking-tight text-white">
                    {format(tier.monthlyPriceHkd)}
                  </span>
                  <span className="text-sm text-slate-400">/ 月</span>
                </p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-white/5 pt-5">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.featured ? 'primary' : 'outline'}
                  fullWidth
                  className="mt-6"
                  icon={Sparkles}
                  onClick={() => setSelected(tier)}
                >
                  开通会员
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <p className="mt-8 text-center text-xs text-slate-600">
          会员按自然月自动续费，可随时取消。直播观看额度每月自动重置。
        </p>
      </div>

      {/* Subscribe modal */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title="开通会员"
        description="确认您的会员套餐"
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-start gap-2.5 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-3.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <p className="text-xs leading-relaxed text-sky-200">
                开通后立即生效，按自然月自动续费，可随时在账户设置中取消。
              </p>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">套餐</span>
                <span className="font-medium text-white">{selected.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">周期</span>
                <span className="font-medium text-white">每月</span>
              </div>
              <div className="flex justify-between gap-4 border-t border-white/10 pt-2.5">
                <span className="font-semibold text-white">月费</span>
                <span className="font-display text-lg font-bold text-white">
                  {format(selected.monthlyPriceHkd)}
                </span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-200">支付方式</p>
              <div className="grid grid-cols-3 gap-2.5">
                {payMethods.map((m) => {
                  const isSelected = m.id === method
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setMethod(m.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        'flex flex-col items-start gap-1.5 rounded-2xl border p-3.5 text-left transition-all duration-200',
                        isSelected
                          ? 'border-violet-400/60 bg-violet-500/10'
                          : 'border-white/10 bg-white/[0.03] hover:border-white/25',
                      )}
                    >
                      <m.icon className={cn('h-5 w-5', isSelected ? 'text-violet-300' : 'text-slate-400')} />
                      <span className="text-xs font-semibold text-white">{m.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <Button fullWidth size="lg" loading={busy} onClick={handleSubscribe}>
              确认开通
            </Button>
          </div>
        ) : null}
      </Modal>
    </section>
  )
}
