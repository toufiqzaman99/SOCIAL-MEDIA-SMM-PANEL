import type { Transaction } from '@/types'
import { delay } from './client'

/**
 * Transactions service — demo implementation.
 * TODO(backend): replace with GET /transactions.
 */
export async function fetchTransactions(): Promise<Transaction[]> {
  await delay(400)
  // Demo: the app store owns transaction state; a real backend would return it here.
  return []
}
