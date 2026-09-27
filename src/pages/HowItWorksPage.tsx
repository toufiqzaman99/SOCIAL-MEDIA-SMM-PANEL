import CtaBanner from '@/components/home/CtaBanner'
import FaqSection from '@/components/home/FaqSection'
import HowItWorks from '@/components/home/HowItWorks'
import WhyBoostly from '@/components/home/WhyBoostly'
import PageHeader from '@/components/ui/PageHeader'

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="运作流程"
        title={
          <>
            四个简单步骤，<span className="text-gradient">从下单到推广</span>
          </>
        }
        subtitle="为创作者打造的透明流程：选择套餐、粘贴公开链接、完成结算，一切进度尽在控制台。"
      />
      <HowItWorks />
      <WhyBoostly />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
