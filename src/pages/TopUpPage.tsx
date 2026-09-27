import { Bitcoin, CheckCircle2, Coins, CreditCard, Info, Plus, Wallet } from 'lucide-react'
import { useState } from 'react'
import type { ComponentType } from 'react'
import { useNavigate } from 'react-router-dom'

import AlipayIcon from '@/components/icons/AlipayIcon'
import WechatIcon from '@/components/icons/WechatIcon'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import PageHeader from '@/components/ui/PageHeader'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { topUpPackages } from '@/data/topup'
import type { TopUpPackage } from '@/data/topup'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn, formatNumber, paymentMethodLabels } from '@/lib/utils'
import type { PaymentMethod } from '@/types'

const topUpMethods: Array<{
  id: PaymentMethod
  label: string
  icon: ComponentType<{ className?: string }>
}> = [
  { id: 'alipay', label: '支付宝', icon: AlipayIcon },
  { id: 'wechat', label: '微信支付', icon: WechatIcon },
  { id: 'card', label: '银行卡', icon: CreditCard },
  { id: 'paypal', label: 'PayPal', icon: Wallet },
  { id: 'crypto', label: '加密货币', icon: Bitcoin },
]

type Step = 'confirm' | 'qr' | 'submitted'

export default function TopUpPage() {
  const { state, addFunds, submitTopUpRequest, format } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()

  const [selected, setSelected] = useState<TopUpPackage | null>(null)
  const [method, setMethod] = useState<PaymentMethod>('alipay')
  const [step, setStep] = useState<Step>('confirm')
  const [requestId, setRequestId] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const closeModal = () => {
    setSelected(null)
    setStep('confirm')
    setRequestId(null)
  }

  /** 支付宝 / 微信支付走扫码审核流程；其他方式保持演示即时到账。 */
  const isQrFlow = method === 'alipay' || method === 'wechat'

  const handleConfirm = async () => {
    if (!selected) return
    if (isQrFlow) {
      setStep('qr')
      return
    }
    setBusy(true)
    try {
      await addFunds(selected.amount, selected.bonus, method)
      push({
        title: '充值成功',
        description: `${format(selected.amount)}${
          selected.bonus ? ` + ${format(selected.bonus)} 赠送` : ''
        } 已存入钱包余额。`,
        type: 'success',
      })
      closeModal()
    } finally {
      setBusy(false)
    }
  }

  const handleSubmitRequest = async () => {
    if (!selected) return
    setBusy(true)
    try {
      const request = await submitTopUpRequest(selected.amount, selected.bonus, method)
      setRequestId(request.id)
      setStep('submitted')
      push({
        title: '支付申请已提交',
        description: '管理员审核通过后，余额将自动到账。',
        type: 'info',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="钱包"
        title={
          <>
            充值您的<span className="text-gradient">余额</span>
          </>
        }
        subtitle="为钱包充值，可用于购买任意增长服务。下单时余额将自动抵扣。"
      />

      <section className="pb-24">
        <div className="container-x">
          {/* 当前余额 */}
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-violet-400/30 p-6 sm:p-8">
            <div aria-hidden className="bg-brand-gradient absolute inset-0 opacity-90" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
            <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-white/80 sm:justify-start">
                  <Wallet className="h-4 w-4" /> 当前余额
                </p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tight text-white">
                  {format(state.balance)}
                </p>
              </div>
              <p className="max-w-xs text-center text-xs leading-relaxed text-white/70 sm:text-right">
                可在导航栏切换货币。下单时余额会自动抵扣。
              </p>
            </div>
          </div>

          {/* 充值套餐 */}
          <StaggerGroup className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {topUpPackages.map((pkg) => (
              <StaggerItem key={pkg.id} className="h-full">
                <div className="glass group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-glow-sm">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-110">
                      <Coins className="h-5 w-5" />
                    </span>
                    {pkg.bonus > 0 ? (
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                        +{format(pkg.bonus)} 赠送
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{pkg.label}</h3>
                  <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
                    {format(pkg.amount)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatNumber(pkg.amount)} 钱包余额
                    {pkg.bonus > 0 ? ` + ${formatNumber(pkg.bonus)} 赠送` : ''}
                  </p>
                  <Button
                    variant="outline"
                    fullWidth
                    className="mt-6"
                    icon={Plus}
                    onClick={() => setSelected(pkg)}
                  >
                    立即充值
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <p className="mt-8 text-center text-xs text-slate-600">
            通过支付宝 / 微信支付的充值需管理员人工核验后到账；其他支付方式即时到账。
          </p>
        </div>
      </section>

      {/* 充值弹窗 */}
      <Modal
        open={selected !== null}
        onClose={closeModal}
        title="钱包充值"
        description="为您的账户充值"
      >
        {selected ? (
          step === 'confirm' ? (
            <div className="space-y-5">
              <div className="flex items-start gap-2.5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <p className="text-xs leading-relaxed text-amber-200">
                  {isQrFlow
                    ? `${paymentMethodLabels[method]}充值为真实支付，需人工核验——管理员审核通过后余额才会到账。`
                    : '充值金额将直接存入您的钱包余额。'}
                </p>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-slate-200">支付方式</p>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
                  {topUpMethods.map((m) => {
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

              <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">套餐</span>
                  <span className="font-medium text-white">{selected.label}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">充值金额</span>
                  <span className="font-medium text-white">{format(selected.amount)}</span>
                </div>
                {selected.bonus > 0 ? (
                  <div className="flex justify-between gap-4">
                    <span className="text-slate-400">赠送</span>
                    <span className="font-medium text-emerald-300">+{format(selected.bonus)}</span>
                  </div>
                ) : null}
                <div className="flex justify-between gap-4 border-t border-white/10 pt-2.5">
                  <span className="font-semibold text-white">到账合计</span>
                  <span className="font-display text-lg font-bold text-white">
                    {format(selected.amount + selected.bonus)}
                  </span>
                </div>
              </div>

              <Button fullWidth size="lg" loading={busy} onClick={handleConfirm}>
                {isQrFlow ? '前往支付' : '确认充值'}
              </Button>
            </div>
          ) : step === 'qr' ? (
            <div className="flex flex-col items-center text-center">
              <div className="rounded-2xl bg-white p-4 shadow-card">
                <img
                  src={method === 'wechat' ? '/wechat-qr.png' : '/alipay-qr.png'}
                  alt={`${paymentMethodLabels[method]} 收款二维码`}
                  className="h-52 w-52 object-contain sm:h-56 sm:w-56"
                />
              </div>
              <p className="mt-4 font-display text-xl font-bold text-white">
                使用{paymentMethodLabels[method]}支付 {format(selected.amount)}
              </p>
              <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-slate-400">
                请打开{paymentMethodLabels[method]} App 扫码支付。支付完成后请在下方提交申请。
              </p>
              <p className="mt-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                管理员审核通过后余额到账
              </p>
              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <Button variant="ghost" onClick={() => setStep('confirm')}>
                  返回
                </Button>
                <Button fullWidth size="lg" loading={busy} onClick={handleSubmitRequest}>
                  我已支付 — 提交审核
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold text-white">申请已提交</h2>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-400">
                您的充值申请 <span className="font-semibold text-white">{requestId}</span>{' '}
                正在等待管理员审核，审核通过后余额将自动到账。
              </p>
              <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">
                <Button fullWidth onClick={() => navigate('/dashboard/wallet')}>
                  查看钱包
                </Button>
                <Button fullWidth variant="secondary" onClick={closeModal}>
                  关闭
                </Button>
              </div>
            </div>
          )
        ) : null}
      </Modal>
    </>
  )
}
