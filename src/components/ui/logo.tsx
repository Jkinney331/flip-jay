import React from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ 
  className, 
  showTagline = false,
  size = 'md' 
}: LogoProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto',
    xl: 'h-24 w-auto'
  };

  // Show light version by default until mounted
  const logoSrc = mounted && theme === 'dark' ? '/logo-dark.png' : '/logo-light.png';

  return (
    <div className={cn('flex flex-col items-center', className)}>
      <Image
        src={logoSrc}
        alt="FLP-TECH Logo"
        width={200}
        height={60}
        className={cn(sizeClasses[size])}
        priority
      />
      {showTagline && (
        <p className="mt-2 text-center font-light text-sm text-muted-foreground">
          When you change your perspective, you see things you never knew existed
        </p>
      )}
    </div>
  );
}

// Compact version for navbar
export function LogoInline({ className, size = 'md' }: Omit<LogoProps, 'showTagline'>) {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const sizeClasses = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-10 w-auto',
    xl: 'h-12 w-auto'
  };

  // Show light version by default until mounted
  const logoSrc = mounted && theme === 'dark' ? '/logo-dark.png' : '/logo-light.png';

  return (
    <Image
      src={logoSrc}
      alt="FLP-TECH"
      width={120}
      height={36}
      className={cn(sizeClasses[size], className)}
      priority
    />
  );
}
