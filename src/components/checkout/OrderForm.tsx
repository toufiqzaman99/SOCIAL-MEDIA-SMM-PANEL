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
import type { LucideIcon } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import Button from '@/components/ui/Button'
import { Input, Select, TextArea } from '@/components/ui/Field'
import { platforms } from '@/data/platforms'
import { servicesForPlatform } from '@/data/services'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn, formatCurrency, formatNumber, isValidEmail, isValidUrlLike } from '@/lib/utils'
import type { CheckoutPreset, CreateOrderInput, Order, PaymentMethod, PlatformId } from '@/types'

type Step = 1 | 2 | 3

type Errors = Partial<
  Record<
    'platform' | 'service' | 'package' | 'link' | 'email' | 'cardName' | 'cardNumber' | 'cardExpiry' | 'cardCvc',
    string
  >
>

const paymentMethods: Array<{ id: PaymentMethod; label: string; note: string; icon: LucideIcon }> = [
  { id: 'card', label: 'Credit / Debit Card', note: 'Visa, Mastercard, Amex', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', note: 'You would be redirected to PayPal', icon: Wallet },
  { id: 'crypto', label: 'Crypto', note: 'BTC · ETH · USDT — address provided after order', icon: Bitcoin },
]

const stepsMeta: Array<{ label: string }> = [{ label: 'Order details' }, { label: 'Payment' }, { label: 'Done' }]

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
  const { state, placeOrder } = useApp()
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
    if (!platformId) next.platform = 'Select a platform'
    if (!serviceId) next.service = 'Select a service'
    if (!packageId) next.package = 'Choose a package'
    if (!isValidUrlLike(link)) next.link = 'Enter the public URL of your profile or page (no password needed)'
    if (!isValidEmail(email)) next.email = 'Enter a valid email address'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateCard = (): boolean => {
    if (method !== 'card') return true
    const next: Errors = {}
    if (cardName.trim().length < 2) next.cardName = 'Enter the name on the card'
    if (cardNumber.replace(/\D/g, '').length !== 16) next.cardNumber = 'Enter a 16-digit card number'
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) next.cardExpiry = 'Use MM/YY format'
    if (!/^\d{3,4}$/.test(cardCvc)) next.cardCvc = '3–4 digits'
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
        title: 'Order placed (demo)',
        description: `Order ${order.id} received — no real payment was processed.`,
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
        <h2 className="mt-6 font-display text-2xl font-bold text-white">Order placed</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          Your demo order <span className="font-semibold text-white">{placedOrder.id}</span> has been received
          and will appear in your dashboard as <span className="text-amber-300">Pending</span>.
          <br />
          <span className="text-slate-500">No real payment was processed — this checkout is a demo.</span>
        </p>
        <div className="glass mt-6 w-full rounded-2xl p-4 text-left text-sm">
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Service</span>
            <span className="font-medium text-white">{placedOrder.serviceName}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-400">Quantity</span>
            <span className="font-medium text-white">{formatNumber(placedOrder.quantity)}</span>
          </div>
          <div className="flex justify-between border-t border-white/5 py-1 pt-2">
            <span className="text-slate-400">Total (demo)</span>
            <span className="font-semibold text-white">{formatCurrency(placedOrder.price)}</span>
          </div>
        </div>
        <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row">
          <Button fullWidth onClick={handleTrackOrder}>
            Track Order
          </Button>
          <Button fullWidth variant="secondary" onClick={handleFinish}>
            {variant === 'page' ? 'Place Another Order' : 'Continue Browsing'}
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
      <h3 className="font-display text-base font-semibold text-white">Order summary</h3>
      <div className="mt-4 space-y-2.5 text-sm">
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">Service</span>
          <span className="text-right font-medium text-white">{service ? service.name : '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">Platform</span>
          <span className="font-medium text-white">
            {platformId ? platforms.find((p) => p.id === platformId)?.name : '—'}
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">Quantity</span>
          <span className="font-medium text-white">{pkg ? formatNumber(pkg.quantity) : '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">Price</span>
          <span className="font-medium text-white">{pkg ? formatCurrency(pkg.price) : '—'}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-slate-400">Delivery</span>
          <span className="text-right text-xs text-slate-400">{pkg ? pkg.deliveryEstimate : '—'}</span>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm font-semibold text-white">Total</span>
        <span className="font-display text-xl font-bold text-white">
          {pkg ? formatCurrency(pkg.price) : '—'}
        </span>
      </div>
      <p className="mt-3 text-[11px] leading-relaxed text-slate-500">
        Marketing/growth service — results may vary and are not guaranteed. No hidden fees.
      </p>
      <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
        <Lock className="h-3.5 w-3.5" />
        Demo checkout — payment gateway not connected.
      </div>
    </aside>
  )

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-bold text-white sm:text-2xl">Order growth services</h2>
          <p className="mt-1 text-sm text-slate-400">Complete your order — no account credentials required.</p>
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
                  label="Platform"
                  value={platformId}
                  onChange={(e) => handlePlatformChange(e.target.value)}
                  error={errors.platform}
                  placeholder="Select a platform"
                  options={platforms.map((p) => ({ value: p.id, label: p.name }))}
                />

                <Select
                  label="Service"
                  value={serviceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  error={errors.service}
                  placeholder={platformId ? 'Select a service' : 'Choose a platform first'}
                  options={serviceOptions.map((s) => ({ value: s.id, label: s.name }))}
                  disabled={!platformId}
                />

                {service ? (
                  <div>
                    <p className="mb-1.5 text-sm font-medium text-slate-200">Package</p>
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
                                Best value
                              </span>
                            ) : null}
                            <p className="text-sm font-semibold text-white">{formatNumber(p.quantity)}</p>
                            <p className="mt-0.5 font-display text-lg font-bold text-white">
                              {formatCurrency(p.price)}
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
                  label="Social Media Username / URL"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  error={errors.link}
                  placeholder="instagram.com/yourbrand"
                  hint="We never ask for passwords — just your public profile or page link."
                />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  placeholder="you@example.com"
                  hint="Order updates and receipts are sent here."
                />

                <TextArea
                  label="Special Instructions (optional)"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Anything we should know about your campaign?"
                  rows={3}
                  maxLength={300}
                />

                <Button fullWidth size="lg" iconRight={ArrowRight} onClick={handleContinue}>
                  Continue to Payment
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
                    <span className="font-semibold">Demo checkout — payment gateway not connected.</span>{' '}
                    Selecting a payment method and confirming this order does not initiate or complete any real
                    payment.
                  </p>
                </div>

                <p className="mt-5 mb-2 text-sm font-medium text-slate-200">Payment method</p>
                <div className="grid gap-2.5 sm:grid-cols-3">
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
                          label="Name on card"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          error={errors.cardName}
                          placeholder="Alex Morgan"
                          autoComplete="cc-name"
                        />
                        <Input
                          label="Card number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          error={errors.cardNumber}
                          placeholder="4242 4242 4242 4242"
                          inputMode="numeric"
                          autoComplete="cc-number"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="Expiry"
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
                          Card details are only validated in the browser — nothing is transmitted or stored.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <Button variant="ghost" icon={ArrowLeft} onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button fullWidth size="lg" loading={submitting} iconRight={ShieldCheck} onClick={handlePlaceOrder}>
                    Place Order — Demo
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
            By placing an order you agree to our Terms of Service and Refund Policy. Boostly services are
            marketing and growth campaigns — results may vary and are not guaranteed.
          </p>
        </div>
      ) : null}
    </div>
  )
}
