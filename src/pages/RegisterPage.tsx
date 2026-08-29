import { Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import AuthShell, { GoogleIcon } from '@/components/auth/AuthShell'
import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { isValidEmail } from '@/lib/utils'

export default function RegisterPage() {
  const { register } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [terms, setTerms] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string; terms?: string }>({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = 'Enter your full name'
    if (!isValidEmail(email)) next.email = 'Enter a valid email address'
    if (password.length < 8) next.password = 'Password must be at least 8 characters'
    if (confirm !== password) next.confirm = 'Passwords do not match'
    if (!terms) next.terms = 'Please accept the Terms of Service'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      const user = await register(name.trim(), email, password)
      push({
        title: `Welcome to Boostly, ${user.name.split(' ')[0]}!`,
        description: 'Demo account created — no real account or data leaves your browser.',
        type: 'success',
      })
      navigate('/dashboard', { replace: true })
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

  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Boostly and start growing your presence."
      demoNote="Demo mode — registration is simulated and stored only in your browser. No real account is created."
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Full Name"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="Alex Morgan"
          autoComplete="name"
        />
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <Input
            label="Confirm Password"
            type="password"
            icon={Lock}
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            error={errors.confirm}
            placeholder="••••••••"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={terms}
              onChange={(e) => setTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-500"
            />
            <span>
              I agree to the{' '}
              <Link to="/terms" className="font-medium text-violet-300 hover:text-violet-200">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="font-medium text-violet-300 hover:text-violet-200">
                Privacy Policy
              </Link>
            </span>
          </label>
          {errors.terms ? <p className="mt-1.5 text-xs text-rose-400">{errors.terms}</p> : null}
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          Create Account
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
        Sign up with Google
      </button>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-violet-300 transition hover:text-violet-200">
          Login
        </Link>
      </p>
    </AuthShell>
  )
}
