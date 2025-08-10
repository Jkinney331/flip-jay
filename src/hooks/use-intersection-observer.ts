'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

/**
 * Custom hook for intersection observer
 * Returns ref to attach to element and intersection state
 */
export function useIntersectionObserver<T extends Element = HTMLDivElement>({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverOptions = {}) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  const updateEntry = ([entry]: IntersectionObserverEntry[]) => {
    setEntry(entry);
    setIsVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const node = elementRef.current;
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || frozen || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [elementRef, threshold, root, rootMargin, frozen]);

  return {
    ref: elementRef,
    entry,
    isVisible,
    isIntersecting: entry?.isIntersecting,
  };
}

/**
 * Hook for lazy loading components when they enter the viewport
 * Only renders children when element is visible
 */
export function useLazyRender(options?: UseIntersectionObserverOptions) {
  const { ref, isVisible } = useIntersectionObserver({
    freezeOnceVisible: true,
    ...options,
  });
  
  return { ref, shouldRender: isVisible };
}