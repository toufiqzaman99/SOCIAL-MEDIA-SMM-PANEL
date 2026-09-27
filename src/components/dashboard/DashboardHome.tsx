import { CheckCircle2, Loader2, Package, PlusCircle, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

import OrdersTable from '@/components/dashboard/OrdersTable'
import StatCard from '@/components/dashboard/StatCard'
import Counter from '@/components/ui/Counter'
import { Skeleton } from '@/components/ui/States'
import { useApp } from '@/store/AppContext'
import { useDemoLoading } from '@/lib/hooks'

const quickActions = [
  { label: '新建订单', to: '/dashboard/new', icon: PlusCircle, text: '浏览服务，几分钟内完成下单。' },
  { label: '钱包充值', to: '/dashboard/wallet', icon: Wallet, text: '为您的账户余额充值。' },
  { label: '联系客服', to: '/dashboard/support', icon: CheckCircle2, text: '提交工单——我们将在 24 小时内回复。' },
]

export default function DashboardHome() {
  const { state, format } = useApp()
  const loading = useDemoLoading(700)

  const active = state.orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
  const completed = state.orders.filter((o) => o.status === 'completed').length
  const firstName = state.user?.name.split(' ')[0] ?? '朋友'

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-white">欢迎回来，{firstName} 👋</h2>
        <p className="mt-1 text-sm text-slate-400">这是您今天的推广动态。</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="订单总数"
          value={<Counter value={state.orders.length} />}
          icon={Package}
          hint="全部时间"
          loading={loading}
        />
        <StatCard
          label="进行中订单"
          value={<Counter value={active} />}
          icon={Loader2}
          accent="text-sky-300"
          hint="待处理 + 处理中"
          loading={loading}
        />
        <StatCard
          label="已完成订单"
          value={<Counter value={completed} />}
          icon={CheckCircle2}
          accent="text-emerald-300"
          hint="已交付推广"
          loading={loading}
        />
        <StatCard
          label="账户余额"
          value={loading ? null : <span className="text-3xl">{format(state.balance)}</span>}
          icon={Wallet}
          hint="钱包余额"
          loading={loading}
        />
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="glass group rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:shadow-glow-sm"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-110">
              <action.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-sm font-semibold text-white">{action.label}</p>
            <p className="mt-1 text-xs text-slate-500">{action.text}</p>
          </Link>
        ))}
      </div>

      {/* Recent orders */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-white">最近订单</h3>
          <Link to="/dashboard/orders" className="text-sm font-semibold text-violet-300 transition hover:text-violet-200">
            查看全部 →
          </Link>
        </div>
        {loading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 rounded-2xl" />
            ))}
          </div>
        ) : (
          <OrdersTable orders={state.orders} limit={5} />
        )}
      </div>
    </div>
  )
}
