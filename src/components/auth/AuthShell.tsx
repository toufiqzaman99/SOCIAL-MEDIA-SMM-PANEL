import { motion } from 'framer-motion'
import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

import Logo from '@/components/ui/Logo'

export interface AuthShellProps {
  title: string
  subtitle: string
  demoNote?: string
  children: ReactNode
}

/** Shared centered auth card used by the login and register pages. */
export default function AuthShell({ title, subtitle, demoNote, children }: AuthShellProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 pb-16 pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="glass-strong w-full max-w-md rounded-3xl p-6 shadow-card sm:p-8"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="mt-6 text-center">
          <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
          <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        </div>

        {demoNote ? (
          <div className="mt-5 flex items-start gap-2.5 rounded-2xl border border-sky-400/25 bg-sky-400/10 p-3.5">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
            <p className="text-xs leading-relaxed text-sky-200">{demoNote}</p>
          </div>
        ) : null}

        <div className="mt-6">{children}</div>
      </motion.div>
    </section>
  )
}

/** Google "G" glyph for the visual-only sign-in button. */
export function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}
