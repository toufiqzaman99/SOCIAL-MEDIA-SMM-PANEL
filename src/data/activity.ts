import type { PlatformId } from '@/types'

export interface ActivityItem {
  id: number
  text: string
  time: string
  platform: PlatformId
}

const seedPool: Array<Omit<ActivityItem, 'id'>> = [
  { text: 'Ava 下单 Instagram 粉丝 — 5,000', time: '2分钟前', platform: 'instagram' },
  { text: '新的 TikTok 互动推广已启动', time: '6分钟前', platform: 'tiktok' },
  { text: 'Liam 完成了 YouTube 增长推广', time: '11分钟前', platform: 'youtube' },
  { text: 'Sofia 下单 Telegram 频道成员', time: '18分钟前', platform: 'telegram' },
  { text: '新订单 — Facebook 主页粉丝', time: '24分钟前', platform: 'facebook' },
  { text: 'Emma 完成了 Instagram 互动套餐', time: '31分钟前', platform: 'instagram' },
]

/** 信息流为模拟数据 — 这些条目背后并不存在真实订单。 */
export function buildActivitySeed(): ActivityItem[] {
  return seedPool.map((item, i) => ({ ...item, id: i + 1 }))
}

const rotationPool: Array<Omit<ActivityItem, 'id' | 'time'>> = [
  { text: '有人刚刚下单 Instagram 增长服务', platform: 'instagram' },
  { text: '新的 TikTok 推广已启动', platform: 'tiktok' },
  { text: '创作者完成了一个推广', platform: 'youtube' },
  { text: '新订单 — X / Twitter 粉丝', platform: 'twitter' },
  { text: '有人刚刚充值了钱包', platform: 'telegram' },
  { text: 'Facebook 互动推广已启动', platform: 'facebook' },
]

let rotationIndex = 0

export function nextActivityItem(nextId: number): ActivityItem {
  const item = rotationPool[rotationIndex % rotationPool.length]
  rotationIndex += 1
  return { ...item, id: nextId, time: '刚刚' }
}
