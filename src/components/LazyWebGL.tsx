'use client';

import { Suspense } from 'react';
import { useLazyRender } from '@/hooks/use-intersection-observer';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface LazyWebGLProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  height?: string | number;
  className?: string;
  disableOnReducedMotion?: boolean;
}

/**
 * Wrapper component for lazy loading heavy WebGL components
 * Only renders when component enters viewport
 * Can be disabled for users who prefer reduced motion
 */
export function LazyWebGL({
  children,
  fallback,
  height = '400px',
  className = '',
  disableOnReducedMotion = true,
}: LazyWebGLProps) {
  const { ref, shouldRender } = useLazyRender({
    rootMargin: '100px', // Start loading slightly before visible
  });
  const prefersReducedMotion = useReducedMotion();

  // Simple fallback for reduced motion users
  const reducedMotionFallback = (
    <div 
      className={`flex items-center justify-center bg-gradient-to-br from-background to-muted rounded-lg ${className}`}
      style={{ height }}
    >
      <div className="text-center p-6">
        <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="text-sm text-muted-foreground">Interactive content disabled for performance</p>
      </div>
    </div>
  );

  // Loading fallback
  const loadingFallback = fallback || (
    <div 
      className={`flex items-center justify-center bg-muted/20 rounded-lg animate-pulse ${className}`}
      style={{ height }}
    >
      <div className="text-center p-6">
        <div className="w-8 h-8 mx-auto mb-2 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );

  return (
    <div ref={ref} className={className}>
      {disableOnReducedMotion && prefersReducedMotion ? (
        reducedMotionFallback
      ) : shouldRender ? (
        <Suspense fallback={loadingFallback}>
          {children}
        </Suspense>
      ) : (
        loadingFallback
      )}
    </div>
  );
}