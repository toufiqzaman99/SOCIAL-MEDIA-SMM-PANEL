import {
  BadgeDollarSign,
  CheckCircle2,
  Clock,
  Info,
  Loader2,
  LockKeyhole,
  Package,
  ShieldCheck,
  User,
  XCircle,
} from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'

import OrderDetailModal from '@/components/dashboard/OrderDetailModal'
import OrdersTable from '@/components/dashboard/OrdersTable'
import StatCard from '@/components/dashboard/StatCard'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import PageHeader from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/ui/States'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn, formatRelative, paymentMethodLabels } from '@/lib/utils'
import { ADMIN_PASSWORD, ADMIN_USERNAME } from '@/lib/admin'
import type { Order, ServiceStatus, TopUpRequestStatus } from '@/types'

const statusMeta: Record<TopUpRequestStatus, { label: string; className: string }> = {
  pending: { label: '待审核', className: 'border-amber-400/25 bg-amber-400/10 text-amber-300' },
  approved: { label: '已通过', className: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300' },
  rejected: { label: '已拒绝', className: 'border-rose-400/25 bg-rose-400/10 text-rose-300' },
}

type OrderFilter = ServiceStatus | 'all'

const orderStatusLabels: Record<ServiceStatus, string> = {
  pending: '待处理',
  processing: '处理中',
  completed: '已完成',
  cancelled: '已取消',
}

const orderFilters: Array<{ id: OrderFilter; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'pending', label: '待处理' },
  { id: 'processing', label: '处理中' },
  { id: 'completed', label: '已完成' },
  { id: 'cancelled', label: '已取消' },
]

export default function AdminPage() {
  const { state, approveTopUpRequest, rejectTopUpRequest, cancelOrder, setOrderStatus, format } = useApp()
  const { push } = useToast()
  // Login is always required on visit — no remembered session.
  const [authed, setAuthed] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const [orderFilter, setOrderFilter] = useState<OrderFilter>('all')
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setAuthed(true)
      setError('')
    } else {
      setError('账号或密码错误')
    }
  }

  const handleApprove = async (requestId: string) => {
    setBusyId(requestId)
    try {
      await approveTopUpRequest(requestId)
      push({
        title: '充值已通过',
        description: '客户余额已到账。',
        type: 'success',
      })
    } finally {
      setBusyId(null)
    }
  }

  const handleReject = async (requestId: string) => {
    setBusyId(requestId)
    try {
      await rejectTopUpRequest(requestId)
      push({ title: '申请已拒绝', description: '未充值任何余额。', type: 'info' })
    } finally {
      setBusyId(null)
    }
  }

  if (!authed) {
    return (
      <section className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-28">
        <form onSubmit={handleLogin} className="glass-strong w-full max-w-md rounded-3xl p-6 shadow-card sm:p-8">
          <div className="flex flex-col items-center text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/10 text-violet-300">
              <LockKeyhole className="h-7 w-7" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-white">管理员登录</h1>
            <p className="mt-2 text-sm text-slate-400">登录管理后台，查看订单与充值审核。</p>
          </div>
          <div className="mt-6 space-y-4">
            <Input
              label="管理员账号"
              icon={User}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="paulo99"
              autoComplete="username"
            />
            <Input
              label="管理员密码"
              type="password"
              icon={LockKeyhole}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <Button type="submit" fullWidth size="lg">
              登录管理后台
            </Button>
          </div>
        </form>
      </section>
    )
  }

  const handleCancel = async (order: Order) => {
    await cancelOrder(order.id)
    setSelectedOrderId(null)
    push({ title: '订单已取消', description: `${order.id} 已取消。`, type: 'info' })
  }

  const handleStatusChange = async (status: ServiceStatus) => {
    if (!selectedOrderId) return
    await setOrderStatus(selectedOrderId, status)
    push({
      title: '订单状态已更新',
      description: `订单 ${selectedOrderId} 已更新为「${orderStatusLabels[status]}」。`,
      type: 'success',
    })
  }

  const pending = state.topUpRequests.filter((r) => r.status === 'pending')
  const filteredOrders = orderFilter === 'all' ? state.orders : state.orders.filter((o) => o.status === orderFilter)
  const selectedOrder: Order | null = selectedOrderId
    ? state.orders.find((o) => o.id === selectedOrderId) ?? null
    : null
  const revenue = state.orders.reduce((sum, o) => sum + o.price, 0)
  const processing = state.orders.filter((o) => o.status === 'processing').length
  const completed = state.orders.filter((o) => o.status === 'completed').length

  return (
    <>
      <PageHeader
        eyebrow="管理后台"
        title={
          <>
            后台<span className="text-gradient">总览</span>
          </>
        }
        subtitle={`${state.orders.length} 个订单 · ${pending.length} 个待审核充值申请`}
      />

      <section className="pb-24">
        <div className="container-x mx-auto max-w-5xl space-y-10">
          {/* ── 数据总览 ─────────────────────────────────────────────── */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
            <StatCard label="订单总数" value={state.orders.length} icon={Package} />
            <StatCard
              label="待处理订单"
              value={state.orders.filter((o) => o.status === 'pending').length}
              icon={Clock}
              accent="text-amber-300"
            />
            <StatCard label="处理中订单" value={processing} icon={Loader2} accent="text-sky-300" />
            <StatCard label="已完成订单" value={completed} icon={CheckCircle2} accent="text-emerald-300" />
            <StatCard
              label="订单总收入"
              value={<span className="text-2xl">{format(revenue)}</span>}
              icon={BadgeDollarSign}
              accent="text-emerald-300"
            />
            <StatCard
              label="待审核充值"
              value={pending.length}
              icon={ShieldCheck}
              accent="text-violet-300"
            />
          </div>

          {/* ── 订单总览 ─────────────────────────────────────────────── */}
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">订单总览</h2>
              <p className="mt-1 text-sm text-slate-400">查看平台上的全部订单，点击订单可查看详情。</p>
            </div>

            <div className="no-scrollbar -mx-1 overflow-x-auto px-1">
              <div className="flex w-max gap-2">
                {orderFilters.map((f) => {
                  const count =
                    f.id === 'all' ? state.orders.length : state.orders.filter((o) => o.status === f.id).length
                  return (
                    <button
                      key={f.id}
                      onClick={() => setOrderFilter(f.id)}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200',
                        orderFilter === f.id
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
              orders={filteredOrders}
              onSelect={(order) => setSelectedOrderId(order.id)}
              onCancel={handleCancel}
            />
          </div>

          {/* ── 充值审核 ─────────────────────────────────────────────── */}
          <div className="space-y-5">
            <div>
              <h2 className="font-display text-xl font-bold text-white">充值审核</h2>
              <p className="mt-1 text-sm text-slate-400">通过后客户余额将到账。</p>
            </div>

            <div className="flex items-start gap-2.5 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
              <p className="text-xs leading-relaxed text-sky-200">
                请在通过前人工核实支付宝 / 微信支付款项到账情况，确认无误后再为客户充值。
              </p>
            </div>

            {state.topUpRequests.length === 0 ? (
              <EmptyState
                icon={ShieldCheck}
                title="暂无充值申请"
                description="客户通过支付宝 / 微信支付扫码流程提交的申请将显示在这里。"
              />
            ) : (
              <div className="glass divide-y divide-white/5 rounded-3xl">
                {state.topUpRequests.map((request) => {
                  const meta = statusMeta[request.status]
                  return (
                    <div key={request.id} className="flex flex-wrap items-center gap-3 px-5 py-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-xs font-semibold text-violet-300">{request.id}</p>
                          <span
                            className={cn(
                              'rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                              meta.className,
                            )}
                          >
                            {meta.label}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-white">
                          {format(request.amount)}
                          {request.bonus > 0 ? (
                            <span className="ml-1.5 text-xs font-medium text-emerald-300">
                              + {format(request.bonus)} 赠送
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                          {paymentMethodLabels[request.method]} · {formatRelative(request.createdAt)}
                        </p>
                      </div>
                      {request.status === 'pending' ? (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            icon={CheckCircle2}
                            loading={busyId === request.id}
                            onClick={() => handleApprove(request.id)}
                          >
                            通过
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            icon={XCircle}
                            onClick={() => handleReject(request.id)}
                          >
                            拒绝
                          </Button>
                        </div>
                      ) : null}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <OrderDetailModal
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onCancel={handleCancel}
        onStatusChange={handleStatusChange}
      />
    </>
  )
}
