// A/B Testing Configuration and Logic
export interface VariantConfig {
  id: string;
  name: string;
  weight: number; // Traffic allocation percentage (0-100)
  description: string;
  isActive: boolean;
}

export interface TestConfig {
  id: string;
  name: string;
  description: string;
  variants: VariantConfig[];
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
}

// Multi-domain A/B tests
export const AB_TESTS: Record<string, TestConfig> = {
  // FlipTech Pro (SMB) tests
  'fliptechpro.com_hero_section': {
    id: 'fliptechpro.com_hero_section',
    name: 'SMB Hero Section Optimization',
    description: 'Testing different hero approaches for small businesses',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original SMB-focused hero',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - ROI Focus',
        weight: 50,
        description: 'Hero emphasizing quick ROI',
        isActive: true,
      },
    ],
  },
  'fliptechpro.com_pricing_section': {
    id: 'fliptechpro.com_pricing_section',
    name: 'SMB Pricing Section Test',
    description: 'Testing pricing presentations for small businesses',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original SMB pricing',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Value Focus',
        weight: 50,
        description: 'Pricing with cost savings emphasis',
        isActive: true,
      },
    ],
  },
  // FlipTech AI (Professional) tests
  'fliptech-ai.com_hero_section': {
    id: 'fliptech-ai.com_hero_section',
    name: 'Enterprise Hero Section Optimization',
    description: 'Testing different hero approaches for enterprises',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original enterprise-focused hero',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Scale Focus',
        weight: 50,
        description: 'Hero emphasizing scalability',
        isActive: true,
      },
    ],
  },
  'fliptech-ai.com_pricing_section': {
    id: 'fliptech-ai.com_pricing_section',
    name: 'Enterprise Pricing Section Test',
    description: 'Testing pricing presentations for enterprises',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original enterprise pricing',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - ROI Focus',
        weight: 50,
        description: 'Pricing with enterprise ROI emphasis',
        isActive: true,
      },
    ],
  },
  // Legacy tests for backward compatibility
  hero_section: {
    id: 'hero_section',
    name: 'Hero Section Optimization',
    description: 'Testing different hero section layouts and messaging',
    startDate: new Date('2024-01-01'),
    isActive: false, // Disabled in favor of domain-specific tests
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 25,
        description: 'Original hero section design',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Bold CTA',
        weight: 25,
        description: 'Hero with bold call-to-action button',
        isActive: true,
      },
      {
        id: 'variant_b',
        name: 'Variant B - Social Proof',
        weight: 25,
        description: 'Hero with customer testimonials',
        isActive: true,
      },
      {
        id: 'variant_c',
        name: 'Variant C - Feature Focus',
        weight: 25,
        description: 'Hero highlighting key features',
        isActive: true,
      },
    ],
  },
  pricing_section: {
    id: 'pricing_section',
    name: 'Pricing Section Test',
    description: 'Testing different pricing presentations',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original pricing section',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Value Focus',
        weight: 50,
        description: 'Pricing with value proposition emphasis',
        isActive: true,
      },
    ],
  },
  cta_section: {
    id: 'cta_section',
    name: 'CTA Section Test',
    description: 'Testing different call-to-action approaches',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original CTA section',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Urgency',
        weight: 50,
        description: 'CTA with urgency messaging',
        isActive: true,
      },
    ],
  },
  bento_section: {
    id: 'bento_section',
    name: 'Bento Section Test',
    description: 'Testing different bento grid layouts',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original bento grid layout',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Feature Rich',
        weight: 50,
        description: 'Bento with enhanced feature display',
        isActive: true,
      },
    ],
  },
  testimonial_section: {
    id: 'testimonial_section',
    name: 'Testimonial Section Test',
    description: 'Testing different testimonial presentations',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original testimonial section',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Video Focus',
        weight: 50,
        description: 'Testimonials with video emphasis',
        isActive: true,
      },
    ],
  },
  feature_section: {
    id: 'feature_section',
    name: 'Feature Section Test',
    description: 'Testing different feature presentations',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original feature section',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Benefit Focus',
        weight: 50,
        description: 'Features with benefit emphasis',
        isActive: true,
      },
    ],
  },
  faq_section: {
    id: 'faq_section',
    name: 'FAQ Section Test',
    description: 'Testing different FAQ presentations',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original FAQ section',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Grouped FAQs',
        weight: 50,
        description: 'FAQs grouped by category',
        isActive: true,
      },
    ],
  },
  company_showcase: {
    id: 'company_showcase',
    name: 'Company Showcase Test',
    description: 'Testing different company showcase layouts',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original company showcase',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Industry Focus',
        weight: 50,
        description: 'Companies grouped by industry',
        isActive: true,
      },
    ],
  },
  contact_section: {
    id: 'contact_section',
    name: 'Contact Section Test',
    description: 'Testing different contact form approaches',
    startDate: new Date('2024-01-01'),
    isActive: true,
    variants: [
      {
        id: 'control',
        name: 'Control (Original)',
        weight: 50,
        description: 'Original contact form',
        isActive: true,
      },
      {
        id: 'variant_a',
        name: 'Variant A - Simplified Form',
        weight: 50,
        description: 'Simplified contact form with fewer fields',
        isActive: true,
      },
    ],
  },
};

// Variant selection logic
export function selectVariant(testId: string, userId?: string): string {
  const test = AB_TESTS[testId];
  if (!test || !test.isActive) {
    return 'control';
  }

  // Use user ID for consistent assignment, fallback to random
  const seed = userId || Math.random().toString();
  const hash = simpleHash(seed + testId);
  const normalizedHash = hash % 100;

  let cumulativeWeight = 0;
  for (const variant of test.variants) {
    if (!variant.isActive) continue;
    cumulativeWeight += variant.weight;
    if (normalizedHash < cumulativeWeight) {
      return variant.id;
    }
  }

  return 'control';
}

// Simple hash function for consistent variant assignment
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

// Analytics tracking
export function trackVariantView(testId: string, variantId: string, userId?: string) {
  // Send to your analytics service (Google Analytics, Mixpanel, etc.)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ab_test_view', {
      test_id: testId,
      variant_id: variantId,
      user_id: userId,
    });
  }

  // Also log for debugging
  console.log(`A/B Test View: ${testId} -> ${variantId}`, { userId });
}

export function trackVariantConversion(testId: string, variantId: string, userId?: string, conversionType?: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'ab_test_conversion', {
      test_id: testId,
      variant_id: variantId,
      user_id: userId,
      conversion_type: conversionType || 'general',
    });
  }

  // Also log for debugging
  console.log(`A/B Test Conversion: ${testId} -> ${variantId}`, { userId, conversionType });
}

// Utility function to get all active tests
export function getActiveTests(): TestConfig[] {
  return Object.values(AB_TESTS).filter(test => test.isActive);
}

// Utility function to get user's variants for all tests
export function getUserVariants(userId: string): Record<string, string> {
  const variants: Record<string, string> = {};
  Object.keys(AB_TESTS).forEach(testId => {
    variants[testId] = selectVariant(testId, userId);
  });
  return variants;
}

// Multi-domain A/B testing utilities
export function getDomainTestId(baseTestId: string, domain?: string): string {
  if (typeof window !== 'undefined') {
    const currentDomain = domain || window.location.hostname;
    
    // Handle different domains
    if (currentDomain.includes('fliptech-ai')) {
      return `fliptech-ai.com_${baseTestId}`;
    } else if (currentDomain.includes('fliptechpro')) {
      return `fliptechpro.com_${baseTestId}`;
    } else if (currentDomain === 'localhost') {
      return `fliptechpro.com_${baseTestId}`; // Default to SMB for local dev
    }
  }
  
  // Fallback to SMB domain
  return `fliptechpro.com_${baseTestId}`;
}

export function selectDomainVariant(baseTestId: string, userId?: string, domain?: string): string {
  const domainTestId = getDomainTestId(baseTestId, domain);
  return selectVariant(domainTestId, userId);
}

export function trackDomainVariantView(baseTestId: string, variantId: string, userId?: string, domain?: string) {
  const domainTestId = getDomainTestId(baseTestId, domain);
  trackVariantView(domainTestId, variantId, userId);
  
  // Also track domain-specific analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'domain_ab_test_view', {
      domain: domain || window.location.hostname,
      base_test_id: baseTestId,
      domain_test_id: domainTestId,
      variant_id: variantId,
      user_id: userId,
    });
  }
}

export function trackDomainVariantConversion(baseTestId: string, variantId: string, userId?: string, conversionType?: string, domain?: string) {
  const domainTestId = getDomainTestId(baseTestId, domain);
  trackVariantConversion(domainTestId, variantId, userId, conversionType);
  
  // Also track domain-specific analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'domain_ab_test_conversion', {
      domain: domain || window.location.hostname,
      base_test_id: baseTestId,
      domain_test_id: domainTestId,
      variant_id: variantId,
      user_id: userId,
      conversion_type: conversionType || 'general',
    });
  }
}
