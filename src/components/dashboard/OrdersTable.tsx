import { Eye, Package, XCircle } from 'lucide-react'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import StatusBadge from '@/components/ui/StatusBadge'
import { EmptyState, Skeleton } from '@/components/ui/States'
import { platformById } from '@/data/platforms'
import type { Order } from '@/types'
import { formatDate, formatNumber } from '@/lib/utils'

export interface OrdersTableProps {
  orders: Order[]
  loading?: boolean
  limit?: number
  onSelect?: (order: Order) => void
  onCancel?: (order: Order) => void
}

/** Responsive orders table: real table on md+, stacked cards on mobile. */
export default function OrdersTable({ orders, loading, limit, onSelect, onCancel }: OrdersTableProps) {
  const visible = limit ? orders.slice(0, limit) : orders

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 rounded-2xl" />
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        icon={Package}
        title="暂无订单"
        description="下单您的第一个增长推广后，它会连同实时状态更新一起显示在这里。"
      />
    )
  }

  const rowActions = (order: Order) => {
    const cancellable = order.status === 'pending' || order.status === 'processing'
    return (
      <div className="flex items-center justify-end gap-1.5">
        {onSelect ? (
          <button
            onClick={() => onSelect(order)}
            aria-label={`查看订单 ${order.id}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </button>
        ) : null}
        {cancellable && onCancel ? (
          <button
            onClick={() => onCancel(order)}
            aria-label={`取消订单 ${order.id}`}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-500/10 hover:text-rose-300"
          >
            <XCircle className="h-4 w-4" />
          </button>
        ) : null}
      </div>
    )
  }

  return (
    <>
      {/* Desktop table */}
      <div className="glass hidden overflow-hidden rounded-3xl md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 text-xs uppercase tracking-wider text-slate-500">
              <th className="px-5 py-3.5 font-medium">订单编号</th>
              <th className="px-5 py-3.5 font-medium">服务</th>
              <th className="px-5 py-3.5 font-medium">平台</th>
              <th className="px-5 py-3.5 text-right font-medium">数量</th>
              <th className="px-5 py-3.5 font-medium">状态</th>
              <th className="px-5 py-3.5 font-medium">日期</th>
              <th className="px-5 py-3.5 text-right font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((order) => {
              const platform = platformById(order.platform)
              return (
                <tr key={order.id} className="border-b border-white/5 transition-colors last:border-0 hover:bg-white/[0.03]">
                  <td className="px-5 py-4 font-mono text-xs font-semibold text-violet-300">{order.id}</td>
                  <td className="px-5 py-4 font-medium text-white">{order.serviceName}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 text-slate-300">
                      <PlatformIcon platform={order.platform} className="h-4 w-4" />
                      {platform?.name ?? order.platform}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right text-slate-300">{formatNumber(order.quantity)}</td>
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-5 py-4 text-slate-400">{formatDate(order.createdAt)}</td>
                  <td className="px-5 py-4">{rowActions(order)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {visible.map((order) => {
          const platform = platformById(order.platform)
          return (
            <div key={order.id} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs font-semibold text-violet-300">{order.id}</span>
                <StatusBadge status={order.status} />
              </div>
              <p className="mt-2 font-medium text-white">{order.serviceName}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <PlatformIcon platform={order.platform} className="h-4 w-4" />
                  {platform?.name ?? order.platform} · {formatNumber(order.quantity)}
                </span>
                <span>{formatDate(order.createdAt)}</span>
              </div>
              <div className="mt-3 border-t border-white/5 pt-2.5">{rowActions(order)}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
