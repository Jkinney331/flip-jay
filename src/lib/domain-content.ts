import { getCurrentDomain } from './domain-config';

// Content variants for each domain
export const DOMAIN_CONTENT = {
  'fliptechpro.com': {
    hero: {
      title: "Where Vision Meets Velocity",
      subtitle: "Built for Scale and Speed",
      description: "From chaos to production in 30 days",
      support_text: "",
      cta: {
        primary: {
          text: "Book Demo",
          href: "#contact"
        }
      },
      socialProof: {
        badge: "Specialized AI Teams",
        metric: ""
      }
    },
    pricing: {
      title: "Affordable AI Solutions",
      subtitle: "One investment, infinite returns. Perfect for growing businesses.",
      price: "9,500",
      originalPrice: "25,000",
      savings: "Save $15,500 vs building in-house",
      badge: "Most Popular",
      guarantee: "30-day money-back guarantee",
      cta: "Start Your Transformation",
      description: "Your complete AI solution in 30 days",
      features: [
        "Complete 30-day AI solution implementation",
        "Custom AI model development and training",
        "Integration with your existing systems",
        "Comprehensive documentation and training",
        "2 weeks of post-launch support",
        "Knowledge transfer session for your team",
        "AI Control Dashboard included",
        "30-day money-back guarantee",
        "Lifetime access to AI updates",
        "Priority support for 90 days"
      ]
    },
    cta: {
      title: "Scale Your Operations with AI",
      subtitle: "Deploy specialized AI teams across marketing, operations, product, research, and support. Each team works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.",
      button: {
        text: "Book Demo",
        href: "#contact"
      },
      subtext: "No obligations, no questions asked",
      companyName: "FlipTech Pro",
      backgroundImage: "/agent-cta-background.webp"
    },
    testimonials: {
      title: "AI Teams, Real Results",
      subtitle: "See how companies deployed complete AI departments"
    }
  },
  'fliptech-ai.com': {
    hero: {
      title: "Where Vision Meets Velocity",
      subtitle: "Individual AI Agents for Every Task",
      description: "From idea to production in 14 days",
      support_text: "Transform your business with cutting-edge AI solutions, delivered with unmatched speed and expertise.",
      cta: {
        primary: {
          text: "Book Demo",
          href: "#contact"
        }
      },
      socialProof: {
        badge: "Specialized AI Agents", 
        metric: ""
      }
    },
    pricing: {
      title: "Professional AI Implementation",
      subtitle: "Comprehensive solutions with enterprise support and ongoing optimization.",
      price: "19,500",
      originalPrice: "50,000",
      savings: "Save $30,500 vs hiring AI team",
      badge: "Enterprise Grade",
      guarantee: "SLA-backed performance guarantee",
      cta: "Schedule Enterprise Demo",
      description: "Your complete enterprise AI solution in 14 days",
      features: [
        "Complete AI transformation in 14 days",
        "Custom AI models tailored to your business",
        "Full system integration and deployment",
        "Comprehensive team training program",
        "24/7 support for 3 months",
        "Performance monitoring and optimization",
        "AI Control Dashboard with analytics",
        "100% satisfaction guarantee",
        "Free updates and improvements",
        "Direct access to AI experts"
      ]
    },
    cta: {
      title: "Automate. Simplify. Thrive",
      subtitle: "Deploy specialized AI agents across marketing, operations, product, research, and support. Each agent works seamlessly together, handling complex tasks so your human teams can focus on strategic initiatives.",
      button: {
        text: "Book Demo",
        href: "#contact"
      },
      subtext: "No obligations, no questions asked",
      companyName: "FlipTech AI",
      backgroundImage: "/agent-cta-background.webp"
    },
    testimonials: {
      title: "AI Agents, Real Results",
      subtitle: "See how specialized agents transformed individual workflows"
    }
  },
  'localhost': {
    // Use SMB content for development
    hero: {
      title: "Where Vision Meets Velocity",
      subtitle: "Built for Scale and Speed",
      description: "From idea to production in 14 days",
      support_text: "",
      cta: {
        primary: {
          text: "Book Free Demo",
          href: "#contact"
        }
      },
      socialProof: {
        badge: "Specialized AI Teams",
        metric: ""
      }
    },
    pricing: {
      title: "Affordable AI Solutions",
      subtitle: "One investment, infinite returns. Perfect for growing businesses.",
      price: "9,500",
      originalPrice: "25,000",
      savings: "Save $15,500 vs building in-house",
      badge: "Most Popular",
      guarantee: "30-day money-back guarantee",
      cta: "Start Your Transformation",
      description: "Your complete AI solution in 30 days",
      features: [
        "Complete 30-day AI solution implementation",
        "Custom AI model development and training",
        "Integration with your existing systems",
        "Comprehensive documentation and training",
        "2 weeks of post-launch support",
        "Knowledge transfer session for your team",
        "AI Control Dashboard included",
        "30-day money-back guarantee",
        "Lifetime access to AI updates",
        "Priority support for 90 days"
      ]
    },
    cta: {
      title: "Automate. Simplify. Thrive",
      subtitle: "Ready to transform your business with AI?",
      button: {
        text: "Book Demo",
        href: "#contact"
      },
      subtext: "No obligations, no questions asked",
      companyName: "FlipTech Pro",
      backgroundImage: "/agent-cta-background.webp"
    },
    testimonials: {
      title: "Small Businesses, Big Results",
      subtitle: "See how companies like yours achieved incredible growth"
    }
  }
};

export function getDomainContent<T extends keyof typeof DOMAIN_CONTENT['fliptechpro.com']>(
  section: T,
  domain?: string
): typeof DOMAIN_CONTENT['fliptechpro.com'][T] {
  const targetDomain = domain || getCurrentDomain();
  const domainKey = targetDomain as keyof typeof DOMAIN_CONTENT;
  return (DOMAIN_CONTENT[domainKey]?.[section] || 
          DOMAIN_CONTENT['fliptechpro.com'][section]) as typeof DOMAIN_CONTENT['fliptechpro.com'][T];
}
