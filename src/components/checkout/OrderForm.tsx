import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Bitcoin,
  Check,
  CheckCircle2,
  CreditCard,
  Info,
  Lock,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'

import AlipayIcon from '@/components/icons/AlipayIcon'
import WechatIcon from '@/components/icons/WechatIcon'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import Button from '@/components/ui/Button'
import { Input, Select, TextArea } from '@/components/ui/Field'
import { platforms } from '@/data/platforms'
import { servicesForPlatform } from '@/data/services'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn, formatNumber, isValidEmail, isValidUrlLike } from '@/lib/utils'
import type { CheckoutPreset, CreateOrderInput, Order, PaymentMethod, PlatformId } from '@/types'

type Step = 1 | 2 | 3

type Errors = Partial<
  Record<
    'platform' | 'service' | 'package' | 'link' | 'email' | 'cardName' | 'cardNumber' | 'cardExpiry' | 'cardCvc',
    string
  >
>

const paymentMethods: Array<{
  id: PaymentMethod
  label: string
  note: string
  icon: ComponentType<{ className?: string }>
}> = [
  { id: 'card', label: '银行卡', note: 'Visa、Mastercard、Amex', icon: CreditCard },
  { id: 'alipay', label: '支付宝', note: '使用支付宝扫码支付', icon: AlipayIcon },
  { id: 'wechat', label: '微信支付', note: '使用微信扫码支付', icon: WechatIcon },
  { id: 'paypal', label: 'PayPal', note: '将跳转至 PayPal', icon: Wallet },
  { id: 'crypto', label: '加密货币', note: 'BTC · ETH · USDT — 下单后提供地址', icon: Bitcoin },
]

const stepsMeta: Array<{ label: string }> = [{ label: '订单信息' }, { label: '支付' }, { label: '完成' }]

export interface OrderFormProps {
  preset?: CheckoutPreset
  variant?: 'modal' | 'page'
  onClose?: () => void
}

/**
 * Multi-step checkout. Demo only — no real payment is ever processed, which
 * is stated clearly in the payment step and the confirmation screen.
 */
export default function OrderForm({ preset, variant = 'modal', onClose }: OrderFormProps) {
  const { state, placeOrder, format } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>(1)
  const [platformId, setPlatformId] = useState<PlatformId | ''>(preset?.platformId ?? '')
  const [serviceId, setServiceId] = useState(preset?.serviceId ?? '')
  const [packageId, setPackageId] = useState(preset?.packageId ?? '')
  const [link, setLink] = useState('')
  const [email, setEmail] = useState(state.user?.email ?? '')
  const [instructions, setInstructions] = useState('')
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null)

  const serviceOptions = useMemo(() => servicesForPlatform(platformId || 'all'), [platformId])
  const service = useMemo(() => serviceOptions.find((s) => s.id === serviceId), [serviceOptions, serviceId])
  const pkg = useMemo(() => service?.packages.find((p) => p.id === packageId), [service, packageId])

  const handlePlatformChange = (value: string) => {
    setPlatformId(value as PlatformId)
    setServiceId('')
    setPackageId('')
    setErrors((prev) => ({ ...prev, platform: undefined, service: undefined, package: undefined }))
  }

  const handleServiceChange = (value: string) => {
    setServiceId(value)
    setPackageId('')
    setErrors((prev) => ({ ...prev, service: undefined, package: undefined }))
  }

  const validateDetails = (): boolean => {
    const next: Errors = {}
    if (!platformId) next.platform = '请选择平台'
    if (!serviceId) next.service = '请选择服务'
    if (!packageId) next.package = '请选择套餐'
    if (!isValidUrlLike(link)) next.link = '请输入您主页或页面的公开链接（无需密码）'
    if (!isValidEmail(email)) next.email = '请输入有效的邮箱地址'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateCard = (): boolean => {
    if (method !== 'card') return true
    const next: Errors = {}
    if (cardName.trim().length < 2) next.cardName = '请输入持卡人姓名'
    if (cardNumber.replace(/\D/g, '').length !== 16) next.cardNumber = '请输入 16 位卡号'
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) next.cardExpiry = '请使用 MM/YY 格式'
    if (!/^\d{3,4}$/.test(cardCvc)) next.cardCvc = '3–4 位'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleContinue = () => {
    if (validateDetails()) setStep(2)
  }

  const handlePlaceOrder = async () => {
    if (!service || !pkg || !platformId) return
    if (!validateCard()) return
    setSubmitting(true)
    try {
      const input: CreateOrderInput = {
        platform: platformId,
        serviceId: service.id,
        serviceName: service.name,
        packageId: pkg.id,
        quantity: pkg.quantity,
        price: pkg.price,
        link: link.trim(),
        email: email.trim(),
        instructions: instructions.trim() || undefined,
        paymentMethod: method,
      }
      const order = await placeOrder(input)
      setPlacedOrder(order)
      setStep(3)
      push({
        title: '下单成功',
        description: `订单 ${order.id} 已收到，我们正在处理您的推广。`,
        type: 'success',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const reset = () => {
    setStep(1)
    setLink('')
    setInstructions('')
    setMethod('card')
    setCardName('')
    setCardNumber('')
    setCardExpiry('')
    setCardCvc('')
    setPlacedOrder(null)
    setErrors({})
  }

  const handleTrackOrder = () => {
    onClose?.()
    navigate('/dashboard/orders')
  }

  const handleFinish = () => {
    onClose?.()
    if (variant === 'page') reset()
  }

  const formatCardNumber = (value: string) =>
    value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ')

  const formatCardExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4)
    return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
  }

  // ── Success screen ──────────────────────────────────────────────────
  if (step === 3 && placedOrder) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center py-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="grid h-20 w-20 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10"
        >
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </motion.div>
        <h2 className="mt-6 font-display text-2xl font-bold text-white">下单成功</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          您的订单 <span className="font-semibold text-white">{placedOrder.id}</span>{' '}
          已收到，将显示在您的控制台中，状态为 <span className="text-amber-300">待处理</span>。
        </p>
        <div className="glass mt-6 w-full rounded-2xl p-4 text-left text-sm">
          <div className="flex justify-between py-1">
            <span className="text-slate-400">服务</span>
            <span className="font-medium text-white">{placedOrder.serviceName}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">数量</span>
            <span className="font-medium text-white">{formatNumber(placedOrder.quantity)}</span>
          </div>
          <div className="flex justify-between border-t border-white/5 py-1 pt-2">
            <span className="text-slate-400">合计</span>
            <span className="font-semibold text-white">{format(placedOrder.price)}</span>
          </div>
        </div>
        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <Button fullWidth onClick={handleTrackOrder}>
            跟踪订单
          </Button>
          <Button fullWidth variant="secondary" onClick={handleFinish}>
            {variant === 'page' ? '再下一单' : '继续浏览'}
          </Button>
        </div>
      </div>
    )
  }

  // ── Steps indicator ─────────────────────────────────────────────────
  const stepsIndicator = (
    <ol className="flex items-center gap-2">
      {stepsMeta.map((meta, i) => {
        const index = (i + 1) as Step
        const done = step > index
        const active = step === index
        return (
          <li key={meta.label} className="flex items-center gap-2">
            <span
              className={cn(
                'grid h-7 w-7 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors',
                done && 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
                active && 'border-violet-400/50 bg-violet-500/20 text-violet-200',
                !done && !active && 'border-white/10 bg-white/5 text-slate-500',
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : index}
            </span>
            <span
              className={cn(
                'hidden text-xs font-medium sm:block',
                active ? 'text-white' : 'text-slate-500',
              )}
            >
              {meta.label}
            </span>
            {i < stepsMeta.length - 1 ? <span className="hidden h-px w-8 bg-white/10 sm:block" /> : null}
          </li>
        )
      })}
    </ol>
  )

  const summaryPanel = (
    <aside className="glass-strong h-fit rounded-3xl p-5">
      <h3 className="font-display text-base font-semibold text-white">订单摘要</h3>
      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">服务</span>
          <span className="text-right font-medium text-white">{service ? service.name : '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">平台</span>
          <span className="font-medium text-white">
            {platformId ? platforms.find((p) => p.id === platformId)?.name : '—'}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">数量</span>
          <span className="font-medium text-white">{pkg ? formatNumber(pkg.quantity) : '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">价格</span>
          <span className="font-medium text-white">{pkg ? format(pkg.price) : '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">交付</span>
          <span className="text-right text-xs text-slate-400">{pkg ? pkg.deliveryEstimate : '—'}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm font-semibold text-white">合计</span>
        <span className="font-display text-xl font-bold text-white">
          {pkg ? format(pkg.price) : '—'}
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5">
        <span className="text-xs text-slate-400">钱包余额</span>
        <span className="text-xs font-semibold text-white">{format(state.balance)}</span>
      </div>
      <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
        下单时钱包余额将自动抵扣。 <span className="text-violet-300">余额不足？先去充值。</span>
      </p>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        营销/增长服务——效果可能因人而异，不作保证。无隐藏费用。
      </p>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Lock className="h-3.5 w-3.5" />
        您的支付信息安全加密处理
      </div>
    </aside>
  )

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">订购增长服务</h2>
          <p className="mt-1 text-sm text-slate-400">完成您的订单——无需任何账号凭证。</p>
        </div>
        {stepsIndicator}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="glass rounded-3xl p-5 sm:p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="space-y-4"
              >
                <Select
                  label="平台"
                  value={platformId}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  error={errors.platform}
                  placeholder="请选择平台"
                  options={platforms.map((p) => ({ value: p.id, label: p.name }))}
                />

                <Select
                  label="服务"
                  value={serviceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  error={errors.service}
                  placeholder={platformId ? '请选择服务' : '请先选择平台'}
                  options={serviceOptions.map((s) => ({ value: s.id, label: s.name }))}
                  disabled={!platformId}
                />

                {service ? (
                  <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-200">套餐</p>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {service.packages.map((p) => {
                        const selected = p.id === packageId
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setPackageId(p.id)
                              setErrors((prev) => ({ ...prev, package: undefined }))
                            }}
                            className={cn(
                              'relative rounded-2xl border p-3.5 text-left transition-all duration-200',
                              selected
                                ? 'border-violet-400/60 bg-violet-500/10 shadow-glow-sm'
                                : 'border-white/10 bg-white/[0.03] hover:border-white/25',
                            )}
                          >
                            {p.bestValue ? (
                              <span className="absolute right-3 top-3 rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-300">
                                超值
                              </span>
                            ) : null}
                            <p className="text-sm font-semibold text-white">{formatNumber(p.quantity)}</p>
                            <p className="mt-0.5 font-display text-lg font-bold text-white">
                              {format(p.price)}
                            </p>
                            <p className="mt-1 text-[11px] text-slate-500">{p.deliveryEstimate}</p>
                          </button>
                        )
                      })}
                    </div>
                    {errors.package ? (
                      <p className="mt-1.5 text-xs text-rose-400">{errors.package}</p>
                    ) : null}
                  </div>
                ) : null}

                <Input
                  label="社媒用户名 / 链接"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  error={errors.link}
                  placeholder="instagram.com/yourbrand"
                  hint="我们绝不索要密码——只需您的公开主页或页面链接。"
                />

                <Input
                  label="邮箱"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="you@example.com"
                  hint="订单更新与回执将发送至此邮箱。"
                />

                <TextArea
                  label="特殊要求（选填）"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="关于您的推广，有什么需要我们知道吗？"
                  rows={3}
                  maxLength={300}
                />

                <Button fullWidth size="lg" iconRight={ArrowRight} onClick={handleContinue}>
                  前往支付
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <div className="flex items-start gap-2.5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3.5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  <p className="text-xs leading-relaxed text-amber-200">
                    <span className="font-semibold">支付提示：</span>
                    选择支付方式并确认订单，即表示您授权支付对应订单金额。
                  </p>
                </div>

                <p className="mt-5 mb-2 text-sm font-medium text-slate-200">支付方式</p>
                <div className="grid gap-2.5 grid-cols-2 lg:grid-cols-5">
                  {paymentMethods.map((m) => {
                    const selected = m.id === method
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMethod(m.id)}
                        className={cn(
                          'flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-all duration-200',
                          selected
                            ? 'border-violet-400/60 bg-violet-500/10'
                            : 'border-white/10 bg-white/[0.03] hover:border-white/25',
                        )}
                      >
                        <m.icon className={cn('h-5 w-5', selected ? 'text-violet-300' : 'text-slate-400')} />
                        <span className="text-sm font-semibold text-white">{m.label}</span>
                        <span className="text-[11px] leading-snug text-slate-500">{m.note}</span>
                      </button>
                    )
                  })}
                </div>

                <AnimatePresence initial={false}>
                  {method === 'card' && (
                    <motion.div
                      key="card-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 space-y-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                        <Input
                          label="持卡人姓名"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          error={errors.cardName}
                          placeholder="张三"
                          autoComplete="cc-name"
                        />
                        <Input
                          label="卡号"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          error={errors.cardNumber}
                          placeholder="4242 4242 4242 4242"
                          inputMode="numeric"
                          autoComplete="cc-number"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="有效期"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatCardExpiry(e.target.value))}
                            error={errors.cardExpiry}
                            placeholder="MM/YY"
                            inputMode="numeric"
                            autoComplete="cc-exp"
                          />
                          <Input
                            label="CVC"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            error={errors.cardCvc}
                            placeholder="123"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500">
                          卡号信息仅在浏览器内校验——不会被传输或存储。
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep(1)}>
                    返回
                  </Button>
                  <Button fullWidth size="lg" loading={submitting} iconRight={ShieldCheck} onClick={handlePlaceOrder}>
                    提交订单
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {step !== 3 ? summaryPanel : null}
      </div>

      {step !== 3 ? (
        <div className="mt-5 flex items-start gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <PlatformIcon platform={platformId || 'instagram'} className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
          <p className="text-[11px] leading-relaxed text-slate-500">
            提交订单即表示您同意我们的服务条款与退款政策。Boostly 服务为营销增长推广——效果可能因人而异，不作保证。
          </p>
        </div>
      ) : null}
    </div>
  )
}
