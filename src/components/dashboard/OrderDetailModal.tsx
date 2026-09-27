import { Check, CheckCircle2, Copy, CreditCard, FileText, Loader2, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import Modal from '@/components/ui/Modal'
import StatusBadge from '@/components/ui/StatusBadge'
import { platformById } from '@/data/platforms'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import type { Order, ServiceStatus } from '@/types'
import { cn, formatDate, formatNumber, paymentMethodLabels } from '@/lib/utils'

const statusLabels: Record<ServiceStatus, string> = {
  pending: '待处理',
  processing: '处理中',
  completed: '已完成',
  cancelled: '已取消',
}

interface TimelineStep {
  label: string
  icon: LucideIcon
}

const timeline: TimelineStep[] = [
  { label: '订单已提交', icon: FileText },
  { label: '支付已确认', icon: CreditCard },
  { label: '推广处理中', icon: Loader2 },
  { label: '推广已完成', icon: CheckCircle2 },
]

function reachedIndex(order: Order): number {
  switch (order.status) {
    case 'pending':
      return 1
    case 'processing':
      return 3
    case 'completed':
      return 4
    case 'cancelled':
      return 0
  }
}

export interface OrderDetailModalProps {
  order: Order | null
  onClose: () => void
  onCancel?: (order: Order) => void
  /** Admin only — shows status-change controls in the modal. */
  onStatusChange?: (status: ServiceStatus) => void
}

export default function OrderDetailModal({ order, onClose, onCancel, onStatusChange }: OrderDetailModalProps) {
  const { format } = useApp()
  const { push } = useToast()

  if (!order) return null

  const platform = platformById(order.platform)
  const reached = reachedIndex(order)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(order.link)
      push({ title: '已复制到剪贴板', type: 'success' })
    } catch {
      push({ title: '复制失败', description: '请手动选择文本复制。', type: 'error' })
    }
  }

  return (
    <Modal open={Boolean(order)} onClose={onClose} size="lg" title={`订单 ${order.id}`} description={`下单于 ${formatDate(order.createdAt)}`}>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <StatusBadge status={order.status} />
          <span className="font-display text-xl font-bold text-white">{format(order.price)}</span>
        </div>

        {/* Progress timeline */}
        {order.status !== 'cancelled' ? (
          <ol className="relative space-y-4 border-l border-white/10 pl-6">
            {timeline.map((step, i) => {
              const done = i < reached
              const active = i === reached
              return (
                <li key={step.label} className="relative">
                  <span
                    className={cn(
                      'absolute -left-[1.84rem] grid h-6 w-6 place-items-center rounded-full border bg-ink-900',
                      done && 'border-emerald-400/50 text-emerald-300',
                      active && 'border-violet-400/60 text-violet-300',
                      !done && !active && 'border-white/10 text-slate-600',
                    )}
                  >
                    {active && !done ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <step.icon className="h-3.5 w-3.5 animate-pulse" />
                      </motion.span>
                    ) : done ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <step.icon className="h-3.5 w-3.5" />
                    )}
                  </span>
                  <p className={cn('text-sm font-medium', done || active ? 'text-white' : 'text-slate-500')}>
                    {step.label}
                  </p>
                  {i === 0 ? <p className="text-xs text-slate-500">{formatDate(order.createdAt)}</p> : null}
                </li>
              )
            })}
          </ol>
        ) : (
          <div className="flex items-center gap-2.5 rounded-2xl border border-rose-400/25 bg-rose-400/10 p-4 text-sm text-rose-200">
            <XCircle className="h-4 w-4" />
            该订单已取消，将不会交付。
          </div>
        )}

        {/* Details */}
        <div className="glass rounded-2xl p-4 text-sm">
          <dl className="space-y-2.5">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">服务</dt>
              <dd className="text-right font-medium text-white">{order.serviceName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">平台</dt>
              <dd className="text-right font-medium text-white">{platform?.name ?? order.platform}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">数量</dt>
              <dd className="text-right font-medium text-white">{formatNumber(order.quantity)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">支付方式</dt>
              <dd className="text-right font-medium text-white">{paymentMethodLabels[order.paymentMethod]}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-400">目标链接</dt>
              <dd className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium text-white">{order.link}</span>
                <button
                  onClick={copyLink}
                  aria-label="复制链接"
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </dd>
            </div>
            {order.instructions ? (
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-slate-400">特殊要求</dt>
                <dd className="text-right text-slate-300">{order.instructions}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500">
          营销/增长服务——效果可能因人而异，不作保证。
        </p>

        {order.status !== 'cancelled' && onCancel ? (
          <button
            onClick={() => onCancel(order)}
            className="w-full rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
          >
            取消订单
          </button>
        ) : null}

        {onStatusChange ? (
          <div className="rounded-2xl border border-violet-400/25 bg-violet-500/[0.06] p-4">
            <p className="text-sm font-medium text-slate-200">更改订单状态</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {(Object.keys(statusLabels) as ServiceStatus[]).map((status) => {
                const active = status === order.status
                return (
                  <button
                    key={status}
                    type="button"
                    disabled={active}
                    onClick={() => onStatusChange(status)}
                    className={cn(
                      'rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all duration-200',
                      active
                        ? 'border-violet-400/60 bg-violet-500/15 text-white'
                        : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
                    )}
                  >
                    {statusLabels[status]}
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  )
}
