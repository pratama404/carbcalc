// Header removed
import Hero from '@/components/landing/Hero'
import Stats from '@/components/landing/Stats'
import DashboardPreview from '@/components/landing/DashboardPreview'
import WhatsAppPreview from '@/components/landing/WhatsAppPreview'
import InteractiveDemo from '@/components/landing/InteractiveDemo'
import Features from '@/components/landing/Features'
import { ComparisonSection, FAQSection } from '@/components/landing/ExtraSections'
import Testimonials from '@/components/landing/Testimonials'
import { CTA } from '@/components/landing/FooterCTA'

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <DashboardPreview />
      <WhatsAppPreview />
      <Features />
      <InteractiveDemo />
      <ComparisonSection />
      <Testimonials />
      <FAQSection />
      <CTA />
    </main>
  )
}