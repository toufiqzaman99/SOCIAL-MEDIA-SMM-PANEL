import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'

import Avatar from '@/components/ui/Avatar'
import { buttonClasses } from '@/components/ui/Button'
import CurrencySwitcher from '@/components/ui/CurrencySwitcher'
import Logo from '@/components/ui/Logo'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn } from '@/lib/utils'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const links = [
  { label: '首页', to: '/' },
  { label: '服务', to: '/services' },
  { label: '价格', to: '/pricing' },
  { label: '充值', to: '/topup' },
  { label: '运作流程', to: '/how-it-works' },
  { label: '常见问题', to: '/faq' },
  { label: '联系我们', to: '/contact' },
]

export default function Navbar() {
  const { state, logout } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Close the sheet on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  const handleLogout = async () => {
    await logout()
    push({ title: '已退出登录', description: '您已安全退出。', type: 'info' })
    navigate('/')
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled || open ? 'border-b border-white/5 bg-ink-950/85 backdrop-blur-xl' : 'bg-transparent',
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="主导航">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-white/5 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2 md:flex">
          <CurrencySwitcher />
          {state.user ? (
            <>
              <Link to="/dashboard" className={buttonClasses('primary', 'sm')}>
                控制台
              </Link>
              <Link to="/dashboard/settings" aria-label="账户设置">
                <Avatar name={state.user.name} className="ring-white/20 transition hover:ring-violet-400/60" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={buttonClasses('ghost', 'sm')}>
                登录
              </Link>
              <Link to="/register" className={buttonClasses('outline', 'sm', 'hidden lg:inline-flex')}>
                注册
              </Link>
              <Link to="/pricing" className={buttonClasses('primary', 'sm')}>
                立即开始
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/5 hover:text-white md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu — right slide-in sheet, themed with the existing dark surface */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              key="menu-sheet"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
              className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(88vw,360px)] flex-col border-l border-white/10 bg-ink-900/95 backdrop-blur-2xl md:hidden"
            >
              <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="关闭菜单"
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-5" aria-label="移动端导航">
                {links.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.45, ease: EASE }}
                  >
                    <NavLink
                      to={link.to}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                          isActive ? 'bg-white/5 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white',
                        )
                      }
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="flex flex-col gap-2.5 border-t border-white/5 p-4">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-widest text-slate-500">货币</p>
                  <CurrencySwitcher variant="row" />
                </div>
                {state.user ? (
                  <>
                    <Link to="/dashboard" className={buttonClasses('primary', 'md', 'w-full')}>
                      控制台
                    </Link>
                    <button onClick={handleLogout} className={buttonClasses('outline', 'md', 'w-full')}>
                      退出登录
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className={buttonClasses('outline', 'md', 'w-full')}>
                      登录
                    </Link>
                    <Link to="/register" className={buttonClasses('outline', 'md', 'w-full')}>
                      注册
                    </Link>
                    <Link to="/pricing" className={buttonClasses('primary', 'md', 'w-full')}>
                      立即开始
                    </Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
