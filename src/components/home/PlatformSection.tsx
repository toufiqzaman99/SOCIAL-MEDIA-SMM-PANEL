import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { PlatformIcon } from '@/components/icons/PlatformIcons'
import SectionHeading from '@/components/ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '@/components/ui/Reveal'
import { platforms } from '@/data/platforms'
import { useApp } from '@/store/AppContext'
import { cn } from '@/lib/utils'

export default function PlatformSection() {
  const navigate = useNavigate()
  const { format } = useApp()

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="覆盖平台"
          title="全平台增长服务"
          subtitle="覆盖各大主流社媒平台的营销增长服务——一个控制台、全程订单跟踪、无需提供密码。"
        />

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform) => (
            <StaggerItem key={platform.id}>
              <div className="glass group relative h-full overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-violet-400/40 hover:shadow-glow-sm">
                {/* Gradient wash on hover */}
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />

                <div className="relative">
                  <span
                    className={cn(
                      'grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-white transition-transform duration-300 group-hover:scale-110',
                      platform.gradient,
                      platform.glow,
                    )}
                  >
                    <PlatformIcon platform={platform.id} className="h-6 w-6" />
                  </span>

                  <h3 className="mt-5 font-display text-xl font-semibold text-white">{platform.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{platform.description}</p>

                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                    <p className="text-sm text-slate-400">
                      低至 <span className="font-semibold text-white">{format(platform.startingAt)}</span>
                    </p>
                    <button
                      onClick={() => navigate(`/services?platform=${platform.id}`)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-violet-300 transition hover:bg-violet-400/10 hover:text-violet-200"
                    >
                      查看服务
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
