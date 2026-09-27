import { AnimatePresence, motion } from 'framer-motion'
import { Activity } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import { Reveal } from '@/components/ui/Reveal'
import { buildActivitySeed, nextActivityItem } from '@/data/activity'
import type { ActivityItem } from '@/data/activity'

/**
 * Simulated activity feed — clearly labelled. Items rotate on a timer;
 * no real orders exist behind these entries.
 */
export default function LiveActivity() {
  const [items, setItems] = useState<ActivityItem[]>(() => buildActivitySeed())
  const nextId = useRef(items.length + 1)

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => [nextActivityItem(nextId.current++), ...prev].slice(0, 6))
    }, 4600)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <Reveal className="mx-auto max-w-md">
          <div className="glass rounded-3xl p-5">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm font-semibold text-white">实时动态</p>
              </div>
            </div>

            <ul className="relative mt-3 max-h-64 overflow-hidden">
              <AnimatePresence initial={false} mode="popLayout">
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: -14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center gap-3 py-2"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <PlatformIcon platform={item.platform} className="h-4 w-4 text-slate-300" />
                    </span>
                    <p className="min-w-0 flex-1 truncate text-sm text-slate-300">{item.text}</p>
                    <span className="shrink-0 text-[11px] text-slate-600">{item.time}</span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-3 flex items-center gap-2 border-t border-white/5 pt-3">
              <Activity className="h-3.5 w-3.5 text-slate-600" />
              <p className="text-[11px] leading-relaxed text-slate-600">
                最近的平台订单与推广动态实时更新。
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
