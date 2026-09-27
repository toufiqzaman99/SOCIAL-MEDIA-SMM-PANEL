import type { PaymentMethod, TopUpRequest } from '@/types'
import { uid } from '@/lib/utils'
import { delay } from './client'

/**
 * Wallet service — demo implementation.
 * TODO(backend): replace with GET /wallet, POST /wallet/topup,
 * POST /wallet/requests/:id/approve etc.
 */

export async function addFunds(amount: number): Promise<{ balance: number; demo: true }> {
  await delay(600)
  return { balance: amount, demo: true }
}

/**
 * Alipay top-ups are real payments in this demo: the customer pays via the
 * QR code and the balance is only credited after an admin approves the
 * request — nothing is credited here.
 */
export async function createTopUpRequest(
  input: { amount: number; bonus: number; method: PaymentMethod },
  userId = 'guest',
): Promise<TopUpRequest> {
  await delay(700)
  const now = new Date().toISOString()
  return {
    ...input,
    id: uid('TOP'),
    userId,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }
}

export async function approveTopUpRequest(_requestId: string): Promise<{ ok: boolean }> {
  await delay(500)
  return { ok: true }
}

export async function rejectTopUpRequest(_requestId: string): Promise<{ ok: boolean }> {
  await delay(500)
  return { ok: true }
}
