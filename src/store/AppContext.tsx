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
import { addFunds as apiAddFunds } from '@/api/wallet'
import { loadAppData, saveAppData } from '@/api/storage'
import { formatNumber, uid } from '@/lib/utils'
import type {
  AppData,
  CreateOrderInput,
  Order,
  ServiceStatus,
  Ticket,
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
  | { type: 'TICKET_ADD'; ticket: Ticket }
  | { type: 'TRANSACTION_ADD'; transaction: Transaction; balance: number }
  | { type: 'PROFILE_UPDATE'; patch: { name?: string; email?: string } }

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
    case 'TICKET_ADD':
      return { ...state, tickets: [action.ticket, ...state.tickets] }
    case 'TRANSACTION_ADD':
      return { ...state, transactions: [action.transaction, ...state.transactions], balance: action.balance }
    case 'PROFILE_UPDATE':
      return { ...state, user: state.user ? { ...state.user, ...action.patch } : state.user }
  }
}

export interface AppContextValue {
  state: AppData
  login(email: string, password: string): Promise<User>
  register(name: string, email: string, password: string): Promise<User>
  logout(): Promise<void>
  placeOrder(input: CreateOrderInput): Promise<Order>
  cancelOrder(orderId: string): Promise<void>
  addFunds(amount: number): Promise<void>
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

  const addFunds = useCallback(async (amount: number) => {
    await apiAddFunds(amount)
    const transaction: Transaction = {
      id: uid('TXN'),
      userId: stateRef.current.user?.id ?? 'guest',
      type: 'deposit',
      amount,
      description: 'Wallet top-up (demo)',
      status: 'completed',
      createdAt: new Date().toISOString(),
    }
    dispatch({ type: 'TRANSACTION_ADD', transaction, balance: stateRef.current.balance + amount })
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

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      login,
      register,
      logout,
      placeOrder,
      cancelOrder,
      addFunds,
      createTicket,
      updateProfile,
    }),
    [state, login, register, logout, placeOrder, cancelOrder, addFunds, createTicket, updateProfile],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within an AppProvider')
  return ctx
}
