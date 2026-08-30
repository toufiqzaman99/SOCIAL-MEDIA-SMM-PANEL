/**
 * Shared domain types for Boostly.
 * These mirror what a real backend would return — swap the mock api/* layer
 * for real HTTP calls without touching the UI.
 */

export type PlatformId = 'instagram' | 'tiktok' | 'youtube' | 'facebook' | 'twitter' | 'telegram'

export type ServiceStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

export type PaymentMethod = 'card' | 'paypal' | 'crypto'

export type TransactionType = 'payment' | 'deposit' | 'refund' | 'bonus'

/** Display currencies — all prices are stored in HKD and converted for display. */
export type CurrencyCode = 'CNY' | 'HKD' | 'USD' | 'KRW'

export interface Platform {
  id: PlatformId
  name: string
  tagline: string
  description: string
  startingAt: number
  /** Tailwind gradient classes used to tint the platform icon */
  gradient: string
  /** Tailwind glow class for the icon */
  glow: string
}

export type ServiceIconId =
  | 'followers'
  | 'likes'
  | 'views'
  | 'comments'
  | 'storyViews'
  | 'reelsViews'
  | 'engagement'
  | 'shares'
  | 'subscribers'
  | 'pageLikes'
  | 'videoViews'
  | 'postLikes'
  | 'members'
  | 'postViews'
  | 'reactions'

export interface ServicePackage {
  id: string
  /** Tier name, e.g. "Starter" */
  label: string
  quantity: number
  price: number
  deliveryEstimate: string
  bestValue?: boolean
}

export interface Service {
  id: string
  platform: PlatformId
  name: string
  icon: ServiceIconId
  description: string
  deliveryEstimate: string
  popular?: boolean
  /** Flagship services power the pricing page (4 tiers each) */
  flagship?: boolean
  packages: ServicePackage[]
}

export interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export interface Order {
  id: string
  userId: string
  platform: PlatformId
  serviceId: string
  serviceName: string
  packageId: string
  quantity: number
  price: number
  link: string
  email: string
  instructions?: string
  paymentMethod: PaymentMethod
  status: ServiceStatus
  createdAt: string
  updatedAt: string
}

export interface CreateOrderInput {
  platform: PlatformId
  serviceId: string
  serviceName: string
  packageId: string
  quantity: number
  price: number
  link: string
  email: string
  instructions?: string
  paymentMethod: PaymentMethod
}

export interface Transaction {
  id: string
  userId: string
  type: TransactionType
  /** Positive = credit, negative = debit */
  amount: number
  description: string
  status: 'completed' | 'pending'
  createdAt: string
}

export interface Ticket {
  id: string
  userId: string
  subject: string
  category: string
  message: string
  status: 'open' | 'answered'
  createdAt: string
}

export interface CheckoutPreset {
  platformId?: PlatformId
  serviceId?: string
  packageId?: string
}

/** Everything the demo app persists locally */
export interface AppData {
  user: User | null
  orders: Order[]
  transactions: Transaction[]
  tickets: Ticket[]
  balance: number
  currency: CurrencyCode
}
