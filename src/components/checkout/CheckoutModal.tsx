import Modal from '@/components/ui/Modal'
import OrderForm from '@/components/checkout/OrderForm'
import type { CheckoutPreset } from '@/types'

export interface CheckoutModalProps {
  open: boolean
  preset?: CheckoutPreset
  onClose: () => void
}

export default function CheckoutModal({ open, preset, onClose }: CheckoutModalProps) {
  return (
    <Modal open={open} onClose={onClose} size="full">
      {/* Rendered only while open so the form starts fresh each time */}
      {open ? <OrderForm preset={preset} variant="modal" onClose={onClose} /> : null}
    </Modal>
  )
}
