import type { CurrencyCode } from '@/types'

/**
 * Multi-currency display. All prices are stored in HKD (the base currency of
 * the price list) and converted on display. Rates are static demo values.
 */

export interface Currency {
  code: CurrencyCode
  symbol: string
  name: string
  /** 1 HKD expressed in this currency */
  ratePerHkd: number
  /** Display decimals for whole prices */
  decimals: number
}

export const currencies: Currency[] = [
  { code: 'CNY', symbol: '¥', name: '人民币 (CNY)', ratePerHkd: 0.91, decimals: 0 },
  { code: 'HKD', symbol: 'HK$', name: '港币 (HKD)', ratePerHkd: 1, decimals: 0 },
  { code: 'USD', symbol: '$', name: '美元 (USD)', ratePerHkd: 0.1274, decimals: 2 },
  { code: 'KRW', symbol: '₩', name: '韩元 (KRW)', ratePerHkd: 168.15, decimals: 0 },
]

export function getCurrency(code: CurrencyCode): Currency {
  return currencies.find((c) => c.code === code) ?? currencies[1]
}

export function convertFromHkd(priceHkd: number, code: CurrencyCode): number {
  return priceHkd * getCurrency(code).ratePerHkd
}

export function formatPrice(priceHkd: number, code: CurrencyCode, decimalsOverride?: number): string {
  const c = getCurrency(code)
  const decimals = decimalsOverride ?? c.decimals
  const factor = 10 ** decimals
  const rounded = Math.round(convertFromHkd(priceHkd, code) * factor) / factor
  return `${c.symbol}${rounded.toLocaleString('zh-CN', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

/** Per-unit ("per credit") prices need extra precision, e.g. HK$0.06 / credit. */
export function formatPricePerUnit(priceHkd: number, code: CurrencyCode): string {
  const decimals = code === 'KRW' ? 0 : code === 'USD' ? 3 : 2
  return formatPrice(priceHkd, code, decimals)
}
