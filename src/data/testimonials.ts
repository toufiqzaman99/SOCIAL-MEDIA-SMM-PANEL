export interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
  gradient: string
}

export const testimonials: Testimonial[] = [
  {
    quote: 'Boostly 让我们的社媒推广管理轻松了许多。控制台界面清爽，我随时都能清楚地看到每个订单的进展。',
    name: '王雅',
    role: '数字营销经理',
    rating: 5,
    gradient: 'from-violet-500 to-indigo-500',
  },
  {
    quote: '界面干净、下单流程简单、客服也很出色。我们现在所有客户推广都通过它来运营。',
    name: '陈凯',
    role: 'YouTuber & 内容创作者',
    rating: 5,
    gradient: 'from-fuchsia-500 to-rose-400',
  },
  {
    quote: '管理多个增长推广的优秀平台，从下单到进度跟踪，一切都非常顺畅。',
    name: '谭艾莎',
    role: '品牌策略师',
    rating: 5,
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    quote: '订单跟踪完全透明——我能实时看到每个推广的状态，这是大多数平台做不到的。',
    name: '马迪',
    role: '内容创作者',
    rating: 4,
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    quote: '价格清晰透明，交付时间也很实在。比起我用过的其他平台，体验好太多了。',
    name: '沙普丽雅',
    role: '初创公司创始人',
    rating: 5,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    quote: '从下单到客服，每个环节都非常专业。它已经成为我们每周工作流程的一部分。',
    name: '李奥',
    role: '达人运营经理',
    rating: 5,
    gradient: 'from-indigo-400 to-violet-500',
  },
]
