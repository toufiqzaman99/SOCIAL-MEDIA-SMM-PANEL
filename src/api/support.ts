import type { Ticket } from '@/types'
import { uid } from '@/lib/utils'
import { delay } from './client'

/**
 * Support service — demo implementation.
 * TODO(backend): replace with POST /support/tickets.
 */
export async function createTicket(input: {
  subject: string
  category: string
  message: string
}, userId = 'guest'): Promise<Ticket> {
  await delay(800)
  return {
    ...input,
    id: uid('TKT'),
    userId,
    status: 'open',
    createdAt: new Date().toISOString(),
  }
}
