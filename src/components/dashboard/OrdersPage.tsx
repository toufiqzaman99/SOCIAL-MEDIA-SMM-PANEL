import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import OrderDetailModal from '@/components/dashboard/OrderDetailModal'
import OrdersTable from '@/components/dashboard/OrdersTable'
import Button from '@/components/ui/Button'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { useDemoLoading } from '@/lib/hooks'
import { cn } from '@/lib/utils'
import type { Order, ServiceStatus } from '@/types'

type Filter = ServiceStatus | 'all'

const filters: Array<{ id: Filter; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待处理' },
  { id: 'processing', label: '处理中' },
  { id: 'completed', label: '已完成' },
  { id: 'cancelled', label: '已取消' },
]

export default function OrdersPage() {
  const { state, cancelOrder } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()
  const loading = useDemoLoading(450)
  const [filter, setFilter] = useState<Filter>('all')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filtered = filter === 'all' ? state.orders : state.orders.filter((o) => o.status === filter)
  const selected: Order | null = selectedId ? state.orders.find((o) => o.id === selectedId) ?? null : null

  const handleCancel = async (order: Order) => {
    await cancelOrder(order.id)
    setSelectedId(null)
    push({
      title: '订单已取消',
      description: `${order.id} 已取消。`,
      type: 'info',
    })
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      {/* Filter tabs */}
      <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
        <div className="flex w-max gap-2">
          {filters.map((f) => {
            const count =
              f.id === 'all' ? state.orders.length : state.orders.filter((o) => o.status === f.id).length
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200',
                  filter === f.id
                    ? 'border-violet-400/50 bg-violet-500/15 text-white'
                    : 'border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white',
                )}
              >
                {f.label}
                <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px] font-bold">{count}</span>
              </button>
            )
          })}
        </div>
      </div>

      <OrdersTable
        orders={filtered}
        loading={loading}
        onSelect={(order) => setSelectedId(order.id)}
        onCancel={handleCancel}
      />

      <OrderDetailModal order={selected} onClose={() => setSelectedId(null)} onCancel={handleCancel} />

      <div className="flex justify-center pt-2">
        <Button variant="secondary" onClick={() => navigate('/dashboard/new')}>
          新建订单
        </Button>
      </div>
    </div>
  )
}
