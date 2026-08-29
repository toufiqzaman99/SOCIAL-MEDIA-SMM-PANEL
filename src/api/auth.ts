import type { User } from '@/types'
import { uid } from '@/lib/utils'
import { delay } from './client'

/**
 * Auth service — demo implementation.
 * TODO(backend): replace with real API calls (POST /auth/login, etc.).
 * In demo mode any well-formed email/password combination signs you in;
 * no real account or session is created.
 */

export interface AuthService {
  login(email: string, password: string): Promise<User>
  register(input: { name: string; email: string; password: string }): Promise<User>
  forgotPassword(email: string): Promise<{ ok: boolean }>
  logout(): Promise<void>
}

function nameFromEmail(email: string): string {
  const raw = email.split('@')[0] ?? 'creator'
  const words = raw
    .split(/[._-]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
  return words.length > 0 ? words.join(' ') : 'Creator'
}

export const authService: AuthService = {
  async login(email, _password) {
    await delay(700)
    return { id: uid('USR'), name: nameFromEmail(email), email, createdAt: new Date().toISOString() }
  },

  async register({ name, email }) {
    await delay(900)
    return { id: uid('USR'), name, email, createdAt: new Date().toISOString() }
  },

  async forgotPassword() {
    await delay(600)
    return { ok: true }
  },

  async logout() {
    await delay(150)
  },
}
