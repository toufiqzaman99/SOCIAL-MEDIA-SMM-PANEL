import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react'
import type { ReactNode } from 'react'

import { authService } from '@/api/auth'
import { createOrder as apiCreateOrder } from '@/api/orders'
import { recordPayment } from '@/api/payments'
import { createTicket as apiCreateTicket } from '@/api/support'
import { updateProfile as apiUpdateProfile } from '@/api/users'
import {
  addFunds as apiAddFunds,
  approveTopUpRequest as apiApproveTopUpRequest,
  createTopUpRequest as apiCreateTopUpRequest,
  rejectTopUpRequest as apiRejectTopUpRequest,
} from '@/api/wallet'
import { loadAppData, saveAppData } from '@/api/storage'
import { formatPrice, formatPricePerUnit } from '@/lib/currency'
import { formatNumber, paymentMethodLabels, uid } from '@/lib/utils'
import type {
  AppData,
  CreateOrderInput,
  CurrencyCode,
  Order,
  PaymentMethod,
  ServiceStatus,
  Ticket,
  TopUpRequest,
  TopUpRequestStatus,
  Transaction,
  User,
} from '@/types'

/**
 * Global app store: auth, orders, wallet, transactions and support tickets.
 * Persisted to localStorage in the demo; every write goes through the api
 * layer so a real backend can be connected without touching the UI.
 */

type Action =
  | { type: 'AUTH'; user: User }
  | { type: 'LOGOUT' }
  | { type: 'ORDER_PLACED'; order: Order; transaction: Transaction; balance: number }
  | { type: 'ORDER_STATUS'; orderId: string; status: ServiceStatus }
  | { type: 'ORDER_STATUS_SET'; orderId: string; status: ServiceStatus }
  | { type: 'TICKET_ADD'; ticket: Ticket }
  | { type: 'TRANSACTION_ADD'; transaction: Transaction; balance: number }
  | { type: 'PROFILE_UPDATE'; patch: { name?: string; email?: string } }
  | { type: 'CURRENCY_SET'; code: CurrencyCode }
  | { type: 'TOPUP_REQUEST_ADD'; request: TopUpRequest }
  | { type: 'TOPUP_REQUEST_UPDATE'; id: string; status: TopUpRequestStatus }

function reducer(state: AppData, action: Action): AppData {
  switch (action.type) {
    case 'AUTH':
      return { ...state, user: action.user }
    case 'LOGOUT':
      return { ...state, user: null }
    case 'ORDER_PLACED':
      return {
        ...state,
        orders: [action.order, ...state.orders],
        transactions: [action.transaction, ...state.transactions],
        balance: action.balance,
      }
    case 'ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map((o) => {
          if (o.id !== action.orderId) return o
          // Terminal states stay put — late demo timers must not resurrect cancelled orders.
          if (o.status === 'cancelled' || o.status === 'completed') return o
          return { ...o, status: action.status, updatedAt: new Date().toISOString() }
        }),
      }
    case 'ORDER_STATUS_SET':
      // Admin override — applies any status unconditionally.
      return {
        ...state,
        orders: state.orders.map((o) =>
          o.id === action.orderId ? { ...o, status: action.status, updatedAt: new Date().toISOString() } : o,
        ),
      }
    case 'TICKET_ADD':
      return { ...state, tickets: [action.ticket, ...state.tickets] }
    case 'TRANSACTION_ADD':
      return { ...state, transactions: [action.transaction, ...state.transactions], balance: action.balance }
    case 'PROFILE_UPDATE':
      return { ...state, user: state.user ? { ...state.user, ...action.patch } : state.user }
    case 'CURRENCY_SET':
      return { ...state, currency: action.code }
    case 'TOPUP_REQUEST_ADD':
      return { ...state, topUpRequests: [action.request, ...state.topUpRequests] }
    case 'TOPUP_REQUEST_UPDATE':
      return {
        ...state,
        topUpRequests: state.topUpRequests.map((r) =>
          r.id === action.id ? { ...r, status: action.status, updatedAt: new Date().toISOString() } : r,
        ),
      }
  }
}

export interface AppContextValue {
  state: AppData
  currency: CurrencyCode
  setCurrency(code: CurrencyCode): void
  /** Format an HKD-base price in the active currency, e.g. "HK$55". */
  format(priceHkd: number): string
  /** Per-unit ("per credit") formatting with extra precision. */
  formatPerUnit(priceHkd: number): string
  login(email: string, password: string): Promise<User>
  register(name: string, email: string, password: string): Promise<User>
  logout(): Promise<void>
  placeOrder(input: CreateOrderInput): Promise<Order>
  cancelOrder(orderId: string): Promise<void>
  /** Admin: set any order status unconditionally. */
  setOrderStatus(orderId: string, status: ServiceStatus): Promise<void>
  addFunds(amount: number, bonus?: number, method?: PaymentMethod): Promise<void>
  /** Alipay: create a payment request — balance is NOT credited until an admin approves. */
  submitTopUpRequest(amount: number, bonus: number, method: PaymentMethod): Promise<TopUpRequest>
  approveTopUpRequest(requestId: string): Promise<void>
  rejectTopUpRequest(requestId: string): Promise<void>
  createTicket(input: { subject: string; category: string; message: string }): Promise<Ticket>
  updateProfile(patch: { name?: string; email?: string }): Promise<void>
}

const AppContext = createContext<AppContextValue | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadAppData)
  const stateRef = useRef(state)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    stateRef.current = state
  }, [state])

  useEffect(() => {
    saveAppData(state)
  }, [state])

  // Clean up demo progression timers on unmount.
  useEffect(
    () => () => {
      timersRef.current.forEach(clearTimeout)
    },
    [],
  )

  const login = useCallback(async (email: string, password: string) => {
    const user = await authService.login(email, password)
    dispatch({ type: 'AUTH', user })
    return user
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    const user = await authService.register({ name, email, password })
    dispatch({ type: 'AUTH', user })
    return user
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    dispatch({ type: 'LOGOUT' })
  }, [])

  const placeOrder = useCallback(async (input: CreateOrderInput): Promise<Order> => {
    const order = await apiCreateOrder(input, stateRef.current.user?.id ?? 'guest')
    // Demo payment record — never implies a real payment was processed.
    await recordPayment({ orderId: order.id, method: input.paymentMethod, amount: order.price })
    const transaction: Transaction = {
      id: uid('TXN'),
      userId: order.userId,
      type: 'payment',
      amount: -order.price,
      description: `${order.id} · ${order.serviceName} × ${formatNumber(order.quantity)}`,
      status: 'completed',
      createdAt: new Date().toISOString(),
    }
    const balance = Math.max(0, stateRef.current.balance - order.price)
    dispatch({ type: 'ORDER_PLACED', order, transaction, balance })

    // Simulate the campaign lifecycle so statuses can be showcased (demo only).
    timersRef.current.push(
      setTimeout(() => dispatch({ type: 'ORDER_STATUS', orderId: order.id, status: 'processing' }), 15_000),
    )
    timersRef.current.push(
      setTimeout(() => dispatch({ type: 'ORDER_STATUS', orderId: order.id, status: 'completed' }), 60_000),
    )
    return order
  }, [])

  const cancelOrder = useCallback(async (orderId: string) => {
    // Demo cancellation — a real backend would cancel the campaign server-side.
    dispatch({ type: 'ORDER_STATUS', orderId, status: 'cancelled' })
  }, [])

  const setOrderStatus = useCallback(async (orderId: string, status: ServiceStatus) => {
    dispatch({ type: 'ORDER_STATUS_SET', orderId, status })
  }, [])

  const addFunds = useCallback(async (amount: number, bonus = 0, method?: PaymentMethod) => {
    await apiAddFunds(amount)
    const userId = stateRef.current.user?.id ?? 'guest'
    const now = new Date().toISOString()
    const transaction: Transaction = {
      id: uid('TXN'),
      userId,
      type: 'deposit',
      amount,
      description: method ? `钱包充值 · ${paymentMethodLabels[method]}` : '钱包充值',
      status: 'completed',
      createdAt: now,
    }
    const balance = stateRef.current.balance + amount
    dispatch({ type: 'TRANSACTION_ADD', transaction, balance })
    if (bonus > 0) {
      const bonusTransaction: Transaction = {
        id: uid('TXN'),
        userId,
        type: 'bonus',
        amount: bonus,
        description: '充值赠送',
        status: 'completed',
        createdAt: now,
      }
      dispatch({ type: 'TRANSACTION_ADD', transaction: bonusTransaction, balance: balance + bonus })
    }
  }, [])

  const submitTopUpRequest = useCallback(
    async (amount: number, bonus: number, method: PaymentMethod): Promise<TopUpRequest> => {
      const request = await apiCreateTopUpRequest(
        { amount, bonus, method },
        stateRef.current.user?.id ?? 'guest',
      )
      dispatch({ type: 'TOPUP_REQUEST_ADD', request })
      return request
    },
    [],
  )

  /** Credit a pending top-up request — called from the admin panel (demo). */
  const approveTopUpRequest = useCallback(async (requestId: string) => {
    const request = stateRef.current.topUpRequests.find((r) => r.id === requestId)
    if (!request || request.status !== 'pending') return
    await apiApproveTopUpRequest(requestId)
    dispatch({ type: 'TOPUP_REQUEST_UPDATE', id: requestId, status: 'approved' })

    const userId = request.userId
    const now = new Date().toISOString()
    const deposit: Transaction = {
      id: uid('TXN'),
      userId,
      type: 'deposit',
      amount: request.amount,
      description: `充值已通过 · ${paymentMethodLabels[request.method]}`,
      status: 'completed',
      createdAt: now,
    }
    const balance = stateRef.current.balance + request.amount
    dispatch({ type: 'TRANSACTION_ADD', transaction: deposit, balance })
    if (request.bonus > 0) {
      const bonusTransaction: Transaction = {
        id: uid('TXN'),
        userId,
        type: 'bonus',
        amount: request.bonus,
        description: '充值赠送',
        status: 'completed',
        createdAt: now,
      }
      dispatch({ type: 'TRANSACTION_ADD', transaction: bonusTransaction, balance: balance + request.bonus })
    }
  }, [])

  const rejectTopUpRequest = useCallback(async (requestId: string) => {
    const request = stateRef.current.topUpRequests.find((r) => r.id === requestId)
    if (!request || request.status !== 'pending') return
    await apiRejectTopUpRequest(requestId)
    dispatch({ type: 'TOPUP_REQUEST_UPDATE', id: requestId, status: 'rejected' })
  }, [])

  const createTicket = useCallback(
    async (input: { subject: string; category: string; message: string }) => {
      const ticket = await apiCreateTicket(input, stateRef.current.user?.id ?? 'guest')
      dispatch({ type: 'TICKET_ADD', ticket })
      return ticket
    },
    [],
  )

  const updateProfile = useCallback(async (patch: { name?: string; email?: string }) => {
    if (!stateRef.current.user) return
    const updated = await apiUpdateProfile(stateRef.current.user, patch)
    dispatch({ type: 'PROFILE_UPDATE', patch: { name: updated.name, email: updated.email } })
  }, [])

  const setCurrency = useCallback((code: CurrencyCode) => {
    dispatch({ type: 'CURRENCY_SET', code })
  }, [])

  const format = useCallback(
    (priceHkd: number) => formatPrice(priceHkd, state.currency),
    [state.currency],
  )

  const formatPerUnit = useCallback(
    (priceHkd: number) => formatPricePerUnit(priceHkd, state.currency),
    [state.currency],
  )

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      currency: state.currency,
      setCurrency,
      format,
      formatPerUnit,
      login,
      register,
      logout,
      placeOrder,
      cancelOrder,
      setOrderStatus,
      addFunds,
      submitTopUpRequest,
      approveTopUpRequest,
      rejectTopUpRequest,
      createTicket,
      updateProfile,
    }),
    [
      state,
      setCurrency,
      format,
      formatPerUnit,
      login,
      register,
      logout,
      placeOrder,
      cancelOrder,
      setOrderStatus,
      addFunds,
      submitTopUpRequest,
      approveTopUpRequest,
      rejectTopUpRequest,
      createTicket,
      updateProfile,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
