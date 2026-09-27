import { Lock, Mail, ShieldCheck } from 'lucide-react'
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
    if (!isValidEmail(email)) next.email = '请输入有效的邮箱地址'
    if (password.length < 6) next.password = '密码至少需要 6 个字符'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      const user = await login(email, password)
      push({
        title: `欢迎回来，${user.name.split(' ')[0]}！`,
        description: '登录成功。',
        type: 'success',
      })
      navigate(from, { replace: true })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = () => {
    push({
      title: 'Google 登录',
      description: 'Google 登录即将上线。',
      type: 'info',
    })
  }

  const handleForgot = () => {
    push({
      title: '密码重置',
      description: '重置链接已发送至您的邮箱。',
      type: 'info',
    })
  }

  return (
    <AuthShell
      title="欢迎回来"
      subtitle="登录以管理您的推广、订单与钱包。"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="邮箱"
          type="email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Input
          label="密码"
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
            记住我
          </label>
          <button
            type="button"
            onClick={handleForgot}
            className="text-sm font-medium text-violet-300 transition hover:text-violet-200"
          >
            忘记密码？
          </button>
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          登录
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-slate-500">或</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white text-sm font-semibold text-ink-900 transition hover:bg-slate-100"
      >
        <GoogleIcon className="h-5 w-5" />
        使用 Google 继续
      </button>

      <p className="mt-6 text-center text-sm text-slate-400">
        第一次来 Boostly？{' '}
        <Link to="/register" className="font-semibold text-violet-300 transition hover:text-violet-200">
          创建账户
        </Link>
      </p>

      <button
        type="button"
        onClick={() => navigate('/admin')}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-sm font-medium text-slate-400 transition hover:border-violet-400/40 hover:text-white"
      >
        <ShieldCheck className="h-4 w-4" />
        管理员登录
      </button>
    </AuthShell>
  )
}
