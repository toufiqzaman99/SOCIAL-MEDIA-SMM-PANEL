import { Star } from 'lucide-react'

import Avatar from '@/components/ui/Avatar'
import SectionHeading from '@/components/ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { testimonials } from '@/data/testimonials'

export default function Testimonials() {
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="用户口碑"
          title="深受成长型创作者喜爱"
          subtitle="每天都有团队与创作者通过 Boostly 运营他们的增长推广。"
        />

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <StaggerItem key={testimonial.name}>
              <figure className="glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-card">
                <div className="flex items-center gap-1" aria-label={`5 星中的 ${testimonial.rating} 星`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < testimonial.rating
                          ? 'h-4 w-4 fill-amber-400 text-amber-400'
                          : 'h-4 w-4 text-slate-600'
                      }
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-white/5 pt-4">
                  <Avatar name={testimonial.name} gradient={testimonial.gradient} />
                  <div>
                    <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
