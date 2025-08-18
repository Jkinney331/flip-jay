import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";
import { LazyWebGL } from "@/components/LazyWebGL";
import { MobileStickyCTA } from "@/components/ui/mobile-sticky-cta";

// Static imports
import CaseStudiesSection from "@/components/casestudies";
import ContactSection from "@/components/sections/Contact";
import HeroSection from "@/components/sections/hero-section";
import WhyNowSection from "@/components/WhyNowSec";
import PricingCalculator from "@/components/sections/report-section";
import DemoOne from "@/components/sections/secondAiDashboard";
import FooterSection from "@/components/sections/footer-section";
import CTASection from "@/components/sections/cta-section";

// Dynamic imports
const BentoSection = dynamic(() => import("@/components/sections/bento-section"));
const GrowthSection = dynamic(() => import("@/components/sections/growth-section"));
const CompanyShowcase = dynamic(() => import("@/components/sections/company-showcase"));
const PricingSection = dynamic(() => import("@/components/sections/pricing-section"));
const TestimonialSection = dynamic(() => import("@/components/sections/testimonial-section"));
const FAQSection = dynamic(() => import("@/components/sections/faq-section"));
const FlipTechProcess = dynamic(() => import("@/components/sections/fliptechprocess"));
const ServicesSection = dynamic(() => import("@/components/AIAgentsSection"));
const GlowCard = dynamic(() => import("@/components/ui/GlowEffectCard"));

// A/B Testing Variant Components
const HeroVariantA = dynamic(() => import("@/components/variants/hero/HeroVariantA"));
const HeroVariantB = dynamic(() => import("@/components/variants/hero/HeroVariantB"));
const HeroVariantC = dynamic(() => import("@/components/variants/hero/HeroVariantC"));
const PricingVariantA = dynamic(() => import("@/components/variants/pricing/PricingVariantA"));
const PricingVariantB = dynamic(() => import("@/components/variants/pricing/PricingVariantB"));

// A/B Testing Components
import { 
  HeroVariantWrapper, 
  PricingVariantWrapper
} from "@/components/VariantWrapper";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ErrorBoundary>
        <HeroVariantWrapper>
          {{
            control: <HeroSection />,
            variant_a: <HeroVariantA />,
            variant_b: <HeroVariantB />,
            variant_c: <HeroVariantC />
          }}
        </HeroVariantWrapper>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <CompanyShowcase />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <BentoSection />
      </ErrorBoundary>
      
      <ErrorBoundary>
        <ServicesSection/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <DemoOne/>
      </ErrorBoundary>
      
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
        <PricingCalculator/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <WhyNowSection/>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <PricingVariantWrapper>
          {{
            control: <PricingSection />,
            variant_a: <PricingVariantA />,
            variant_b: <PricingVariantB />
          }}
        </PricingVariantWrapper>
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
      
      <ErrorBoundary>
        <FooterSection />
      </ErrorBoundary>
      
      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </main>
  );
}