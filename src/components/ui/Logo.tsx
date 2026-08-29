import { Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '@/lib/utils'

export default function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" aria-label="Boostly home" className={cn('flex items-center gap-2.5', className)}>
      <span className="bg-brand-gradient grid h-9 w-9 place-items-center rounded-xl shadow-glow-sm">
        <Zap className="h-5 w-5 text-white" fill="currentColor" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        BOOST
        <span className="text-gradient">LY</span>
      </span>
    </Link>
  )
}
