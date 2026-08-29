import { initials } from '@/lib/utils'
import { cn } from '@/lib/utils'

export interface AvatarProps {
  name: string
  gradient?: string
  className?: string
}

export default function Avatar({ name, gradient = 'from-violet-500 to-indigo-500', className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br text-xs font-bold text-white ring-2 ring-ink-950',
        gradient,
        className,
      )}
    >
      {initials(name)}
    </span>
  )
}
