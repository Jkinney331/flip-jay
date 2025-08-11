// const FeatureSection = dynamic(() => import("@/components/sections/feature-section"));
// const EmpowerCards = dynamic(() => import("@/components/sections/empowercard"));
const BentoSection = dynamic(() => import("@/components/sections/bento-section"));
const GrowthSection = dynamic(() => import("@/components/sections/growth-section"));
// const QuoteSection = dynamic(() => import("@/components/sections/quote-section"));
const CompanyShowcase = dynamic(() => import("@/components/sections/company-showcase"));
const PricingSection = dynamic(() => import("@/components/sections/pricing-section"));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const CTASection = dynamic(() => import("@/components/sections/cta-section"));
const FooterSection = dynamic(() => import("@/components/sections/footer-section"));
const FlipTechProcess = dynamic(() => import("@/components/sections/fliptechprocess"));
const AIAgentsSection = dynamic(() => import("@/components/AIAgentsSection"));
const GlowCard = dynamic(() => import("@/components/ui/GlowEffectCard"));

import CaseStudiesSection from "@/components/casestudies";
// import { AIDashboard } from "@/components/sections/AiDashboard";
import ContactSection from "@/components/sections/Contact";
import HeroSection from "@/components/sections/hero-section";
import WhyNowSection from "@/components/WhyNowSec";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LazyWebGL } from "@/components/LazyWebGL";
import DemoOne from "@/components/sections/secondAiDashboard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center divide-y divide-border min-h-screen w-full">
      
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <CompanyShowcase />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BentoSection />
      </ErrorBoundary>
      
      {/* <QuoteSection /> */}
      {/* <EmpowerCards/> */}
      {/* <FeatureSection /> */}
      
      <ErrorBoundary>
        <AIAgentsSection/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <DemoOne/>
      </ErrorBoundary>

        {/* <ErrorBoundary>
        <AIDashboard/>
      </ErrorBoundary> */}
      
      <ErrorBoundary>
        <LazyWebGL height="600px" disableOnReducedMotion={false}>
          <GlowCard/>
        </LazyWebGL>
      </ErrorBoundary>
      
      
      <ErrorBoundary>
        <GrowthSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <FlipTechProcess/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <CaseStudiesSection/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <WhyNowSection/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <PricingSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <TestimonialSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ContactSection/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <FAQSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <CTASection />
      </ErrorBoundary>
      
      <FooterSection />
    </main>
  );
}
