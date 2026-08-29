import type { AppData, Order, Ticket, Transaction } from '@/types'
import { uid } from '@/lib/utils'

/**
 * Local persistence for the demo. In a production build this file disappears —
 * data would live on a server behind the other api modules.
 */

const STORAGE_KEY = 'boostly:state:v1'

function daysAgo(days: number, hours = 0): string {
  return new Date(Date.now() - (days * 24 + hours) * 3_600_000).toISOString()
}

/** Seed sample data on first visit so the dashboard has something to show. */
function seedDemoData(): AppData {
  const orders: Order[] = [
    {
      id: uid('ORD'),
      userId: 'demo',
      platform: 'instagram',
      serviceId: 'instagram-followers',
      serviceName: 'Instagram Followers',
      packageId: 'instagram-followers-p1',
      quantity: 1000,
      price: 9.99,
      link: 'instagram.com/demo.creator',
      email: 'demo@boostly.com',
      paymentMethod: 'card',
      status: 'completed',
      createdAt: daysAgo(12),
      updatedAt: daysAgo(11),
    },
    {
      id: uid('ORD'),
      userId: 'demo',
      platform: 'tiktok',
      serviceId: 'tiktok-likes',
      serviceName: 'TikTok Likes',
      packageId: 'tiktok-likes-p2',
      quantity: 2500,
      price: 11.99,
      link: 'tiktok.com/@demo.creator',
      email: 'demo@boostly.com',
      paymentMethod: 'paypal',
      status: 'processing',
      createdAt: daysAgo(1),
      updatedAt: daysAgo(0, 3),
    },
    {
      id: uid('ORD'),
      userId: 'demo',
      platform: 'youtube',
      serviceId: 'youtube-views',
      serviceName: 'YouTube Views',
      packageId: 'youtube-views-p2',
      quantity: 10000,
      price: 34.99,
      link: 'youtube.com/@demochannel',
      email: 'demo@boostly.com',
      paymentMethod: 'crypto',
      status: 'completed',
      createdAt: daysAgo(3),
      updatedAt: daysAgo(2, 12),
    },
    {
      id: uid('ORD'),
      userId: 'demo',
      platform: 'telegram',
      serviceId: 'telegram-members',
      serviceName: 'Telegram Channel Members',
      packageId: 'telegram-members-p2',
      quantity: 1000,
      price: 9.99,
      link: 't.me/demochannel',
      email: 'demo@boostly.com',
      paymentMethod: 'card',
      status: 'pending',
      createdAt: daysAgo(0, 2),
      updatedAt: daysAgo(0, 2),
    },
  ]

  const transactions: Transaction[] = [
    { id: uid('TXN'), userId: 'demo', type: 'deposit', amount: 50, description: 'Wallet top-up', status: 'completed', createdAt: daysAgo(40) },
    { id: uid('TXN'), userId: 'demo', type: 'payment', amount: -9.99, description: `${orders[0].id} · Instagram Followers × 1,000`, status: 'completed', createdAt: daysAgo(12) },
    { id: uid('TXN'), userId: 'demo', type: 'deposit', amount: 25, description: 'Wallet top-up', status: 'completed', createdAt: daysAgo(9) },
    { id: uid('TXN'), userId: 'demo', type: 'payment', amount: -34.99, description: `${orders[2].id} · YouTube Views × 10,000`, status: 'completed', createdAt: daysAgo(3) },
    { id: uid('TXN'), userId: 'demo', type: 'payment', amount: -11.99, description: `${orders[1].id} · TikTok Likes × 2,500`, status: 'completed', createdAt: daysAgo(1) },
    { id: uid('TXN'), userId: 'demo', type: 'bonus', amount: 5, description: 'Welcome bonus', status: 'completed', createdAt: daysAgo(45) },
  ]

  const tickets: Ticket[] = [
    {
      id: uid('TKT'),
      userId: 'demo',
      subject: 'Delivery estimate question',
      category: 'Orders & Delivery',
      message: 'Hi! My TikTok campaign is still processing — can you confirm the estimated completion window?',
      status: 'answered',
      createdAt: daysAgo(2),
    },
  ]

  const balance = transactions.reduce((sum, t) => sum + t.amount, 0)

  return { user: null, orders, transactions, tickets, balance }
}

export function loadAppData(): AppData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as AppData
      if (parsed && Array.isArray(parsed.orders)) return parsed
    }
  } catch {
    // Corrupted or unavailable storage — fall back to a fresh seed.
  }
  const seeded = seedDemoData()
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded))
  } catch {
    // Storage unavailable (private mode etc.) — demo still works in memory.
  }
  return seeded
}

export function saveAppData(data: AppData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Ignore quota/availability errors — the demo keeps working in memory.
  }
}
