import { delay } from './client'

/**
 * Wallet service — demo implementation.
 * TODO(backend): replace with GET /wallet, POST /wallet/topup.
 */
export async function addFunds(amount: number): Promise<{ balance: number; demo: true }> {
  await delay(600)
  return { balance: amount, demo: true }
}
