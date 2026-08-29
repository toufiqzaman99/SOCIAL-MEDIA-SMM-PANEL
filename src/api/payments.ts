import type { PaymentMethod } from '@/types'
import { uid } from '@/lib/utils'
import { delay } from './client'

/**
 * Payments service — demo implementation.
 *
 * IMPORTANT: this demo is NOT connected to a payment gateway. Recording a
 * "payment" here never means a real payment happened — the UI states this
 * explicitly. TODO(backend): replace with Stripe/PayPal/crypto integration.
 */
export interface PaymentRecord {
  id: string
  orderId: string
  method: PaymentMethod
  amount: number
  status: 'recorded'
  demo: true
  createdAt: string
}

export async function recordPayment(input: {
  orderId: string
  method: PaymentMethod
  amount: number
}): Promise<PaymentRecord> {
  await delay(600)
  return {
    id: uid('PAY'),
    ...input,
    status: 'recorded',
    demo: true,
    createdAt: new Date().toISOString(),
  }
}
