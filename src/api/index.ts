/**
 * Backend-ready API layer.
 *
 * UI components never import these modules directly — they talk to the app
 * store (src/store), which calls these services. Swapping in a real backend
 * means re-implementing each module against HTTP endpoints; types and UI
 * remain unchanged.
 */
export * as authApi from './auth'
export * as usersApi from './users'
export * as servicesApi from './services'
export * as ordersApi from './orders'
export * as paymentsApi from './payments'
export * as walletApi from './wallet'
export * as transactionsApi from './transactions'
export * as supportApi from './support'
export * as storageApi from './storage'
