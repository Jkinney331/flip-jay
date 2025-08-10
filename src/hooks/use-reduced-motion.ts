'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect user's motion preference
 * Returns true if user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add listener with fallback for older browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook that returns motion-safe variants based on user preference
 * Usage: const { animate, initial, transition } = useMotionSafe({ animate: { opacity: 1 }, ... })
 */
export function useMotionSafe<T extends Record<string, unknown>>(
  motionVariants: T
): T | { [K in keyof T]: Record<string, never> } {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) {
    // Return empty objects to disable animations
    const emptyVariants = {} as { [K in keyof T]: Record<string, never> };
    Object.keys(motionVariants).forEach(key => {
      emptyVariants[key as keyof T] = {};
    });
    return emptyVariants;
  }
  
  return motionVariants;
}