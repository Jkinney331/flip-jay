import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  taglineColor?: 'black' | 'grey';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ 
  className, 
  showTagline = true, 
  taglineColor = 'black',
  size = 'md' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
    xl: 'text-8xl'
  };

  const taglineSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* Logo Container */}
      <div className={cn('relative font-bold tracking-tight', sizeClasses[size])}>
        {/* Background geometric shapes */}
        <div className="absolute inset-0 -z-10">
          {/* Light grey arrow shapes */}
          <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-200 transform rotate-45 opacity-60"></div>
          <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gray-200 transform -rotate-45 opacity-60"></div>
          
          {/* Light blue geometric elements */}
          <div className="absolute top-1 right-1 w-4 h-4 bg-blue-200 transform rotate-12 opacity-70"></div>
          <div className="absolute bottom-1 left-1 w-3 h-3 bg-blue-200 transform -rotate-12 opacity-70"></div>
        </div>
        
        {/* FLP TECH Text */}
        <span className="text-black">
          <span className="text-black">F</span>
          <span className="text-red-500">L</span>
          <span className="text-blue-500">P</span>
          {' '}
          <span className="text-yellow-500">T</span>
          <span className="text-blue-500">E</span>
          <span className="text-red-500">C</span>
          <span className="text-black">H</span>
        </span>
      </div>
      
      {/* Tagline */}
      {showTagline && (
        <p className={cn(
          'mt-2 text-center font-light leading-relaxed',
          taglineSizeClasses[size],
          taglineColor === 'black' ? 'text-black' : 'text-gray-400'
        )}>
          When you change your perspective, you see things you never knew existed.
        </p>
      )}
    </div>
  );
}

// Variant for different use cases
export function LogoInline({ className, size = 'md' }: Omit<LogoProps, 'showTagline' | 'taglineColor'>) {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  return (
    <div className={cn('font-bold tracking-tight', sizeClasses[size], className)}>
      <span className="text-black">F</span>
      <span className="text-red-500">L</span>
      <span className="text-blue-500">P</span>
      {' '}
      <span className="text-yellow-500">T</span>
      <span className="text-blue-500">E</span>
      <span className="text-red-500">C</span>
      <span className="text-black">H</span>
    </div>
  );
}
