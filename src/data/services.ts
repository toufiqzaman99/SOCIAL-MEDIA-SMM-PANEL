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
 * Service catalog.
 *
 * All items are marketing / growth services: campaigns are delivered
 * gradually, estimates are shown at checkout, and results are never
 * guaranteed. No account credentials are ever required — only a public
 * profile or page URL.
 */
export const services: Service[] = [
  // ─── INSTAGRAM ──────────────────────────────────────────────────────
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
      { label: 'Starter', quantity: 1000, price: 9.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 5000, price: 34.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 59.99, deliveryEstimate: 'Begins within 6 hours', bestValue: true },
      { label: 'Max', quantity: 50000, price: 199.99, deliveryEstimate: 'Begins within 2 hours' },
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
      { label: 'Starter', quantity: 500, price: 3.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 2500, price: 14.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 10000, price: 44.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 2.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 19.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 69.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 50, price: 4.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 250, price: 19.99, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 1000, price: 64.99, deliveryEstimate: 'Begins within 12 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 2.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 17.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 59.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 3.49, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 22.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 79.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 5.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 24.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 20000, price: 79.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 500, price: 4.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 2500, price: 19.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 54.99, deliveryEstimate: 'Begins within 6 hours', bestValue: true },
      { label: 'Max', quantity: 50000, price: 179.99, deliveryEstimate: 'Begins within 2 hours' },
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
      { label: 'Starter', quantity: 500, price: 2.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 2500, price: 11.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 10000, price: 34.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 1.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 12.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 100000, price: 79.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 100, price: 3.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 500, price: 14.99, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 2500, price: 54.99, deliveryEstimate: 'Begins within 12 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 4.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 19.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 25000, price: 69.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 100, price: 9.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 500, price: 34.99, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 2000, price: 119.99, deliveryEstimate: 'Begins within 12 hours', bestValue: true },
      { label: 'Max', quantity: 10000, price: 449.99, deliveryEstimate: 'Begins within 6 hours' },
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
      { label: 'Starter', quantity: 1000, price: 4.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 34.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 129.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 250, price: 5.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 19.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 74.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 50, price: 9.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 250, price: 39.99, deliveryEstimate: 'Begins within 18 hours' },
      { label: 'Pro', quantity: 1000, price: 129.99, deliveryEstimate: 'Begins within 12 hours', bestValue: true },
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
      { label: 'Starter', quantity: 250, price: 4.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 1000, price: 14.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 5000, price: 49.99, deliveryEstimate: 'Begins within 6 hours', bestValue: true },
      { label: 'Max', quantity: 25000, price: 189.99, deliveryEstimate: 'Begins within 2 hours' },
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
      { label: 'Starter', quantity: 250, price: 3.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 12.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 44.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 2.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 17.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 64.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 5.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 22.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 20000, price: 69.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 500, price: 3.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 2500, price: 14.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 10000, price: 44.99, deliveryEstimate: 'Begins within 6 hours', bestValue: true },
      { label: 'Max', quantity: 50000, price: 149.99, deliveryEstimate: 'Begins within 2 hours' },
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
      { label: 'Starter', quantity: 250, price: 2.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 9.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 34.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 2.49, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 16.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 59.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 1000, price: 4.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 5000, price: 19.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 20000, price: 59.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 250, price: 2.99, deliveryEstimate: 'Begins within 24 hours' },
      { label: 'Growth', quantity: 1000, price: 9.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Pro', quantity: 5000, price: 34.99, deliveryEstimate: 'Begins within 6 hours', bestValue: true },
      { label: 'Max', quantity: 25000, price: 129.99, deliveryEstimate: 'Begins within 2 hours' },
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
      { label: 'Starter', quantity: 1000, price: 1.99, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 10000, price: 12.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 50000, price: 44.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
      { label: 'Starter', quantity: 250, price: 2.49, deliveryEstimate: 'Begins within 12 hours' },
      { label: 'Growth', quantity: 1000, price: 7.99, deliveryEstimate: 'Begins within 8 hours' },
      { label: 'Pro', quantity: 5000, price: 29.99, deliveryEstimate: 'Begins within 4 hours', bestValue: true },
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
