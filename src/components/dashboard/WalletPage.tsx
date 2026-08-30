import { ArrowDownLeft, ArrowUpRight, Info, Plus, Wallet } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { formatRelative, cn } from '@/lib/utils'

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
        title: 'Funds added (demo)',
        description: `${format(amount)} added to your demo wallet — no real money involved.`,
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
              <Wallet className="h-4 w-4" /> Available balance
            </p>
            <p className="mt-2 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {format(state.balance)}
            </p>
            <p className="mt-2 text-xs text-white/70">Demo wallet — funds are simulated and cannot be withdrawn.</p>
          </div>
          <Button variant="secondary" icon={Plus} onClick={() => setOpen(true)} className="border-white/30 bg-white text-ink-900 hover:bg-white/90">
            Top Up (demo)
          </Button>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">Recent wallet activity</h3>
          <Link to="/dashboard/transactions" className="text-sm font-semibold text-violet-300 hover:text-violet-200">
            View all →
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

      {/* Top-up modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Top up wallet"
        description="Add simulated funds to your demo wallet"
      >
        <div className="space-y-5">
          <div className="flex items-start gap-2.5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
            <p className="text-xs leading-relaxed text-amber-200">
              Demo wallet — no real funds are added and no payment is processed.
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
            <span className="text-sm text-slate-400">Amount</span>
            <span className="font-display text-xl font-bold text-white">{format(amount)}</span>
          </div>

          <Button fullWidth size="lg" loading={adding} onClick={handleAddFunds}>
            Add Funds — Demo
          </Button>
        </div>
      </Modal>
    </div>
  )
}
