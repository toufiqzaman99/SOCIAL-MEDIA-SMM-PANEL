import { motion } from 'framer-motion'

/**
 * Fixed ambient background: slow-drifting gradient blobs + faint grid.
 * Purely decorative; pointer-events are disabled. Framer's MotionConfig
 * (reducedMotion="user") disables the drift for users who prefer reduced motion.
 */
export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_25%,transparent_100%)]" />

      <motion.div
        animate={{ x: [0, 90, -50, 0], y: [0, -70, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-44 left-[12%] h-[36rem] w-[36rem] rounded-full bg-violet-600/25 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -70, 60, 0], y: [0, 60, -40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[5%] top-[22%] h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 60, -80, 0], y: [0, -50, 60, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[-10%] left-[30%] h-[32rem] w-[32rem] rounded-full bg-fuchsia-600/15 blur-[130px]"
      />
      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 40, -60, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[30%] top-[55%] h-[24rem] w-[24rem] rounded-full bg-cyan-500/10 blur-[110px]"
      />

      {/* Soften the blobs so content stays readable */}
      <div className="absolute inset-0 bg-ink-950/45" />
    </div>
  )
}
