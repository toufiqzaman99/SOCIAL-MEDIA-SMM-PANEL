import type { Platform, PlatformId } from '@/types'

export const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    tagline: '粉丝 · 点赞 · 播放量 · 互动',
    description: '为创作者、品牌和企业打造的 Instagram 粉丝增长与互动套餐。',
    startingAt: 5,
    gradient: 'from-fuchsia-500 to-orange-400',
    glow: 'shadow-[0_0_26px_-6px_rgba(217,70,239,0.55)]',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    tagline: '粉丝 · 点赞 · 播放量 · 分享',
    description: '专为提升 TikTok 内容曝光与互动而设计的营销推广。',
    startingAt: 16,
    gradient: 'from-cyan-400 to-rose-400',
    glow: 'shadow-[0_0_26px_-6px_rgba(34,211,238,0.5)]',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    tagline: '订阅 · 播放量 · 点赞 · 评论',
    description: '频道增长服务，帮助您的视频触达更广泛的观众并积累观看时长。',
    startingAt: 39,
    gradient: 'from-red-500 to-rose-500',
    glow: 'shadow-[0_0_26px_-6px_rgba(239,68,68,0.5)]',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    tagline: '主页粉丝 · 点赞 · 播放量',
    description: '通过粉丝、互动和视频触达推广，助力企业 Facebook 主页增长。',
    startingAt: 23,
    gradient: 'from-blue-500 to-indigo-400',
    glow: 'shadow-[0_0_26px_-6px_rgba(59,130,246,0.5)]',
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    tagline: '粉丝 · 点赞 · 播放量 · 互动',
    description: '通过粉丝增长、互动与帖子浏览推广，扩大您在 X 平台的影响力。',
    startingAt: 20,
    gradient: 'from-zinc-300 to-zinc-500',
    glow: 'shadow-[0_0_26px_-6px_rgba(212,212,216,0.35)]',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    tagline: '成员 · 帖子浏览 · 回应',
    description: '通过成员、帖子浏览与回应推广，壮大您的 Telegram 频道社区。',
    startingAt: 16,
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
