import { motion } from 'framer-motion'
import { Info, LogOut } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { cn, formatDate, isValidEmail } from '@/lib/utils'

interface ToggleRow {
  key: string
  label: string
  text: string
}

const toggles: ToggleRow[] = [
  { key: 'orders', label: 'Order updates', text: 'Status changes for your campaigns' },
  { key: 'promos', label: 'Promotions', text: 'New services and seasonal offers' },
  { key: 'support', label: 'Support replies', text: 'When our team answers your tickets' },
]

function Switch({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-200',
        checked ? 'border-violet-400/50 bg-violet-500/80' : 'border-white/15 bg-white/10',
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        className={cn(
          'absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-white shadow',
          checked ? 'left-[calc(100%-1.25rem)]' : 'left-1',
        )}
      />
    </button>
  )
}

export default function SettingsPage() {
  const { state, updateProfile, logout } = useApp()
  const { push } = useToast()
  const navigate = useNavigate()

  const [name, setName] = useState(state.user?.name ?? '')
  const [email, setEmail] = useState(state.user?.email ?? '')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [saving, setSaving] = useState(false)
  const [prefs, setPrefs] = useState<Record<string, boolean>>({ orders: true, promos: false, support: true })

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (name.trim().length < 2) next.name = 'Enter your name'
    if (!isValidEmail(email)) next.email = 'Enter a valid email address'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSaving(true)
    try {
      await updateProfile({ name: name.trim(), email: email.trim() })
      push({ title: 'Profile updated', description: 'Your demo profile was saved locally.', type: 'success' })
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    push({ title: 'Signed out', description: 'Your demo session has ended.', type: 'info' })
    navigate('/')
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Profile */}
      <form onSubmit={handleSave} className="glass rounded-3xl p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-white">Profile</h3>
        <p className="mt-1 text-sm text-slate-400">Your demo account details — stored locally only.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
        </div>
        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Member since {state.user ? formatDate(state.user.createdAt) : '—'}
          </p>
          <Button type="submit" loading={saving}>
            Save Changes
          </Button>
        </div>
      </form>

      {/* Notifications */}
      <div className="glass rounded-3xl p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-white">Notifications</h3>
        <p className="mt-1 text-sm text-slate-400">Preferences are stored for this demo session only.</p>
        <div className="mt-5 space-y-4">
          {toggles.map((toggle) => (
            <div key={toggle.key} className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-white">{toggle.label}</p>
                <p className="text-xs text-slate-500">{toggle.text}</p>
              </div>
              <Switch
                checked={Boolean(prefs[toggle.key])}
                onChange={(value) => setPrefs((prev) => ({ ...prev, [toggle.key]: value }))}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="glass rounded-3xl p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold text-white">Account</h3>
        <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
          <p className="text-xs leading-relaxed text-slate-400">
            Password changes are not available in the demo — no real credentials exist.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
        >
          <LogOut className="h-4 w-4" />
          Log out of demo session
        </button>
      </div>
    </div>
  )
}
