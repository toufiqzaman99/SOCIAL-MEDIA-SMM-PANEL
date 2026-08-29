import type { CreateOrderInput, Order } from '@/types'
import { uid } from '@/lib/utils'
import { delay } from './client'

/**
 * Orders service — demo implementation.
 * TODO(backend): replace with real API calls (POST /orders, GET /orders...).
 */
export async function createOrder(input: CreateOrderInput, userId = 'guest'): Promise<Order> {
  await delay(750)
  const now = new Date().toISOString()
  return {
    ...input,
    id: uid('ORD'),
    userId,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  }
}

export async function fetchOrders(): Promise<Order[]> {
  await delay(400)
  // Demo: the app store owns order state; a real backend would return it here.
  return []
}
