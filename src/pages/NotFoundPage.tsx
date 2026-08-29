import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-gradient font-display text-8xl font-bold tracking-tight sm:text-9xl">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
        The page you are looking for does not exist or has moved. Let's get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" iconRight={ArrowRight} onClick={() => navigate('/')}>
          Back to Home
        </Button>
        <Button size="lg" variant="secondary" onClick={() => navigate('/services')}>
          Browse Services
        </Button>
      </div>
    </section>
  )
}
