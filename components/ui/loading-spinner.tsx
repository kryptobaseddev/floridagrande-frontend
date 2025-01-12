'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  /**
   * Size variant of the spinner
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Show as full screen overlay
   */
  fullScreen?: boolean;
  /**
   * Additional className for the spinner
   */
  className?: string;
  /**
   * ARIA label for accessibility
   */
  ariaLabel?: string;
  /**
   * Error state and message
   */
  error?: { message: string } | null;
  /**
   * Animation duration in ms
   */
  animationDuration?: number;
}

export function LoadingSpinner({
  size = 'md',
  fullScreen = false,
  className,
  ariaLabel = 'Loading',
  error = null,
  animationDuration = 750
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const spinnerClasses = cn(
    'animate-spin',
    error ? 'text-destructive' : 'text-primary',
    sizeClasses[size],
    className
  );

  const spinner = (
    <div
      role="status"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-busy={!error}
      aria-invalid={!!error}
      className={cn(
        'inline-flex items-center gap-2',
        error && 'text-destructive'
      )}
    >
      <svg
        className={spinnerClasses}
        style={{ animationDuration: `${animationDuration}ms` }}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {error && <span className="text-sm">{error.message}</span>}
      <span className="sr-only">{error ? error.message : ariaLabel}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        {spinner}
      </div>
    );
  }

  return spinner;
} 