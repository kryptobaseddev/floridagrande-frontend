'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'roles' | 'list' | 'table' | 'form' | 'profile' | 'stats' | 'dashboard';
  count?: number;
  animate?: boolean;
  observeInView?: boolean;
  ariaLabel?: string;
  itemClassName?: string;
}

// Composite components for complex loading patterns
const Title = ({ className }: { className?: string }) => (
  <div className={cn("h-8 w-48", className)} />
);

const Actions = ({ count = 1, className }: { count?: number; className?: string }) => (
  <div className={cn("flex gap-2", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-10 w-24" />
    ))}
  </div>
);

const List = ({ count = 3, className }: { count?: number; className?: string }) => (
  <div className={cn("space-y-4", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="h-16 w-full" />
    ))}
  </div>
);

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("space-y-4", className)}>{children}</div>
);

export function LoadingSkeleton({
  className,
  variant = 'default',
  count = 1,
  animate = true,
  observeInView = true,
  ariaLabel = 'Loading content',
  itemClassName
}: LoadingSkeletonProps) {
  const [isVisible, setIsVisible] = useState(!observeInView);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!observeInView || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [observeInView]);

  const variants = {
    default: 'h-4 w-full',
    card: 'h-[300px] w-full',
    text: 'h-4 w-3/4',
    avatar: 'h-12 w-12 rounded-full',
    roles: 'h-[120px] w-full',
    list: 'h-16 w-full',
    table: 'h-12 w-full',
    form: 'h-[400px] w-full',
    profile: 'h-[200px] w-full',
    stats: 'h-32 w-full',
    dashboard: 'w-full space-y-6'
  };

  const baseClasses = cn(
    'rounded bg-gray-200',
    animate && 'animate-pulse',
    variants[variant],
    itemClassName
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={ref}
      role="status"
      aria-label={ariaLabel}
      aria-busy="true"
      className={cn("space-y-3", className)}
    >
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={baseClasses}
        />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
}

// Attach composite components
LoadingSkeleton.Title = Title;
LoadingSkeleton.Actions = Actions;
LoadingSkeleton.List = List;
LoadingSkeleton.Section = Section; 