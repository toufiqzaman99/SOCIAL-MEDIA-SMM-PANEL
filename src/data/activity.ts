import type { PlatformId } from '@/types'

export interface ActivityItem {
  id: number
  text: string
  time: string
  platform: PlatformId
}

const seedPool: Array<Omit<ActivityItem, 'id'>> = [
  { text: 'Ava ordered Instagram Followers — 5,000', time: '2m ago', platform: 'instagram' },
  { text: 'New TikTok engagement campaign started', time: '6m ago', platform: 'tiktok' },
  { text: 'Liam completed a YouTube growth campaign', time: '11m ago', platform: 'youtube' },
  { text: 'Sofia placed an order for Telegram members', time: '18m ago', platform: 'telegram' },
  { text: 'New order — Facebook page followers', time: '24m ago', platform: 'facebook' },
  { text: 'Emma completed an Instagram engagement package', time: '31m ago', platform: 'instagram' },
]

/** Feed is simulated — no real orders exist behind these entries. */
export function buildActivitySeed(): ActivityItem[] {
  return seedPool.map((item, i) => ({ ...item, id: i + 1 }))
}

const rotationPool: Array<Omit<ActivityItem, 'id' | 'time'>> = [
  { text: 'Someone just ordered Instagram Growth', platform: 'instagram' },
  { text: 'New TikTok campaign started', platform: 'tiktok' },
  { text: 'Creator completed a campaign', platform: 'youtube' },
  { text: 'New order — X / Twitter followers', platform: 'twitter' },
  { text: 'Someone topped up their wallet', platform: 'telegram' },
  { text: 'Facebook engagement campaign started', platform: 'facebook' },
]

let rotationIndex = 0

export function nextActivityItem(nextId: number): ActivityItem {
  const item = rotationPool[rotationIndex % rotationPool.length]
  rotationIndex += 1
  return { ...item, id: nextId, time: 'just now' }
}
