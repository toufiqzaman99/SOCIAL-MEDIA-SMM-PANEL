import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'

export default function CtaBanner() {
  const navigate = useNavigate()

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-16 text-center sm:px-12">
            <div aria-hidden className="bg-brand-gradient absolute inset-0 opacity-90" />
            <div aria-hidden className="bg-grid absolute inset-0 opacity-40" />
            <div aria-hidden className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-white/20 blur-[100px]" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to grow your presence?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
                Browse the catalog, place your first order and track your campaign — all from one dashboard.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  variant="secondary"
                  iconRight={ArrowRight}
                  onClick={() => navigate('/pricing')}
                  className="border-white/30 bg-white text-ink-900 hover:bg-white/90"
                >
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/contact')} className="border-white/40 text-white hover:bg-white/10">
                  Talk to Support
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
