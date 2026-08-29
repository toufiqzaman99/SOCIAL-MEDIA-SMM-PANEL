export interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
  gradient: string
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Boostly made managing our social campaigns much easier. The dashboard is clean, and I always know exactly where every order stands.',
    name: 'Maya Reyes',
    role: 'Digital Marketing Manager',
    rating: 5,
    gradient: 'from-violet-500 to-indigo-500',
  },
  {
    quote:
      'Clean dashboard, simple ordering process and excellent support. We run all of our client campaigns through it now.',
    name: 'Jonas Keller',
    role: 'YouTuber & Creator',
    rating: 5,
    gradient: 'from-fuchsia-500 to-rose-400',
  },
  {
    quote: 'Great platform for managing multiple growth campaigns. Everything from checkout to tracking just works.',
    name: 'Aisha Tan',
    role: 'Brand Strategist',
    rating: 5,
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    quote:
      'Order tracking is completely transparent — I can see the status of every campaign in real time, which most platforms simply do not offer.',
    name: 'Diego Marques',
    role: 'Content Creator',
    rating: 4,
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    quote:
      'The pricing is clear and the delivery estimates are realistic. Refreshing compared to other platforms I have tried.',
    name: 'Priya Sharma',
    role: 'Startup Founder',
    rating: 5,
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    quote:
      'Everything about the experience feels professional — from checkout to support. It has become part of our weekly workflow.',
    name: 'Leo Brandt',
    role: 'Influencer Manager',
    rating: 5,
    gradient: 'from-indigo-400 to-violet-500',
  },
]
