import CtaBanner from '@/components/home/CtaBanner'
import FaqSection from '@/components/home/FaqSection'
import PageHeader from '@/components/ui/PageHeader'

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Frequently asked <span className="text-gradient">questions</span>
          </>
        }
        subtitle="Everything you need to know about Boostly services, delivery, tracking and support."
      />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
