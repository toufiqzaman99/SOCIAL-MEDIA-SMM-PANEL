import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

import { Skeleton } from '@/components/ui/States'
import { cn } from '@/lib/utils'

export interface StatCardProps {
  label: string
  value: ReactNode
  icon: LucideIcon
  hint?: string
  accent?: string
  loading?: boolean
}

export default function StatCard({ label, value, icon: Icon, hint, accent = 'text-violet-300', loading }: StatCardProps) {
  if (loading) {
    return <Skeleton className="h-[7.5rem] rounded-3xl" />
  }

  return (
    <div className="glass group rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-transform duration-300 group-hover:scale-110">
          <Icon className={cn('h-5 w-5', accent)} />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}
