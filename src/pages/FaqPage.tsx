import CtaBanner from '@/components/home/CtaBanner'
import FaqSection from '@/components/home/FaqSection'
import PageHeader from '@/components/ui/PageHeader'

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="常见问题"
        title={
          <>
            常见问题<span className="text-gradient">解答</span>
          </>
        }
        subtitle="关于 Boostly 服务、交付、订单跟踪与客服支持，您想了解的一切都在这里。"
      />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
