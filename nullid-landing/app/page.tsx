import HeroSection from "@/components/hero-section"
import ProblemSection from "@/components/problem-section"
import HowItWorksSection from "@/components/how-it-works-section"
import FeaturesSection from "@/components/features-section"
import CtaSection from "@/components/cta-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  )
}
