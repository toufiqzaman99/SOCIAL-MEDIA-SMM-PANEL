import type { PaymentMethod } from '@/types'

/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  card: '银行卡',
  paypal: 'PayPal',
  crypto: '加密货币',
  alipay: '支付宝',
  wechat: '微信支付',
}

export function formatCurrency(value: number): string {
  return `¥${value.toFixed(2)}`
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('zh-CN')
}

/** Compact notation: 12450 → 1.2万, 245000 → 24.5万, 1.6e8 → 1.6亿 */
export function formatCompact(value: number): string {
  if (value >= 100_000_000) return `${(value / 100_000_000).toFixed(1)}亿`
  if (value >= 10_000) {
    const wan = value / 10_000
    return `${Number.isInteger(wan) ? wan.toLocaleString('zh-CN') : wan.toFixed(1)}万`
  }
  return `${Math.round(value).toLocaleString('zh-CN')}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return '刚刚'
  if (mins < 60) return `${mins}分钟前`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}小时前`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}天前`
  return formatDate(iso)
}

/** Small readable unique id, e.g. "ORD-5F2A1C" */
export function uid(prefix: string): string {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `${prefix}-${part}`
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

/**
 * Loose "public profile/page URL" check — no passwords are ever collected,
 * so we only sanity-check that the value looks like a link.
 */
export function isValidUrlLike(value: string): boolean {
  const v = value.trim()
  return v.length >= 4 && !v.includes(' ') && v.includes('.')
}

export function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('')
}
