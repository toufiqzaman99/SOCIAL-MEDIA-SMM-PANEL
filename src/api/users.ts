import type { User } from '@/types'
import { delay } from './client'

/**
 * Users service — demo implementation.
 * TODO(backend): replace with GET /me, PATCH /me.
 */
export async function updateProfile(current: User, patch: { name?: string; email?: string }): Promise<User> {
  await delay(500)
  return { ...current, ...patch }
}
