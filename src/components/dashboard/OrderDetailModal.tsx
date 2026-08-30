import { Check, CheckCircle2, Copy, CreditCard, FileText, Loader2, XCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

import Modal from '@/components/ui/Modal'
import StatusBadge from '@/components/ui/StatusBadge'
import { platformById } from '@/data/platforms'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import type { Order } from '@/types'
import { cn, formatDate, formatNumber } from '@/lib/utils'

const methodLabels: Record<Order['paymentMethod'], string> = {
  card: 'Credit / Debit Card',
  paypal: 'PayPal',
  crypto: 'Crypto',
}

interface TimelineStep {
  label: string
  icon: LucideIcon
}

const timeline: TimelineStep[] = [
  { label: 'Order placed', icon: FileText },
  { label: 'Payment recorded (demo)', icon: CreditCard },
  { label: 'Campaign processing', icon: Loader2 },
  { label: 'Campaign completed', icon: CheckCircle2 },
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
}

export default function OrderDetailModal({ order, onClose, onCancel }: OrderDetailModalProps) {
  const { format } = useApp()
  const { push } = useToast()

  if (!order) return null

  const platform = platformById(order.platform)
  const reached = reachedIndex(order)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(order.link)
      push({ title: 'Copied to clipboard', type: 'success' })
    } catch {
      push({ title: 'Could not copy', description: 'Select the text manually instead.', type: 'error' })
    }
  }

  return (
    <Modal open={Boolean(order)} onClose={onClose} size="lg" title={`Order ${order.id}`} description={`Placed ${formatDate(order.createdAt)}`}>
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
            This order was cancelled and will not be delivered.
          </div>
        )}

        {/* Details */}
        <div className="glass rounded-2xl p-4 text-sm">
          <dl className="space-y-2.5">
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Service</dt>
              <dd className="text-right font-medium text-white">{order.serviceName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Platform</dt>
              <dd className="text-right font-medium text-white">{platform?.name ?? order.platform}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Quantity</dt>
              <dd className="text-right font-medium text-white">{formatNumber(order.quantity)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-400">Payment method</dt>
              <dd className="text-right font-medium text-white">{methodLabels[order.paymentMethod]}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-slate-400">Target link</dt>
              <dd className="flex min-w-0 items-center gap-2">
                <span className="truncate font-medium text-white">{order.link}</span>
                <button
                  onClick={copyLink}
                  aria-label="Copy link"
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <Copy className="h-3.5 w-3.5" />
                </button>
              </dd>
            </div>
            {order.instructions ? (
              <div className="flex justify-between gap-4">
                <dt className="shrink-0 text-slate-400">Instructions</dt>
                <dd className="text-right text-slate-300">{order.instructions}</dd>
              </div>
            ) : null}
          </dl>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500">
          Demo order — no real payment was processed and campaign progress is simulated. Marketing/growth
          service; results may vary and are not guaranteed.
        </p>

        {order.status !== 'cancelled' && onCancel ? (
          <button
            onClick={() => onCancel(order)}
            className="w-full rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
          >
            Cancel order
          </button>
        ) : null}
      </div>
    </Modal>
  )
}
