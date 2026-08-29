import { Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import AuthShell, { GoogleIcon } from '@/components/auth/AuthShell'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { isValidEmail } from '@/lib/utils'

export default function LoginPage() {
  const { login } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: { email?: string; password?: string } = {}
    if (!isValidEmail(email)) next.email = 'Enter a valid email address'
    if (password.length < 6) next.password = 'Password must be at least 6 characters'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      const user = await login(email, password)
      push({
        title: `Welcome back, ${user.name.split(' ')[0]}!`,
        description: 'Demo session started — no real authentication took place.',
        type: 'success',
      })
      navigate(from, { replace: true })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    push({
      title: 'Google Sign-In',
      description: 'Google Sign-In is a visual placeholder in this demo.',
      type: 'info',
    })
  }

  const handleForgot = () => {
    push({
      title: 'Password reset',
      description: 'Demo mode — password reset is simulated. No email was sent.',
      type: 'info',
    })
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to manage your campaigns, orders and wallet."
      demoNote="Demo mode — any valid email and password (6+ characters) will sign you in. No real account or session is created."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Email"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Input
          label="Password"
          type="password"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
            />
            Remember me
          </label>
          <button
            type="button"
            onClick={handleForgot}
            className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Login
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500">or</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white text-sm font-semibold text-ink-900 transition hover:bg-slate-100"
      >
        <GoogleIcon className="h-5 w-5" />
        Continue with Google
      </button>

      <p className="mt-6 text-center text-sm text-slate-400">
        New to Boostly?{' '}
        <Link to="/register" className="font-semibold text-violet-300 transition hover:text-violet-200">
          Create an account
        </Link>
      </p>
    </AuthShell>
  )
}
