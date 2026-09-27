import { ArrowDownLeft, ArrowUpRight, Gift, Receipt, RotateCcw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { EmptyState, Skeleton } from '@/components/ui/States'
import { useApp } from '@/store/AppContext'
import { useDemoLoading } from '@/lib/hooks'
import { formatRelative, cn } from '@/lib/utils'
import type { TransactionType } from '@/types'

const meta: Record<TransactionType, { label: string; icon: LucideIcon; credit: boolean; classes: string }> = {
  payment: { label: '支付', icon: ArrowUpRight, credit: false, classes: 'bg-rose-500/10 text-rose-300' },
  deposit: { label: '充值', icon: ArrowDownLeft, credit: true, classes: 'bg-emerald-500/10 text-emerald-300' },
  refund: { label: '退款', icon: RotateCcw, credit: true, classes: 'bg-sky-500/10 text-sky-300' },
  bonus: { label: '赠送', icon: Gift, credit: true, classes: 'bg-violet-500/10 text-violet-300' },
}

export default function TransactionsPage() {
  const { state, format } = useApp()
  const loading = useDemoLoading(450)

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (state.transactions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl">
        <EmptyState
          icon={Receipt}
          title="暂无交易记录"
          description="订单支付、钱包充值与退款将显示在这里。"
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div className="glass divide-y divide-white/5 rounded-3xl">
        {state.transactions.map((t) => {
          const m = meta[t.type]
          const Icon = m.icon
          return (
            <div key={t.id} className="flex items-center gap-4 px-5 py-4">
              <span className={cn('grid h-10 w-10 shrink-0 place-items-center rounded-xl', m.classes)}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-white">{t.description}</p>
                  <span className="hidden shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:inline">
                    {m.label}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {t.id} · {formatRelative(t.createdAt)}
                </p>
              </div>
              <span
                className={cn(
                  'shrink-0 text-sm font-semibold',
                  m.credit ? 'text-emerald-300' : 'text-white',
                )}
              >
                {m.credit ? '+' : '−'}
                {format(Math.abs(t.amount))}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
