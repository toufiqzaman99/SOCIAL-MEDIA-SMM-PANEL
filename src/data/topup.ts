/** 钱包充值套餐 — 金额以 HKD（基础货币）存储。 */
export interface TopUpPackage {
  id: string
  label: string
  amount: number
  bonus: number
}

export const topUpPackages: TopUpPackage[] = [
  { id: 'topup-starter', label: '入门', amount: 100, bonus: 5 },
  { id: 'topup-growth', label: '进阶', amount: 300, bonus: 20 },
  { id: 'topup-pro', label: '专业', amount: 500, bonus: 50 },
  { id: 'topup-max', label: '至尊', amount: 1000, bonus: 150 },
]
