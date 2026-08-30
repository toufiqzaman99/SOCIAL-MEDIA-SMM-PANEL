import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeftRight,
  Bell,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Package,
  PlusCircle,
  Settings,
  Wallet,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'

import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/ui/Logo'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  to: string
  icon: LucideIcon
  end?: boolean
}

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard, end: true },
  { label: 'New Order', to: '/dashboard/new', icon: PlusCircle },
  { label: 'My Orders', to: '/dashboard/orders', icon: Package },
  { label: 'Wallet', to: '/dashboard/wallet', icon: Wallet },
  { label: 'Transactions', to: '/dashboard/transactions', icon: ArrowLeftRight },
  { label: 'Support', to: '/dashboard/support', icon: LifeBuoy },
  { label: 'Settings', to: '/dashboard/settings', icon: Settings },
]

const titles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/dashboard/new': 'New Order',
  '/dashboard/orders': 'My Orders',
  '/dashboard/wallet': 'Wallet',
  '/dashboard/transactions': 'Transactions',
  '/dashboard/support': 'Support',
  '/dashboard/settings': 'Settings',
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { state, logout } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    push({ title: 'Signed out', description: 'Your demo session has ended.', type: 'info' })
    navigate('/')
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b border-white/5 px-5">
        <Logo />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4" aria-label="Dashboard navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-violet-500/15 text-white shadow-glow-sm'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white',
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn('h-[18px] w-[18px]', isActive && 'text-violet-300')} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-xl p-2">
          <Avatar name={state.user?.name ?? 'Guest'} className="h-9 w-9" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">{state.user?.name ?? 'Guest'}</p>
            <p className="truncate text-xs text-slate-500">{state.user?.email ?? 'demo@boostly.com'}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            aria-label="Log out"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-rose-300"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function DashboardLayout() {
  const { state, format } = useApp()
  const { push } = useToast()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const title = titles[location.pathname] ?? 'Dashboard'

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-white/5 bg-ink-900/80 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/5 bg-ink-950/85 px-4 backdrop-blur-xl lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open dashboard menu"
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-lg font-semibold text-white">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm font-semibold text-white sm:flex">
            <Wallet className="h-4 w-4 text-violet-300" />
            {format(state.balance)}
          </span>
          <button
            onClick={() =>
              push({ title: 'No new notifications', description: 'You are all caught up (demo).', type: 'info' })
            }
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-400" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-ink-900 lg:hidden"
            >
              <SidebarContent onNavigate={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
        <Outlet />
      </main>
    </div>
  )
}
