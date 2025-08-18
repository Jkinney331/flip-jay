import { getCurrentDomain } from './domain-config';

// Content variants for each domain
export const DOMAIN_CONTENT = {
  'fliptechpro.com': {
    hero: {
      title: "Your Technical Team, On Demand",
      subtitle: "Quality Development at $75/Hour",
      description: "From quick fixes to complete builds, we deliver.",
      support_text: "Whether you need a bug squashed or an MVP launched, we're your flexible development partner. Hourly or fixed-fee—your project, your choice.",
      cta: {
        primary: {
          text: "Start Your Project",
          href: "#contact"
        },
        secondary: {
          text: "View Our Work",
          href: "#portfolio"
        }
      },
      socialProof: {
        badge: "500+ Projects Delivered",
        metric: ""
      }
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "No contracts, no minimums, no nonsense",
      price: "75",
      originalPrice: "150",
      savings: "Save 50% vs agency rates",
      badge: "Most Popular",
      guarantee: "No minimum hours required",
      cta: "Get Your Quote",
      description: "Hourly or project-based pricing",
      features: [
        "Pay only for time used",
        "Detailed time tracking",
        "Weekly invoicing",
        "No minimum hours",
        "Pause anytime",
        "Fixed price options available",
        "Milestone payments",
        "Timeline guarantee",
        "Post-launch support included",
        "15-minute discovery calls"
      ]
    },
    cta: {
      title: "Ready to Build Something Great?",
      subtitle: "15-minute call. Honest advice. No sales pressure.",
      button: {
        text: "Start Your Project",
        href: "#contact"
      },
      subtext: "Or just email us at hello@fliptechdev.com",
      companyName: "FlipTech Dev",
      backgroundImage: "/agent-cta-background.webp"
    },
    testimonials: {
      title: "Problems Solved, Clients Happy",
      subtitle: "Real projects, real results, real testimonials"
    }
  },
  'fliptech-ai.com': {
    hero: {
      title: "Your Technical Team, On Demand",
      subtitle: "Quality Development at $75/Hour",
      description: "From quick fixes to complete builds, we deliver.",
      support_text: "Whether you need a bug squashed or an MVP launched, we're your flexible development partner. Hourly or fixed-fee—your project, your choice.",
      cta: {
        primary: {
          text: "Start Your Project",
          href: "#contact"
        },
        secondary: {
          text: "View Our Work",
          href: "#portfolio"
        }
      },
      socialProof: {
        badge: "500+ Projects Delivered",
        metric: ""
      }
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "No contracts, no minimums, no nonsense",
      price: "75",
      originalPrice: "150",
      savings: "Save 50% vs agency rates",
      badge: "Most Popular",
      guarantee: "No minimum hours required",
      cta: "Get Your Quote",
      description: "Hourly or project-based pricing",
      features: [
        "Pay only for time used",
        "Detailed time tracking",
        "Weekly invoicing",
        "No minimum hours",
        "Pause anytime",
        "Fixed price options available",
        "Milestone payments",
        "Timeline guarantee",
        "Post-launch support included",
        "15-minute discovery calls"
      ]
    },
    cta: {
      title: "Ready to Build Something Great?",
      subtitle: "15-minute call. Honest advice. No sales pressure.",
      button: {
        text: "Start Your Project",
        href: "#contact"
      },
      subtext: "Or just email us at hello@fliptechdev.com",
      companyName: "FlipTech Dev",
      backgroundImage: "/agent-cta-background.webp"
    },
    testimonials: {
      title: "Problems Solved, Clients Happy",
      subtitle: "Real projects, real results, real testimonials"
    }
  },
  'localhost': {
    // Use development content for local development
    hero: {
      title: "Your Technical Team, On Demand",
      subtitle: "Quality Development at $75/Hour",
      description: "From quick fixes to complete builds, we deliver.",
      support_text: "Whether you need a bug squashed or an MVP launched, we're your flexible development partner. Hourly or fixed-fee—your project, your choice.",
      cta: {
        primary: {
          text: "Start Your Project",
          href: "#contact"
        },
        secondary: {
          text: "View Our Work",
          href: "#portfolio"
        }
      },
      socialProof: {
        badge: "500+ Projects Delivered",
        metric: ""
      }
    },
    pricing: {
      title: "Simple, Transparent Pricing",
      subtitle: "No contracts, no minimums, no nonsense",
      price: "75",
      originalPrice: "150",
      savings: "Save 50% vs agency rates",
      badge: "Most Popular",
      guarantee: "No minimum hours required",
      cta: "Get Your Quote",
      description: "Hourly or project-based pricing",
      features: [
        "Pay only for time used",
        "Detailed time tracking",
        "Weekly invoicing",
        "No minimum hours",
        "Pause anytime",
        "Fixed price options available",
        "Milestone payments",
        "Timeline guarantee",
        "Post-launch support included",
        "15-minute discovery calls"
      ]
    },
    cta: {
      title: "Ready to Build Something Great?",
      subtitle: "15-minute call. Honest advice. No sales pressure.",
      button: {
        text: "Start Your Project",
        href: "#contact"
      },
      subtext: "Or just email us at hello@fliptechdev.com",
      companyName: "FlipTech Dev",
      backgroundImage: "/agent-cta-background.webp"
    },
    testimonials: {
      title: "Problems Solved, Clients Happy",
      subtitle: "Real projects, real results, real testimonials"
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
