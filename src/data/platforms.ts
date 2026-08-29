import type { Platform, PlatformId } from '@/types'

export const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: 'Followers · Likes · Views · Engagement',
    description:
      'Growth and engagement packages built for creators, brands and businesses building their presence on Instagram.',
    startingAt: 2.99,
    gradient: 'from-fuchsia-500 to-orange-400',
    glow: 'shadow-[0_0_26px_-6px_rgba(217,70,239,0.55)]',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: 'Followers · Likes · Views · Shares',
    description:
      'Marketing campaigns designed to boost visibility and engagement for your TikTok content.',
    startingAt: 2.99,
    gradient: 'from-cyan-400 to-rose-400',
    glow: 'shadow-[0_0_26px_-6px_rgba(34,211,238,0.5)]',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: 'Subscribers · Views · Likes · Comments',
    description:
      'Channel growth services that help your videos reach a wider audience and build watch time.',
    startingAt: 9.99,
    gradient: 'from-red-500 to-rose-500',
    glow: 'shadow-[0_0_26px_-6px_rgba(239,68,68,0.5)]',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    tagline: 'Page Followers · Likes · Views',
    description:
      'Grow your Facebook page with follower, engagement and video reach campaigns for businesses.',
    startingAt: 4.99,
    gradient: 'from-blue-500 to-indigo-400',
    glow: 'shadow-[0_0_26px_-6px_rgba(59,130,246,0.5)]',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    tagline: 'Followers · Likes · Views · Engagement',
    description:
      'Expand your reach on X with follower growth, engagement and post view campaigns.',
    startingAt: 3.99,
    gradient: 'from-zinc-300 to-zinc-500',
    glow: 'shadow-[0_0_26px_-6px_rgba(212,212,216,0.35)]',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    tagline: 'Members · Post Views · Reactions',
    description:
      'Grow your Telegram channel community with member, post view and reaction campaigns.',
    startingAt: 2.49,
    gradient: 'from-sky-400 to-blue-500',
    glow: 'shadow-[0_0_26px_-6px_rgba(56,189,248,0.5)]',
  },
]

export function isPlatformId(value: string | null | undefined): value is PlatformId {
  return platforms.some((p) => p.id === value)
}

export function platformById(id: PlatformId): Platform | undefined {
  return platforms.find((p) => p.id === id)
}
