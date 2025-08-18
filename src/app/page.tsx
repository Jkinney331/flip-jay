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
        <div className="mb-8">
          <HeroVariantWrapper>
            {{
              control: <HeroSection />,
              variant_a: <HeroVariantA />,
              variant_b: <HeroVariantB />,
              variant_c: <HeroVariantC />
            }}
          </HeroVariantWrapper>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <CompanyShowcase />
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <BentoSection />
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <ServicesSection/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <DemoOne/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <LazyWebGL height="600px" disableOnReducedMotion={false}>
            <GlowCard/>
          </LazyWebGL>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <GrowthSection />
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <FlipTechProcess/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <CaseStudiesSection/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <PricingCalculator/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <WhyNowSection/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <PricingVariantWrapper>
            {{
              control: <PricingSection />,
              variant_a: <PricingVariantA />,
              variant_b: <PricingVariantB />
            }}
          </PricingVariantWrapper>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <TestimonialSection />
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <ContactSection/>
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-16">
          <FAQSection />
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <div className="mb-8">
          <CTASection />
        </div>
      </ErrorBoundary>
      
      <ErrorBoundary>
        <FooterSection />
      </ErrorBoundary>
      
      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />
    </main>
  );
}