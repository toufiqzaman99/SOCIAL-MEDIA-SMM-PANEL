import type { PlatformId, Service, ServicePackage } from '@/types'

type PackageSeed = Omit<ServicePackage, 'id'>
type ServiceSeed = Omit<Service, 'packages'>

function makeService(seed: ServiceSeed, packages: PackageSeed[]): Service {
  return {
    ...seed,
    packages: packages.map((p, i) => ({ ...p, id: `${seed.id}-p${i + 1}` })),
  }
}

/**
 * Service catalog. All prices are stored in HKD (the base currency of the
 * price list) and displayed in the user's chosen currency.
 *
 * All items are marketing / growth services: campaigns are delivered
 * gradually, estimates are shown at checkout, and results are never
 * guaranteed. No account credentials are ever required — only a public
 * profile or page URL.
 */
export const services: Service[] = [
  // ─── INSTAGRAM ──────────────────────────────────────────────────────
  // Followers / Likes / Views tiers match the official price list.
  makeService(
    {
      id: 'instagram-followers',
      platform: 'instagram',
      name: 'Instagram Followers',
      icon: 'followers',
      description: 'Growth campaign to expand your follower base and increase profile visibility.',
      deliveryEstimate: 'Begins within 1–24 hours',
      popular: true,
      flagship: true,
    },
    [
      { label: 'Starter', quantity: 1000, price: 55, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Plus', quantity: 3000, price: 150, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 5000, price: 200, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 350, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Premium', quantity: 20000, price: 600, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 50000, price: 1500, deliveryEstimate: 'Priority — begins within 1 hour' },
      { label: 'Ultra', quantity: 100000, price: 2900, deliveryEstimate: 'Priority — begins within 1 hour' },
    ],
  ),
  makeService(
    {
      id: 'instagram-likes',
      platform: 'instagram',
      name: 'Instagram Likes',
      icon: 'likes',
      description: 'Boost engagement signals on your posts with a likes campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
      popular: true,
    },
    [
      { label: 'Starter', quantity: 1000, price: 5, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 5000, price: 25, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 50, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 50000, price: 150, deliveryEstimate: 'Begins within 2 hours' },
      { label: 'Ultra', quantity: 100000, price: 300, deliveryEstimate: 'Begins within 2 hours' },
    ],
  ),
  makeService(
    {
      id: 'instagram-views',
      platform: 'instagram',
      name: 'Instagram Video Views',
      icon: 'views',
      description: 'Increase video reach with a views growth campaign for your posts.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 15, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 5000, price: 45, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 80, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 50000, price: 350, deliveryEstimate: 'Begins within 2 hours' },
      { label: 'Ultra', quantity: 100000, price: 600, deliveryEstimate: 'Begins within 2 hours' },
    ],
  ),
  makeService(
    {
      id: 'instagram-comments',
      platform: 'instagram',
      name: 'Instagram Comments',
      icon: 'comments',
      description: 'Add social proof to your posts with a targeted comments campaign.',
      deliveryEstimate: 'Begins within 1–24 hours',
    },
    [
      { label: 'Starter', quantity: 50, price: 39, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 250, price: 157, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 1000, price: 510, deliveryEstimate: 'Begins within 12 hours' },
    ],
  ),
  makeService(
    {
      id: 'instagram-story-views',
      platform: 'instagram',
      name: 'Instagram Story Views',
      icon: 'storyViews',
      description: 'Grow story reach and profile visits with a story views campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 23, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 141, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 471, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'instagram-reels-views',
      platform: 'instagram',
      name: 'Instagram Reels Views',
      icon: 'reelsViews',
      description: 'Boost reels visibility and discovery with a reels views campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
      popular: true,
    },
    [
      { label: 'Starter', quantity: 1000, price: 27, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 180, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 628, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'instagram-engagement',
      platform: 'instagram',
      name: 'Engagement Package',
      icon: 'engagement',
      description: 'Combined likes + views campaign for balanced engagement growth.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 47, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 196, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 20000, price: 628, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),

  // ─── TIKTOK ──────────────────────────────────────────────────────────
  makeService(
    {
      id: 'tiktok-followers',
      platform: 'tiktok',
      name: 'TikTok Followers',
      icon: 'followers',
      description: 'Growth campaign to expand your TikTok follower base and profile reach.',
      deliveryEstimate: 'Begins within 1–24 hours',
      popular: true,
      flagship: true,
    },
    [
      { label: 'Starter', quantity: 500, price: 39, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 2500, price: 157, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 432, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 50000, price: 1413, deliveryEstimate: 'Begins within 2 hours' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-likes',
      platform: 'tiktok',
      name: 'TikTok Likes',
      icon: 'likes',
      description: 'Increase engagement signals on your TikTok videos with a likes campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
      popular: true,
    },
    [
      { label: 'Starter', quantity: 500, price: 23, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 2500, price: 94, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 10000, price: 275, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-views',
      platform: 'tiktok',
      name: 'TikTok Views',
      icon: 'views',
      description: 'Boost video visibility and discovery with a views growth campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 16, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 102, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 100000, price: 628, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-shares',
      platform: 'tiktok',
      name: 'TikTok Shares',
      icon: 'shares',
      description: 'Increase distribution signals on your videos with a shares campaign.',
      deliveryEstimate: 'Begins within 1–24 hours',
    },
    [
      { label: 'Starter', quantity: 100, price: 31, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 500, price: 118, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 2500, price: 432, deliveryEstimate: 'Begins within 12 hours' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-engagement',
      platform: 'tiktok',
      name: 'TikTok Engagement',
      icon: 'engagement',
      description: 'Combined likes + views package for balanced TikTok engagement growth.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 39, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 157, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 25000, price: 549, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),

  // ─── YOUTUBE ─────────────────────────────────────────────────────────
  makeService(
    {
      id: 'youtube-subscribers',
      platform: 'youtube',
      name: 'YouTube Subscribers',
      icon: 'subscribers',
      description: 'Channel growth campaign to expand your subscriber base over time.',
      deliveryEstimate: 'Begins within 1–24 hours',
      popular: true,
      flagship: true,
    },
    [
      { label: 'Starter', quantity: 100, price: 78, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 500, price: 275, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 2000, price: 942, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Max', quantity: 10000, price: 3532, deliveryEstimate: 'Begins within 6 hours' },
    ],
  ),
  makeService(
    {
      id: 'youtube-views',
      platform: 'youtube',
      name: 'YouTube Views',
      icon: 'views',
      description: 'Increase video reach and watch time with a views growth campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
      popular: true,
    },
    [
      { label: 'Starter', quantity: 1000, price: 39, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 275, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 1020, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'youtube-likes',
      platform: 'youtube',
      name: 'YouTube Likes',
      icon: 'likes',
      description: 'Boost engagement signals on your videos with a likes campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 250, price: 47, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 157, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 589, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'youtube-comments',
      platform: 'youtube',
      name: 'YouTube Comments',
      icon: 'comments',
      description: 'Add social proof to your videos with a targeted comments campaign.',
      deliveryEstimate: 'Begins within 1–24 hours',
    },
    [
      { label: 'Starter', quantity: 50, price: 78, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 250, price: 314, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 1000, price: 1020, deliveryEstimate: 'Begins within 12 hours' },
    ],
  ),

  // ─── FACEBOOK ────────────────────────────────────────────────────────
  makeService(
    {
      id: 'facebook-page-followers',
      platform: 'facebook',
      name: 'Facebook Page Followers',
      icon: 'followers',
      description: 'Growth campaign to expand your page audience and reach.',
      deliveryEstimate: 'Begins within 1–24 hours',
      popular: true,
      flagship: true,
    },
    [
      { label: 'Starter', quantity: 250, price: 39, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 1000, price: 118, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 5000, price: 392, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 25000, price: 1491, deliveryEstimate: 'Begins within 2 hours' },
    ],
  ),
  makeService(
    {
      id: 'facebook-post-likes',
      platform: 'facebook',
      name: 'Facebook Post Likes',
      icon: 'postLikes',
      description: 'Boost engagement signals on your page posts with a likes campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 250, price: 31, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 102, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 353, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'facebook-video-views',
      platform: 'facebook',
      name: 'Facebook Video Views',
      icon: 'videoViews',
      description: 'Increase video reach on your page with a views growth campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 23, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 141, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 510, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'facebook-engagement',
      platform: 'facebook',
      name: 'Facebook Engagement',
      icon: 'engagement',
      description: 'Combined likes + views package for balanced page engagement growth.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 47, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 180, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 20000, price: 549, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),

  // ─── X / TWITTER ─────────────────────────────────────────────────────
  makeService(
    {
      id: 'twitter-followers',
      platform: 'twitter',
      name: 'X / Twitter Followers',
      icon: 'followers',
      description: 'Growth campaign to expand your X audience and post reach.',
      deliveryEstimate: 'Begins within 1–24 hours',
      popular: true,
      flagship: true,
    },
    [
      { label: 'Starter', quantity: 500, price: 31, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 2500, price: 118, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 353, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 50000, price: 1177, deliveryEstimate: 'Begins within 2 hours' },
    ],
  ),
  makeService(
    {
      id: 'twitter-likes',
      platform: 'twitter',
      name: 'X / Twitter Likes',
      icon: 'likes',
      description: 'Boost engagement signals on your posts with a likes campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 250, price: 23, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 78, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 275, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'twitter-views',
      platform: 'twitter',
      name: 'X / Twitter Views',
      icon: 'views',
      description: 'Increase post visibility with a views growth campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 20, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 133, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 471, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'twitter-engagement',
      platform: 'twitter',
      name: 'X / Twitter Engagement',
      icon: 'engagement',
      description: 'Combined likes + views package for balanced engagement growth.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 39, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 157, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 20000, price: 471, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),

  // ─── TELEGRAM ────────────────────────────────────────────────────────
  makeService(
    {
      id: 'telegram-members',
      platform: 'telegram',
      name: 'Telegram Channel Members',
      icon: 'members',
      description: 'Growth campaign to expand your channel community with new members.',
      deliveryEstimate: 'Begins within 1–24 hours',
      popular: true,
      flagship: true,
    },
    [
      { label: 'Starter', quantity: 250, price: 23, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 1000, price: 78, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 5000, price: 275, deliveryEstimate: 'Begins within 6 hours' },
      { label: 'Max', quantity: 25000, price: 1020, deliveryEstimate: 'Begins within 2 hours' },
    ],
  ),
  makeService(
    {
      id: 'telegram-post-views',
      platform: 'telegram',
      name: 'Telegram Post Views',
      icon: 'postViews',
      description: 'Increase visibility of your channel posts with a views campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 1000, price: 16, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 102, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 353, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
  makeService(
    {
      id: 'telegram-reactions',
      platform: 'telegram',
      name: 'Telegram Reactions',
      icon: 'reactions',
      description: 'Boost engagement signals on your posts with a reactions campaign.',
      deliveryEstimate: 'Begins within 1–12 hours',
    },
    [
      { label: 'Starter', quantity: 250, price: 20, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 63, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 235, deliveryEstimate: 'Begins within 4 hours' },
    ],
  ),
]

export function getService(id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function servicesForPlatform(platform: PlatformId | 'all'): Service[] {
  if (platform === 'all') return services
  return services.filter((s) => s.platform === platform)
}

export function flagshipFor(platform: PlatformId): Service | undefined {
  return services.find((s) => s.platform === platform && s.flagship)
}

export function popularServices(limit = 8): Service[] {
  return services.filter((s) => s.popular).slice(0, limit)
}
