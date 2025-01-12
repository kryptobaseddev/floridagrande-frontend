'use client';

import { useEffect, useState, useRef } from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface LoadingProgressProps {
  /**
   * Current progress value (0-100)
   */
  value?: number;
  /**
   * Show indeterminate progress animation when no value provided
   */
  indeterminate?: boolean;
  /**
   * Optional label to show progress percentage
   */
  showLabel?: boolean;
  /**
   * Custom label format function
   */
  labelFormat?: (value: number) => string;
  /**
   * Optional description text
   */
  description?: string;
  /**
   * Size variant of the progress bar
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional className for the container
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

export function LoadingProgress({
  value,
  indeterminate = false,
  showLabel = false,
  labelFormat = (val) => `${Math.round(val)}%`,
  description,
  size = 'md',
  className,
  ariaLabel,
  error = null,
  animationDuration = 200
}: LoadingProgressProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [indeterminateValue, setIndeterminateValue] = useState(0);
  const prevValueRef = useRef(0);
  const animationFrameRef = useRef<number>();

  // Smooth progress animation
  useEffect(() => {
    if (indeterminate || error) return;

    const targetValue = value ?? 0;
    const startValue = prevValueRef.current;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth animation
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = startValue + (targetValue - startValue) * eased;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        prevValueRef.current = targetValue;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [value, indeterminate, error, animationDuration]);

  // Handle indeterminate animation
  useEffect(() => {
    if (!indeterminate || error) return;

    const interval = setInterval(() => {
      setIndeterminateValue((prev) => (prev + 1) % 101);
    }, 100);

    return () => clearInterval(interval);
  }, [indeterminate, error]);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3'
  };

  const currentValue = indeterminate ? indeterminateValue : displayValue;
  const progressLabel = labelFormat(currentValue);

  return (
    <div
      className={cn(
        "w-full space-y-2",
        error && "opacity-80",
        className
      )}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={currentValue}
      aria-label={ariaLabel ?? description ?? 'Loading progress'}
      aria-busy={indeterminate}
      aria-invalid={!!error}
    >
      {(description || error) && (
        <div className="flex justify-between text-sm">
          <span className={cn(
            "text-muted-foreground",
            error && "text-destructive"
          )}>
            {error ? error.message : description}
          </span>
          {showLabel && !error && (
            <span 
              className="text-muted-foreground"
              aria-hidden="true"
            >
              {progressLabel}
            </span>
          )}
        </div>
      )}
      <Progress
        value={currentValue} 
        className={cn(
          indeterminate && "animate-pulse",
          error && "bg-destructive/20",
          sizeClasses[size]
        )}
      />
      {!description && !error && showLabel && (
        <div 
          className="text-sm text-muted-foreground text-center"
          aria-hidden="true"
        >
          {progressLabel}
        </div>
      )}
      <span className="sr-only">
        {error ? error.message : progressLabel}
      </span>
    </div>
  );
} 