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
    if (name.trim().length < 2) next.name = '请输入您的姓名'
    if (!isValidEmail(email)) next.email = '请输入有效的邮箱地址'
    if (password.length < 8) next.password = '密码至少需要 8 个字符'
    if (confirm !== password) next.confirm = '两次输入的密码不一致'
    if (!terms) next.terms = '请同意服务条款'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    try {
      const user = await register(name.trim(), email, password)
      push({
        title: `欢迎加入 Boostly，${user.name.split(' ')[0]}！`,
        description: '账户创建成功。',
        type: 'success',
      })
      navigate('/dashboard', { replace: true })
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

  return (
    <AuthShell
      title="创建您的账户"
      subtitle="加入 Boostly，开始提升您的社媒影响力。"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="姓名"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          placeholder="张三"
          autoComplete="name"
        />
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
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="密码"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          <Input
            label="确认密码"
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
              我已阅读并同意
              <Link to="/terms" className="font-medium text-violet-300 hover:text-violet-200">
                《服务条款》
              </Link>
              与
              <Link to="/privacy" className="font-medium text-violet-300 hover:text-violet-200">
                《隐私政策》
              </Link>
            </span>
          </label>
          {errors.terms ? <p className="mt-1.5 text-xs text-rose-400">{errors.terms}</p> : null}
        </div>

        <Button type="submit" fullWidth size="lg" loading={loading}>
          创建账户
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
        使用 Google 注册
      </button>

      <p className="mt-6 text-center text-sm text-slate-400">
        已有账户？{' '}
        <Link to="/login" className="font-semibold text-violet-300 transition hover:text-violet-200">
          登录
        </Link>
      </p>
    </AuthShell>
  )
}
