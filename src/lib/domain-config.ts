// Multi-Domain Configuration System

export interface DomainConfig {
  domain: string;
  audience: 'smb' | 'professional';
  branding: {
    name: string;
    tagline: string;
    primaryColor: string;
    accentColor: string;
  };
  analytics: {
    gaId: string;
    conversionGoals: string[];
  };
  theme: {
    variant: string;
    messaging: string;
  };
}

export const DOMAIN_CONFIG: Record<string, DomainConfig> = {
  'fliptechpro.com': {
    domain: 'fliptechpro.com',
    audience: 'smb',
    branding: {
      name: 'FlipTech Pro',
      tagline: 'AI Solutions for Growing Businesses',
      primaryColor: '#3B82F6',
      accentColor: '#10B981',
    },
    analytics: {
      gaId: 'G-9FP4KSXP0J', // Your existing GA ID
      conversionGoals: ['demo_booked', 'contact_form', 'pricing_viewed']
    },
    theme: {
      variant: 'business-focused',
      messaging: 'affordable-scalable'
    }
  },
  'fliptech-ai.com': {
    domain: 'fliptech-ai.com',
    audience: 'professional',
    branding: {
      name: 'FlipTech AI',
      tagline: 'Enterprise AI Solutions',
      primaryColor: '#1F2937',
      accentColor: '#6366F1',
    },
    analytics: {
      gaId: 'G-YOUR-NEW-GA-ID', // Replace with your actual GA4 ID for fliptech-ai.com
      conversionGoals: ['consultation_booked', 'enterprise_contact', 'demo_scheduled']
    },
    theme: {
      variant: 'enterprise-focused',
      messaging: 'premium-professional'
    }
  },
  // Fallback for localhost and development
  'localhost': {
    domain: 'localhost',
    audience: 'smb',
    branding: {
      name: 'FlipTech Pro',
      tagline: 'AI Solutions for Growing Businesses',
      primaryColor: '#3B82F6',
      accentColor: '#10B981',
    },
    analytics: {
      gaId: 'G-9FP4KSXP0J',
      conversionGoals: ['demo_booked', 'contact_form', 'pricing_viewed']
    },
    theme: {
      variant: 'business-focused',
      messaging: 'affordable-scalable'
    }
  }
};

// Domain Detection Utilities
export function getCurrentDomain(): string {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname.includes('localhost')) {
      return 'localhost';
    }
    if (hostname === 'fliptechpro.com' || hostname.includes('fliptechpro')) {
      return 'fliptechpro.com';
    }
    if (hostname === 'fliptech-ai.com' || hostname.includes('fliptech-ai')) {
      return 'fliptech-ai.com';
    }
    
    return 'fliptechpro.com';
  }
  
  return process.env.NEXT_PUBLIC_DEFAULT_DOMAIN || 'fliptechpro.com';
}

export function getDomainConfig(domain?: string): DomainConfig {
  const targetDomain = domain || getCurrentDomain();
  return DOMAIN_CONFIG[targetDomain] || DOMAIN_CONFIG['fliptechpro.com'];
}

export function isSmb(domain?: string): boolean {
  return getDomainConfig(domain).audience === 'smb';
}

export function isProfessional(domain?: string): boolean {
  return getDomainConfig(domain).audience === 'professional';
}

// Multi-domain A/B testing configuration
export function getDomainABTestId(baseTestId: string, domain?: string): string {
  const targetDomain = domain || getCurrentDomain();
  return `${targetDomain}_${baseTestId}`;
}

// Utility to get domain-specific CSS variables
export function getDomainCSSVars(domain?: string): Record<string, string> {
  const config = getDomainConfig(domain);
  return {
    '--domain-primary': config.branding.primaryColor,
    '--domain-accent': config.branding.accentColor,
  };
}
