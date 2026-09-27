import type { ServiceStatus } from '@/types'
import { cn } from '@/lib/utils'

const config: Record<ServiceStatus, { label: string; className: string; dot: string; pulse?: boolean }> = {
  pending: {
    label: '待处理',
    className: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
    dot: 'bg-amber-400',
    pulse: true,
  },
  processing: {
    label: '处理中',
    className: 'border-sky-400/25 bg-sky-400/10 text-sky-300',
    dot: 'bg-sky-400',
    pulse: true,
  },
  completed: {
    label: '已完成',
    className: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
    dot: 'bg-emerald-400',
  },
  cancelled: {
    label: '已取消',
    className: 'border-rose-400/25 bg-rose-400/10 text-rose-300',
    dot: 'bg-rose-400',
  },
}

export default function StatusBadge({ status }: { status: ServiceStatus }) {
  const { label, className, dot, pulse } = config[status]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium',
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', dot, pulse && 'animate-pulse')} />
      {label}
    </span>
  )
}
