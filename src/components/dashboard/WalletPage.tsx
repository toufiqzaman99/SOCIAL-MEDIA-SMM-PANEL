import { ArrowDownLeft, ArrowUpRight, Clock, Info, Plus, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { formatRelative, paymentMethodLabels, cn } from '@/lib/utils'
import type { TopUpRequestStatus } from '@/types'

const statusMeta: Record<TopUpRequestStatus, { label: string; className: string }> = {
  pending: { label: '待审核', className: 'border-amber-400/25 bg-amber-400/10 text-amber-300' },
  approved: { label: '已通过', className: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' },
  rejected: { label: '已拒绝', className: 'border-rose-400/25 bg-rose-400/10 text-rose-300' },
}

const chips = [10, 25, 50, 100]

export default function WalletPage() {
  const { state, addFunds, format } = useApp()
  const { push } = useToast()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState<number>(25)
  const [adding, setAdding] = useState(false)

  const handleAddFunds = async () => {
    if (amount <= 0) return
    setAdding(true)
    try {
      await addFunds(amount)
      setOpen(false)
      push({
        title: '充值成功',
        description: `${format(amount)} 已存入钱包余额。`,
        type: 'success',
      })
    } finally {
      setAdding(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Balance card */}
      <div className="relative overflow-hidden rounded-3xl border border-violet-400/30 p-6 sm:p-8">
        <div aria-hidden className="bg-brand-gradient absolute inset-0 opacity-90" />
        <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
        <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Wallet className="h-4 w-4" /> 可用余额
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {format(state.balance)}
            </p>
            <p className="mt-2 text-xs text-white/70">充值金额仅用于购买服务，不可提现。</p>
          </div>
          <Button variant="secondary" icon={Plus} onClick={() => setOpen(true)} className="border-white/30 bg-white text-ink-900 hover:bg-white/90">
            充值
          </Button>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">钱包动态</h3>
          <Link to="/dashboard/transactions" className="text-sm font-semibold text-violet-300 hover:text-violet-200">
            查看全部 →
          </Link>
        </div>
        <div className="glass divide-y divide-white/5 rounded-3xl">
          {state.transactions.slice(0, 5).map((t) => {
            const credit = t.amount >= 0
            const Icon = credit ? ArrowDownLeft : ArrowUpRight
            return (
              <div key={t.id} className="flex items-center gap-4 px-5 py-3.5">
                <span
                  className={cn(
                    'grid h-9 w-9 shrink-0 place-items-center rounded-xl',
                    credit ? 'bg-emerald-500/10 text-emerald-300' : 'bg-rose-500/10 text-rose-300',
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{t.description}</p>
                  <p className="text-xs text-slate-500">{formatRelative(t.createdAt)}</p>
                </div>
                <span className={cn('text-sm font-semibold', credit ? 'text-emerald-300' : 'text-white')}>
                  {credit ? '+' : ''}
                  {format(t.amount)}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Top-up requests awaiting admin approval */}
      {state.topUpRequests.length > 0 ? (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white">充值申请</h3>
            <span className="text-xs text-slate-500">管理员审核通过后到账</span>
          </div>
          <div className="glass divide-y divide-white/5 rounded-3xl">
            {state.topUpRequests.slice(0, 5).map((request) => {
              const meta = statusMeta[request.status]
              return (
                <div key={request.id} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-500/10 text-sky-300">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      充值 {format(request.amount)}
                      {request.bonus > 0 ? ` + ${format(request.bonus)} 赠送` : ''}
                    </p>
                    <p className="text-xs text-slate-500">
                      {paymentMethodLabels[request.method]} · {request.id} · {formatRelative(request.createdAt)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                      meta.className,
                    )}
                  >
                    {meta.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      {/* Top-up modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="钱包充值"
        description="为您的账户充值"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-2.5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p className="text-xs leading-relaxed text-amber-200">
              充值金额将即时存入您的钱包余额。
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => setAmount(chip)}
                className={cn(
                  'rounded-xl border py-3 text-sm font-semibold transition-all',
                  amount === chip
                    ? 'border-violet-400/60 bg-violet-500/15 text-white'
                    : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25',
                )}
              >
                {format(chip)}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="text-sm text-slate-400">金额</span>
            <span className="font-display text-xl font-bold text-white">{format(amount)}</span>
          </div>

          <Button fullWidth size="lg" loading={adding} onClick={handleAddFunds}>
            确认充值
          </Button>
        </div>
      </Modal>
    </div>
  )
}
