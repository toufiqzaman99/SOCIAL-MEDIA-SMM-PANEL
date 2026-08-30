/** Wallet top-up packages — amounts stored in HKD (base currency). */
export interface TopUpPackage {
  id: string
  label: string
  amount: number
  bonus: number
}

export const topUpPackages: TopUpPackage[] = [
  { id: 'topup-starter', label: 'Starter', amount: 100, bonus: 5 },
  { id: 'topup-growth', label: 'Growth', amount: 300, bonus: 20 },
  { id: 'topup-pro', label: 'Pro', amount: 500, bonus: 50 },
  { id: 'topup-max', label: 'Max', amount: 1000, bonus: 150 },
]
