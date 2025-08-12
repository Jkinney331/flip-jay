'use client';

import { useEffect } from 'react';
import { useDomainContent } from '@/hooks/useDomainContent';

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function AnalyticsSetup() {
  const { config } = useDomainContent();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && config) {
      // Configure domain-specific analytics
      window.gtag('config', config.analytics.gaId, {
        custom_map: {
          'custom_parameter_1': 'domain',
          'custom_parameter_2': 'audience_type',
          'custom_parameter_3': 'ab_test_id',
          'custom_parameter_4': 'ab_variant_id',
          'custom_parameter_5': 'ab_user_id'
        },
        enhanced_ecommerce: true,
        send_page_view: true
      });

      // Track domain assignment
      window.gtag('event', 'domain_assignment', {
        domain: config.domain,
        audience_type: config.audience,
        event_category: 'Multi-Domain'
      });
    }
  }, [config]);

  return null; // This component doesn't render anything
}

// Enhanced tracking functions with better error handling
export function trackPageView(path: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('config', 'G-9FP4KSXP0J', {
        page_path: path,
        page_title: title
      });
    } catch (error) {
      console.warn('Analytics tracking error:', error);
    }
  }
}

export function trackEvent(eventName: string, eventParameters?: object) {
  if (typeof window !== 'undefined' && window.gtag) {
    try {
      window.gtag('event', eventName, eventParameters);
    } catch (error) {
      console.warn('Analytics event tracking error:', error);
    }
  }
}

// A/B Test specific tracking functions
export function trackABTestAssignment(testId: string, variantId: string, userId: string) {
  trackEvent('ab_test_assignment', {
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    event_category: 'A/B Testing',
    event_label: `${testId}:${variantId}`
  });
}

export function trackABTestView(testId: string, variantId: string, userId: string) {
  trackEvent('ab_test_view', {
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    event_category: 'A/B Testing',
    event_label: `${testId}:${variantId}`
  });
}

export function trackABTestConversion(
  testId: string, 
  variantId: string, 
  userId: string, 
  conversionType: string = 'general',
  value?: number
) {
  trackEvent('ab_test_conversion', {
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    conversion_type: conversionType,
    value: value,
    event_category: 'A/B Testing',
    event_label: `${testId}:${variantId}:${conversionType}`
  });
}

// Conversion tracking for specific actions
export function trackCTAClick(testId: string, variantId: string, ctaLocation: string) {
  const userId = localStorage.getItem('ab_test_user_id');
  trackEvent('cta_click', {
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    cta_location: ctaLocation,
    event_category: 'CTA',
    event_label: `${testId}:${variantId}:${ctaLocation}`
  });
  
  // Also track as A/B test conversion
  if (userId) {
    trackABTestConversion(testId, variantId, userId, 'cta_click');
  }
}

export function trackFormSubmission(testId: string, variantId: string, formType: string) {
  const userId = localStorage.getItem('ab_test_user_id');
  trackEvent('form_submit', {
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    form_type: formType,
    event_category: 'Form',
    event_label: `${testId}:${variantId}:${formType}`
  });
  
  // Also track as A/B test conversion
  if (userId) {
    trackABTestConversion(testId, variantId, userId, 'form_submission');
  }
}

export function trackPricingInteraction(testId: string, variantId: string, action: string) {
  const userId = localStorage.getItem('ab_test_user_id');
  trackEvent('pricing_interaction', {
    test_id: testId,
    variant_id: variantId,
    user_id: userId,
    pricing_action: action,
    event_category: 'Pricing',
    event_label: `${testId}:${variantId}:${action}`
  });
  
  // Also track as A/B test conversion
  if (userId) {
    trackABTestConversion(testId, variantId, userId, 'pricing_interaction');
  }
}
