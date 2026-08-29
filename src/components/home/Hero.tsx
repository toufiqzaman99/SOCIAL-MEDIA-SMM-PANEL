import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { ArrowRightCircle, Eye, TrendingUp, Users, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import { platforms } from '@/data/platforms'
import { cn } from '@/lib/utils'
import type { PlatformId } from '@/types'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

/** Heading (0s) → subtext (0.15s) → CTA (0.30s). */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: EASE },
  }),
}

/** Inline Lucide icons inside the heading: middle-aligned, nudged 2px up. */
const iconInline = 'relative -top-[2px] mx-1 inline-block align-middle'

/** Deterministic pseudo-random dots for the local particle layer (existing palette only). */
const particles = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 5) % 100}%`,
  top: `${(i * 53 + 13) % 92}%`,
  size: 2 + ((i * 7) % 3),
  delay: (i % 7) * 0.8,
  duration: 7 + ((i * 3) % 5),
  violet: i % 3 !== 0,
}))

const floatingChips = [
  {
    icon: Users,
    label: '+12,450 Followers',
    position: 'right-[8%] top-[30%]',
    delay: 0.7,
    tint: 'bg-fuchsia-500/15 text-fuchsia-300',
  },
  {
    icon: Eye,
    label: '+245K Views',
    position: 'right-[15%] top-[55%]',
    delay: 1.1,
    tint: 'bg-sky-500/15 text-sky-300',
  },
]

/** Social platform icons drifting on the right side of the hero (desktop). */
const floatingPlatforms: Array<{ platform: PlatformId; position: string; delay: number }> = [
  { platform: 'instagram', position: 'right-[3%] top-[13%]', delay: 0 },
  { platform: 'facebook', position: 'right-[30%] top-[14%]', delay: 0.4 },
  { platform: 'tiktok', position: 'right-[24%] top-[37%]', delay: 0.8 },
  { platform: 'twitter', position: 'right-[2%] top-[42%]', delay: 1.2 },
  { platform: 'youtube', position: 'right-[6%] top-[68%]', delay: 1.6 },
  { platform: 'telegram', position: 'right-[28%] top-[60%]', delay: 2.0 },
]

export default function Hero() {
  const navigate = useNavigate()
  const videoRef = useRef<HTMLVideoElement>(null)

  // React does not always apply the muted attribute on initial render —
  // set it programmatically so the background video is allowed to autoplay.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background video, blended into the existing dark theme */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />

      {/* Overlays: dark translucent + directional for text legibility + bottom fade into the page background */}
      <div aria-hidden className="absolute inset-0 bg-ink-950/55" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/35 to-ink-950/15" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-ink-950" />

      {/* Soft glows in the existing accent palette */}
      <div aria-hidden className="absolute -left-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-violet-600/25 blur-[120px]" />
      <div aria-hidden className="absolute -right-24 top-[12%] h-[24rem] w-[24rem] rounded-full bg-fuchsia-600/15 blur-[110px]" />

      {/* Subtle floating particles */}
      <div aria-hidden className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className={cn('absolute rounded-full', p.violet ? 'bg-violet-300' : 'bg-cyan-300')}
            style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Floating social platform icons (desktop) */}
      {floatingPlatforms.map(({ platform, position, delay }) => {
        const meta = platforms.find((p) => p.id === platform)
        if (!meta) return null
        return (
          <motion.div
            key={platform}
            initial={{ opacity: 0, y: 24, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 + delay * 0.35, ease: EASE }}
            className={cn('absolute z-[5] hidden lg:block', position)}
          >
            <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
              <span
                className={cn(
                  'grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-card transition-transform duration-300 hover:scale-110',
                  meta.gradient,
                  meta.glow,
                )}
              >
                <PlatformIcon platform={platform} className="h-5 w-5" />
              </span>
            </div>
          </motion.div>
        )
      })}

      {/* Floating glass chips (desktop) */}
      {floatingChips.map((chip) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 + chip.delay * 0.4, ease: EASE }}
          className={cn('absolute z-10 hidden lg:block', chip.position)}
        >
          <div className="glass-strong animate-float flex items-center gap-3 rounded-2xl bg-ink-800/70 px-4 py-3 shadow-card" style={{ animationDelay: `${chip.delay}s` }}>
            <span className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', chip.tint)}>
              <chip.icon className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium text-white">{chip.label}</p>
          </div>
        </motion.div>
      ))}

      {/* Hero content */}
      <div className="container-x relative z-10" style={{ paddingTop: 'clamp(40px, 8vw, 100px)' }}>
        <div style={{ maxWidth: 560 }}>
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.05,
              letterSpacing: '-0.01em',
              color: '#ffffff',
            }}
          >
            <Zap size={24} className={iconInline} /> Grow Your Social Presence.
            <br />
            <TrendingUp size={24} className={iconInline} /> Build Your Audience.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="mt-6 text-slate-400"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              lineHeight: 1.65,
              opacity: 0.8,
              maxWidth: 560,
            }}
          >
            Professional social media growth and marketing services designed to help creators, brands, and
            businesses expand their online presence.
          </motion.p>

          <motion.button
            type="button"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            whileHover={{ scale: 1.04, filter: 'brightness(1.08)' }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/services')}
            className="bg-brand-gradient flex items-center justify-between text-white shadow-glow-sm transition-shadow hover:shadow-glow"
            style={{
              padding: '17px 24px',
              borderRadius: 50,
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              minWidth: 210,
              gap: 32,
              marginTop: 40,
            }}
          >
            Explore Services
            <ArrowRightCircle size={20} />
          </motion.button>

          {/* Platform icons — compact row on mobile/tablet (desktop uses the floating tiles) */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-10 lg:hidden"
          >
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Grow across every platform
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              {platforms.map((p) => (
                <span
                  key={p.id}
                  className={cn(
                    'grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br text-white shadow-card',
                    p.gradient,
                    p.glow,
                  )}
                >
                  <PlatformIcon platform={p.id} className="h-5 w-5" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
