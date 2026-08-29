/** Join class names, skipping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export function formatCurrency(value: number): string {
  return `$${value.toFixed(2)}`
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

/** Compact notation: 12450 → 12.4K, 245000 → 245K, 1.6e6 → 1.6M */
export function formatCompact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 100_000) return `${Math.round(value / 1_000)}K`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return `${Math.round(value)}`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
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
