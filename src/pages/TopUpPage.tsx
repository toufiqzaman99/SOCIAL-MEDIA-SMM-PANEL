import { Coins, Info, Plus, Wallet } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import PageHeader from '@/components/ui/PageHeader'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { topUpPackages } from '@/data/topup'
import type { TopUpPackage } from '@/data/topup'
import { useApp } from '@/store/AppContext'
import { useToast } from '@/store/ToastContext'
import { formatNumber } from '@/lib/utils'

export default function TopUpPage() {
  const { state, addFunds, format } = useApp()
  const { push } = useToast()
  const [selected, setSelected] = useState<TopUpPackage | null>(null)
  const [adding, setAdding] = useState(false)

  const handleConfirm = async () => {
    if (!selected) return
    setAdding(true)
    try {
      await addFunds(selected.amount, selected.bonus)
      push({
        title: 'Top-up completed (demo)',
        description: `${format(selected.amount)}${
          selected.bonus ? ` + ${format(selected.bonus)} bonus` : ''
        } credited to your wallet. No real payment was processed.`,
        type: 'success',
      })
      setSelected(null)
    } finally {
      setAdding(false)
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Wallet"
        title={
          <>
            Top Up Your <span className="text-gradient">Balance</span>
          </>
        }
        subtitle="Add funds to your wallet and use them to purchase any growth service. Funds are deducted automatically at checkout."
      />

      <section className="pb-24">
        <div className="container-x">
          {/* Current balance */}
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-violet-400/30 p-6 sm:p-8">
            <div aria-hidden className="bg-brand-gradient absolute inset-0 opacity-90" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
            <div className="relative flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <p className="flex items-center justify-center gap-2 text-sm font-medium text-white/80 sm:justify-start">
                  <Wallet className="h-4 w-4" /> Current balance
                </p>
                <p className="mt-1 font-display text-4xl font-bold tracking-tight text-white">
                  {format(state.balance)}
                </p>
              </div>
              <p className="max-w-xs text-center text-xs leading-relaxed text-white/70 sm:text-right">
                Demo wallet — switch currency from the navbar. Funds are used automatically when you place an
                order.
              </p>
            </div>
          </div>

          {/* Top-up packages */}
          <StaggerGroup className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {topUpPackages.map((pkg) => (
              <StaggerItem key={pkg.id} className="h-full">
                <div className="glass group flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-glow-sm">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl bg-violet-500/10 text-violet-300 transition-transform duration-300 group-hover:scale-110">
                      <Coins className="h-5 w-5" />
                    </span>
                    {pkg.bonus > 0 ? (
                      <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                        +{format(pkg.bonus)} bonus
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-4 font-display text-lg font-semibold text-white">{pkg.label}</h3>
                  <p className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
                    {format(pkg.amount)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {formatNumber(pkg.amount)} wallet credits
                    {pkg.bonus > 0 ? ` + ${formatNumber(pkg.bonus)} bonus` : ''}
                  </p>
                  <Button
                    variant="outline"
                    fullWidth
                    className="mt-6"
                    icon={Plus}
                    onClick={() => setSelected(pkg)}
                  >
                    Add Funds
                  </Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <p className="mt-8 text-center text-xs text-slate-600">
            Demo top-up — payment gateway not connected. No real payment is processed.
          </p>
        </div>
      </section>

      {/* Confirm modal */}
      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title="Confirm top-up"
        description="Add funds to your demo wallet"
      >
        {selected ? (
          <div className="space-y-5">
            <div className="flex items-start gap-2.5 rounded-2xl border border-amber-400/25 bg-amber-400/10 p-3.5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <p className="text-xs leading-relaxed text-amber-200">
                Demo top-up — no real payment is processed. Funds only work inside this demo.
              </p>
            </div>

            <div className="space-y-2.5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Package</span>
                <span className="font-medium text-white">{selected.label}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Amount</span>
                <span className="font-medium text-white">{format(selected.amount)}</span>
              </div>
              {selected.bonus > 0 ? (
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Bonus</span>
                  <span className="font-medium text-emerald-300">+{format(selected.bonus)}</span>
                </div>
              ) : null}
              <div className="flex justify-between gap-4 border-t border-white/10 pt-2.5">
                <span className="font-semibold text-white">Total credited</span>
                <span className="font-display text-lg font-bold text-white">
                  {format(selected.amount + selected.bonus)}
                </span>
              </div>
            </div>

            <Button fullWidth size="lg" loading={adding} onClick={handleConfirm}>
              Top Up — Demo
            </Button>
          </div>
        ) : null}
      </Modal>
    </>
  )
}
