import { CheckCircle2, Info, Loader2, Package, PlusCircle, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

import OrdersTable from '@/components/dashboard/OrdersTable'
import StatCard from '@/components/dashboard/StatCard'
import Counter from '@/components/ui/Counter'
import { Skeleton } from '@/components/ui/States'
import { useApp } from '@/store/AppContext'
import { useDemoLoading } from '@/lib/hooks'
import { formatCurrency } from '@/lib/utils'

const quickActions = [
  { label: 'Place a new order', to: '/dashboard/new', icon: PlusCircle, text: 'Browse services and check out in minutes.' },
  { label: 'Top up wallet', to: '/dashboard/wallet', icon: Wallet, text: 'Add demo funds to your account balance.' },
  { label: 'Contact support', to: '/dashboard/support', icon: CheckCircle2, text: 'Open a ticket — we reply within 24 hours.' },
]

export default function DashboardHome() {
  const { state } = useApp()
  const loading = useDemoLoading(700)

  const active = state.orders.filter((o) => o.status === 'pending' || o.status === 'processing').length
  const completed = state.orders.filter((o) => o.status === 'completed').length
  const firstName = state.user?.name.split(' ')[0] ?? 'there'

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex items-start gap-2.5 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
        <p className="text-xs leading-relaxed text-sky-200">
          Demo mode — all orders, payments, wallet funds and activity shown here are simulated and stored
          locally in your browser. No real services are delivered and no real payments are processed.
        </p>
      </div>

      <div>
        <h2 className="font-display text-2xl font-bold text-white">Welcome back, {firstName} 👋</h2>
        <p className="mt-1 text-sm text-slate-400">Here is what is happening with your campaigns today.</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={<Counter value={state.orders.length} />}
          icon={Package}
          hint="All time"
          loading={loading}
        />
        <StatCard
          label="Active Orders"
          value={<Counter value={active} />}
          icon={Loader2}
          accent="text-sky-300"
          hint="Pending + processing"
          loading={loading}
        />
        <StatCard
          label="Completed Orders"
          value={<Counter value={completed} />}
          icon={CheckCircle2}
          accent="text-emerald-300"
          hint="Delivered campaigns"
          loading={loading}
        />
        <StatCard
          label="Account Balance"
          value={loading ? null : <span className="text-3xl">{formatCurrency(state.balance)}</span>}
          icon={Wallet}
          hint="Demo wallet — no real funds"
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
          <h3 className="font-display text-lg font-semibold text-white">Recent orders</h3>
          <Link to="/dashboard/orders" className="text-sm font-semibold text-violet-300 transition hover:text-violet-200">
            View all →
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
