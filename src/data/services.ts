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
      name: 'Instagram 粉丝',
      icon: 'followers',
      description: '扩大粉丝基础、提升主页曝光度的增长推广。',
      deliveryEstimate: '1–24 小时内开始',
      popular: true,
      flagship: true,
    },
    [
      { label: '入门', quantity: 1000, price: 55, deliveryEstimate: '24 小时内开始' },
      { label: '增强', quantity: 3000, price: 150, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 5000, price: 200, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 10000, price: 350, deliveryEstimate: '6 小时内开始' },
      { label: '尊享', quantity: 20000, price: 600, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 50000, price: 1500, deliveryEstimate: '优先 — 1 小时内开始' },
      { label: '旗舰', quantity: 100000, price: 2900, deliveryEstimate: '优先 — 1 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'instagram-likes',
      platform: 'instagram',
      name: 'Instagram 点赞',
      icon: 'likes',
      description: '通过点赞推广提升帖子的互动数据。',
      deliveryEstimate: '1–12 小时内开始',
      popular: true,
    },
    [
      { label: '入门', quantity: 1000, price: 5, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 5000, price: 25, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 10000, price: 50, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 50000, price: 150, deliveryEstimate: '2 小时内开始' },
      { label: '旗舰', quantity: 100000, price: 300, deliveryEstimate: '2 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'instagram-views',
      platform: 'instagram',
      name: 'Instagram 视频播放量',
      icon: 'views',
      description: '通过播放量增长推广提升视频触达。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 15, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 5000, price: 45, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 10000, price: 80, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 50000, price: 350, deliveryEstimate: '2 小时内开始' },
      { label: '旗舰', quantity: 100000, price: 600, deliveryEstimate: '2 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'instagram-comments',
      platform: 'instagram',
      name: 'Instagram 评论',
      icon: 'comments',
      description: '通过定向评论推广为帖子增加社交证明。',
      deliveryEstimate: '1–24 小时内开始',
    },
    [
      { label: '入门', quantity: 50, price: 39, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 250, price: 157, deliveryEstimate: '18 小时内开始' },
      { label: '专业', quantity: 1000, price: 510, deliveryEstimate: '12 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'instagram-story-views',
      platform: 'instagram',
      name: 'Instagram 快拍浏览',
      icon: 'storyViews',
      description: '通过快拍浏览推广提升快拍触达与主页访问。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 23, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 141, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 50000, price: 471, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'instagram-reels-views',
      platform: 'instagram',
      name: 'Instagram Reels 播放量',
      icon: 'reelsViews',
      description: '通过 Reels 浏览推广提升视频曝光与发现。',
      deliveryEstimate: '1–12 小时内开始',
      popular: true,
    },
    [
      { label: '入门', quantity: 1000, price: 27, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 180, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 50000, price: 628, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'instagram-engagement',
      platform: 'instagram',
      name: '互动套餐',
      icon: 'engagement',
      description: '点赞 + 播放量组合推广，实现均衡的互动增长。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 47, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 5000, price: 196, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 20000, price: 628, deliveryEstimate: '4 小时内开始' },
    ],
  ),

  makeService(
    {
      id: 'instagram-live-views',
      platform: 'instagram',
      name: 'Instagram 直播观看',
      icon: 'liveViews',
      description: '直播过程中提升在线观众人数的增长推广。',
      deliveryEstimate: '直播开始后 5–10 分钟内启动',
    },
    [
      { label: '入门', quantity: 500, price: 27, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
      { label: '进阶', quantity: 2500, price: 102, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
      { label: '专业', quantity: 10000, price: 314, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
    ],
  ),

  // ─── TIKTOK ──────────────────────────────────────────────────────────
  makeService(
    {
      id: 'tiktok-followers',
      platform: 'tiktok',
      name: 'TikTok 粉丝',
      icon: 'followers',
      description: '扩大 TikTok 粉丝基础与主页触达的增长推广。',
      deliveryEstimate: '1–24 小时内开始',
      popular: true,
      flagship: true,
    },
    [
      { label: '入门', quantity: 500, price: 39, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 2500, price: 157, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 10000, price: 432, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 50000, price: 1413, deliveryEstimate: '2 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-likes',
      platform: 'tiktok',
      name: 'TikTok 点赞',
      icon: 'likes',
      description: '通过点赞推广提升 TikTok 视频的互动数据。',
      deliveryEstimate: '1–12 小时内开始',
      popular: true,
    },
    [
      { label: '入门', quantity: 500, price: 23, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 2500, price: 94, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 10000, price: 275, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-views',
      platform: 'tiktok',
      name: 'TikTok 播放量',
      icon: 'views',
      description: '通过播放量增长推广提升视频曝光与发现。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 16, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 102, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 100000, price: 628, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-shares',
      platform: 'tiktok',
      name: 'TikTok 分享',
      icon: 'shares',
      description: '通过分享推广提升视频的分发数据。',
      deliveryEstimate: '1–24 小时内开始',
    },
    [
      { label: '入门', quantity: 100, price: 31, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 500, price: 118, deliveryEstimate: '18 小时内开始' },
      { label: '专业', quantity: 2500, price: 432, deliveryEstimate: '12 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'tiktok-engagement',
      platform: 'tiktok',
      name: 'TikTok 互动套餐',
      icon: 'engagement',
      description: '点赞 + 播放量组合套餐，实现均衡的 TikTok 互动增长。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 39, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 5000, price: 157, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 25000, price: 549, deliveryEstimate: '4 小时内开始' },
    ],
  ),

  makeService(
    {
      id: 'tiktok-live-views',
      platform: 'tiktok',
      name: 'TikTok 直播观看',
      icon: 'liveViews',
      description: '直播过程中提升在线观众人数的增长推广。',
      deliveryEstimate: '直播开始后 5–10 分钟内启动',
      popular: true,
    },
    [
      { label: '入门', quantity: 500, price: 23, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
      { label: '进阶', quantity: 2500, price: 94, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
      { label: '专业', quantity: 10000, price: 275, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
    ],
  ),

  // ─── YOUTUBE ─────────────────────────────────────────────────────────
  makeService(
    {
      id: 'youtube-subscribers',
      platform: 'youtube',
      name: 'YouTube 订阅',
      icon: 'subscribers',
      description: '频道增长推广，逐步扩大您的订阅用户基础。',
      deliveryEstimate: '1–24 小时内开始',
      popular: true,
      flagship: true,
    },
    [
      { label: '入门', quantity: 100, price: 78, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 500, price: 275, deliveryEstimate: '18 小时内开始' },
      { label: '专业', quantity: 2000, price: 942, deliveryEstimate: '12 小时内开始' },
      { label: '至尊', quantity: 10000, price: 3532, deliveryEstimate: '6 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'youtube-views',
      platform: 'youtube',
      name: 'YouTube 播放量',
      icon: 'views',
      description: '通过播放量增长推广提升视频触达与观看时长。',
      deliveryEstimate: '1–12 小时内开始',
      popular: true,
    },
    [
      { label: '入门', quantity: 1000, price: 39, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 275, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 50000, price: 1020, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'youtube-likes',
      platform: 'youtube',
      name: 'YouTube 点赞',
      icon: 'likes',
      description: '通过点赞推广提升视频的互动数据。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 250, price: 47, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 1000, price: 157, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 5000, price: 589, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'youtube-comments',
      platform: 'youtube',
      name: 'YouTube 评论',
      icon: 'comments',
      description: '通过定向评论推广为视频增加社交证明。',
      deliveryEstimate: '1–24 小时内开始',
    },
    [
      { label: '入门', quantity: 50, price: 78, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 250, price: 314, deliveryEstimate: '18 小时内开始' },
      { label: '专业', quantity: 1000, price: 1020, deliveryEstimate: '12 小时内开始' },
    ],
  ),

  makeService(
    {
      id: 'youtube-live-views',
      platform: 'youtube',
      name: 'YouTube 直播观看',
      icon: 'liveViews',
      description: '直播过程中提升在线观众人数的增长推广。',
      deliveryEstimate: '直播开始后 5–10 分钟内启动',
      popular: true,
    },
    [
      { label: '入门', quantity: 100, price: 39, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
      { label: '进阶', quantity: 500, price: 157, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
      { label: '专业', quantity: 1000, price: 275, deliveryEstimate: '直播开始后 5–10 分钟内启动' },
    ],
  ),

  // ─── FACEBOOK ────────────────────────────────────────────────────────
  makeService(
    {
      id: 'facebook-page-followers',
      platform: 'facebook',
      name: 'Facebook 主页粉丝',
      icon: 'followers',
      description: '扩大主页受众与触达的增长推广。',
      deliveryEstimate: '1–24 小时内开始',
      popular: true,
      flagship: true,
    },
    [
      { label: '入门', quantity: 250, price: 39, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 1000, price: 118, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 5000, price: 392, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 25000, price: 1491, deliveryEstimate: '2 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'facebook-post-likes',
      platform: 'facebook',
      name: 'Facebook 帖子点赞',
      icon: 'postLikes',
      description: '通过点赞推广提升主页帖子的互动数据。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 250, price: 31, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 1000, price: 102, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 5000, price: 353, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'facebook-video-views',
      platform: 'facebook',
      name: 'Facebook 视频播放量',
      icon: 'videoViews',
      description: '通过播放量增长推广提升主页视频触达。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 23, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 141, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 50000, price: 510, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'facebook-engagement',
      platform: 'facebook',
      name: 'Facebook 互动套餐',
      icon: 'engagement',
      description: '点赞 + 播放量组合套餐，实现均衡的主页互动增长。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 47, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 5000, price: 180, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 20000, price: 549, deliveryEstimate: '4 小时内开始' },
    ],
  ),

  // ─── X / TWITTER ─────────────────────────────────────────────────────
  makeService(
    {
      id: 'twitter-followers',
      platform: 'twitter',
      name: 'X / Twitter 粉丝',
      icon: 'followers',
      description: '扩大 X 平台受众与帖子触达的增长推广。',
      deliveryEstimate: '1–24 小时内开始',
      popular: true,
      flagship: true,
    },
    [
      { label: '入门', quantity: 500, price: 31, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 2500, price: 118, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 10000, price: 353, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 50000, price: 1177, deliveryEstimate: '2 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'twitter-likes',
      platform: 'twitter',
      name: 'X / Twitter 点赞',
      icon: 'likes',
      description: '通过点赞推广提升帖子的互动数据。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 250, price: 23, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 1000, price: 78, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 5000, price: 275, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'twitter-views',
      platform: 'twitter',
      name: 'X / Twitter 播放量',
      icon: 'views',
      description: '通过播放量增长推广提升帖子曝光。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 20, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 133, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 50000, price: 471, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'twitter-engagement',
      platform: 'twitter',
      name: 'X / Twitter 互动套餐',
      icon: 'engagement',
      description: '点赞 + 播放量组合套餐，实现均衡的互动增长。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 39, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 5000, price: 157, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 20000, price: 471, deliveryEstimate: '4 小时内开始' },
    ],
  ),

  // ─── TELEGRAM ────────────────────────────────────────────────────────
  makeService(
    {
      id: 'telegram-members',
      platform: 'telegram',
      name: 'Telegram 频道成员',
      icon: 'members',
      description: '增长推广，通过新成员壮大您的频道社区。',
      deliveryEstimate: '1–24 小时内开始',
      popular: true,
      flagship: true,
    },
    [
      { label: '入门', quantity: 250, price: 23, deliveryEstimate: '24 小时内开始' },
      { label: '进阶', quantity: 1000, price: 78, deliveryEstimate: '12 小时内开始' },
      { label: '专业', quantity: 5000, price: 275, deliveryEstimate: '6 小时内开始' },
      { label: '至尊', quantity: 25000, price: 1020, deliveryEstimate: '2 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'telegram-post-views',
      platform: 'telegram',
      name: 'Telegram 帖子浏览',
      icon: 'postViews',
      description: '通过浏览推广提升频道帖子的曝光。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 1000, price: 16, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 10000, price: 102, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 50000, price: 353, deliveryEstimate: '4 小时内开始' },
    ],
  ),
  makeService(
    {
      id: 'telegram-reactions',
      platform: 'telegram',
      name: 'Telegram 回应',
      icon: 'reactions',
      description: '通过回应推广提升帖子的互动数据。',
      deliveryEstimate: '1–12 小时内开始',
    },
    [
      { label: '入门', quantity: 250, price: 20, deliveryEstimate: '12 小时内开始' },
      { label: '进阶', quantity: 1000, price: 63, deliveryEstimate: '8 小时内开始' },
      { label: '专业', quantity: 5000, price: 235, deliveryEstimate: '4 小时内开始' },
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
