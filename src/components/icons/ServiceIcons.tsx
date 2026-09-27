import {
  Clapperboard,
  Eye,
  Heart,
  Images,
  MessageCircle,
  Radio,
  Share2,
  ThumbsUp,
  UserPlus,
  Users,
  Video,
  Zap,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { ServiceIconId } from '@/types'

const map: Record<ServiceIconId, LucideIcon> = {
  followers: Users,
  likes: Heart,
  views: Eye,
  comments: MessageCircle,
  storyViews: Images,
  reelsViews: Clapperboard,
  engagement: Zap,
  shares: Share2,
  subscribers: UserPlus,
  pageLikes: ThumbsUp,
  videoViews: Video,
  postLikes: ThumbsUp,
  members: Users,
  postViews: Eye,
  reactions: Heart,
  liveViews: Radio,
}

export function ServiceIcon({ icon, className }: { icon: ServiceIconId; className?: string }) {
  const Icon = map[icon]
  return <Icon className={className} />
}
