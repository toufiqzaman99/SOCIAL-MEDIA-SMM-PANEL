import CtaBanner from '@/components/home/CtaBanner'
import FaqSection from '@/components/home/FaqSection'
import Hero from '@/components/home/Hero'
import HowItWorks from '@/components/home/HowItWorks'
import LiveActivity from '@/components/home/LiveActivity'
import PlatformSection from '@/components/home/PlatformSection'
import PricingSection from '@/components/home/PricingSection'
import ServicesPreview from '@/components/home/ServicesPreview'
import Testimonials from '@/components/home/Testimonials'
import WhyBoostly from '@/components/home/WhyBoostly'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PlatformSection />
      <HowItWorks />
      <ServicesPreview />
      <PricingSection />
      <WhyBoostly />
      <Testimonials />
      <LiveActivity />
      <FaqSection />
      <CtaBanner />
    </>
  )
}
