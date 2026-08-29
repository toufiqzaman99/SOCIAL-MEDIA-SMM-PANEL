import CtaBanner from '@/components/home/CtaBanner'
import FaqSection from '@/components/home/FaqSection'
import HowItWorks from '@/components/home/HowItWorks'
import WhyBoostly from '@/components/home/WhyBoostly'
import PageHeader from '@/components/ui/PageHeader'

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How It Works"
        title={
          <>
            From order to campaign in <span className="text-gradient">four simple steps</span>
          </>
        }
        subtitle="A transparent flow built for creators: pick a package, paste your public link, check out and track everything from your dashboard."
      />
      <HowItWorks />
      <WhyBoostly />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
