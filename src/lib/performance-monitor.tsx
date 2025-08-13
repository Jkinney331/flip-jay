'use client';

import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  entries: PerformanceEntry[];
}

class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, PerformanceMetric> = new Map();
  private observers: Map<string, PerformanceObserver> = new Map();
  private reportUrl = '/api/metrics';
  private batchTimer: NodeJS.Timeout | null = null;
  private metricsQueue: PerformanceMetric[] = [];

  private constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMonitoring();
    }
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeMonitoring() {
    // Monitor Core Web Vitals
    this.monitorWebVitals();
    
    // Monitor custom metrics
    this.monitorCustomMetrics();
    
    // Monitor resource loading
    this.monitorResourceTiming();
    
    // Monitor long tasks
    this.monitorLongTasks();
    
    // Setup visibility change handler
    this.setupVisibilityHandler();
  }

  private monitorWebVitals() {
    if ('web-vital' in window || typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
        onCLS(this.handleWebVital.bind(this));
        onFCP(this.handleWebVital.bind(this));
        onLCP(this.handleWebVital.bind(this));
        onTTFB(this.handleWebVital.bind(this));
        onINP(this.handleWebVital.bind(this));
      }).catch(console.error);
    }
  }

  private handleWebVital(metric: WebVitalsMetric) {
    const performanceMetric: PerformanceMetric = {
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      timestamp: Date.now(),
    };

    this.metrics.set(metric.name, performanceMetric);
    this.queueMetric(performanceMetric);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
      console.log(`${emoji} ${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
    }

    // Send critical metrics immediately
    if (metric.name === 'LCP' || metric.name === 'CLS') {
      this.flushMetrics();
    }
  }

  private monitorCustomMetrics() {
    // Monitor React hydration time
    if (typeof window !== 'undefined' && window.performance) {
      const hydrationTime = this.measureHydrationTime();
      if (hydrationTime) {
        this.recordMetric('react-hydration', hydrationTime);
      }
    }

    // Monitor time to interactive
    this.measureTimeToInteractive();
  }

  private measureHydrationTime(): number | null {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const hydrationMark = performance.getEntriesByName('react-hydration-complete')[0];
    
    if (navigationEntry && hydrationMark) {
      return hydrationMark.startTime - navigationEntry.fetchStart;
    }
    return null;
  }

  private measureTimeToInteractive() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-input') {
            const tti = entry.startTime;
            this.recordMetric('time-to-interactive', tti);
            observer.disconnect();
          }
        }
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.set('tti', observer);
    }
  }

  private monitorResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          
          // Track slow resources
          if (resourceEntry.duration > 1000) {
            this.recordMetric(`slow-resource-${resourceEntry.initiatorType}`, resourceEntry.duration);
            
            if (process.env.NODE_ENV === 'development') {
              console.warn(`⚠️ Slow resource detected: ${resourceEntry.name} (${resourceEntry.duration.toFixed(0)}ms)`);
            }
          }

          // Track critical resources
          if (resourceEntry.name.includes('chunk') || resourceEntry.name.includes('.css')) {
            this.recordMetric(`resource-${resourceEntry.initiatorType}`, resourceEntry.duration);
          }
        }
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.set('resource', observer);
    }
  }

  private monitorLongTasks() {
    if ('PerformanceObserver' in window && 'PerformanceLongTaskTiming' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Track tasks longer than 50ms
          if (entry.duration > 50) {
            this.recordMetric('long-task', entry.duration);
            
            if (process.env.NODE_ENV === 'development' && entry.duration > 100) {
              console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(0)}ms`);
            }
          }
        }
      });
      
      try {
        observer.observe({ entryTypes: ['longtask'] });
        this.observers.set('longtask', observer);
      } catch (e) {
        // Long task API might not be available
        console.log('Long Task API not available');
      }
    }
  }

  private setupVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // Flush metrics when page is hidden
        this.flushMetrics();
      }
    });

    // Also flush on page unload
    window.addEventListener('beforeunload', () => {
      this.flushMetrics();
    });
  }

  public recordMetric(name: string, value: number, rating?: 'good' | 'needs-improvement' | 'poor') {
    const metric: PerformanceMetric = {
      name,
      value,
      rating: rating || this.getRating(name, value),
      timestamp: Date.now(),
    };

    this.metrics.set(name, metric);
    this.queueMetric(metric);
  }

  private getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    // Define thresholds for different metrics
    const thresholds: Record<string, { good: number; poor: number }> = {
      'LCP': { good: 2500, poor: 4000 },
      'FID': { good: 100, poor: 300 },
      'CLS': { good: 0.1, poor: 0.25 },
      'FCP': { good: 1800, poor: 3000 },
      'TTFB': { good: 800, poor: 1800 },
      'INP': { good: 200, poor: 500 },
      'react-hydration': { good: 1000, poor: 3000 },
      'time-to-interactive': { good: 3800, poor: 7300 },
      'long-task': { good: 50, poor: 100 },
    };

    const threshold = thresholds[name] || { good: 1000, poor: 3000 };
    
    if (value <= threshold.good) return 'good';
    if (value >= threshold.poor) return 'poor';
    return 'needs-improvement';
  }

  private queueMetric(metric: PerformanceMetric) {
    this.metricsQueue.push(metric);
    
    // Batch metrics and send every 5 seconds
    if (!this.batchTimer) {
      this.batchTimer = setTimeout(() => {
        this.flushMetrics();
      }, 5000);
    }
  }

  private async flushMetrics() {
    if (this.metricsQueue.length === 0) return;

    const metricsToSend = [...this.metricsQueue];
    this.metricsQueue = [];
    
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    try {
      // Send metrics to backend
      await fetch(this.reportUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metrics: metricsToSend,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now(),
        }),
        keepalive: true, // Ensure request completes even if page unloads
      });
    } catch (error) {
      console.error('Failed to send metrics:', error);
      // Re-queue metrics on failure
      this.metricsQueue.unshift(...metricsToSend);
    }
  }

  public getMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.metrics);
  }

  public clearMetrics() {
    this.metrics.clear();
  }

  public destroy() {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    
    // Clear timers
    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
    }
    
    // Flush remaining metrics
    this.flushMetrics();
  }

  // Utility method for measuring component render time
  public measureComponent(componentName: string): () => void {
    const startMark = `${componentName}-start-${Date.now()}`;
    performance.mark(startMark);
    
    return () => {
      const endMark = `${componentName}-end-${Date.now()}`;
      performance.mark(endMark);
      
      try {
        performance.measure(componentName, startMark, endMark);
        const measures = performance.getEntriesByName(componentName);
        const lastMeasure = measures[measures.length - 1];
        
        if (lastMeasure) {
          this.recordMetric(`component-${componentName}`, lastMeasure.duration);
        }
        
        // Clean up marks
        performance.clearMarks(startMark);
        performance.clearMarks(endMark);
        performance.clearMeasures(componentName);
      } catch (error) {
        console.error(`Failed to measure component ${componentName}:`, error);
      }
    };
  }
}

// React Hook for using the performance monitor
export function usePerformanceMonitor() {
  useEffect(() => {
    const monitor = PerformanceMonitor.getInstance();
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  return PerformanceMonitor.getInstance();
}

// HOC for measuring component performance
export function withPerformanceMonitoring<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) {
  return function PerformanceMonitoredComponent(props: P) {
    const monitor = usePerformanceMonitor();
    
    useEffect(() => {
      const endMeasure = monitor.measureComponent(componentName);
      return endMeasure;
    }, [monitor]);
    
    return <Component {...props} />;
  };
}

export default PerformanceMonitor;

// Initialize monitor on client-side
if (typeof window !== 'undefined') {
  PerformanceMonitor.getInstance();
}