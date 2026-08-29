import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import CheckoutModal from '@/components/checkout/CheckoutModal'
import type { CheckoutPreset } from '@/types'

interface CheckoutContextValue {
  /** Open the global checkout modal, optionally with a preselected platform/service/package. */
  openCheckout(preset?: CheckoutPreset): void
  closeCheckout(): void
}

const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined)

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const [preset, setPreset] = useState<CheckoutPreset | undefined>(undefined)

  const openCheckout = useCallback((next?: CheckoutPreset) => {
    setPreset(next)
    setOpen(true)
  }, [])

  const closeCheckout = useCallback(() => setOpen(false), [])

  const value = useMemo(() => ({ openCheckout, closeCheckout }), [openCheckout, closeCheckout])

  return (
    <CheckoutContext.Provider value={value}>
      {children}
      <CheckoutModal open={open} preset={preset} onClose={closeCheckout} />
    </CheckoutContext.Provider>
  )
}

export function useCheckout(): CheckoutContextValue {
  const ctx = useContext(CheckoutContext)
  if (!ctx) throw new Error('useCheckout must be used within a CheckoutProvider')
  return ctx
}
