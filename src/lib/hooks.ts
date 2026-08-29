import { useEffect, useState } from 'react'

/** Simulates a short fetch on first mount so skeleton states can be showcased. */
export function useDemoLoading(ms = 600): boolean {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms)
    return () => clearTimeout(t)
  }, [ms])
  return loading
}
