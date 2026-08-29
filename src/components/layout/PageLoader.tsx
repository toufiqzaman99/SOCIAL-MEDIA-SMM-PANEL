import { Loader2 } from 'lucide-react'

/** Suspense fallback for lazy-loaded pages. */
export default function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-violet-400" />
    </div>
  )
}
