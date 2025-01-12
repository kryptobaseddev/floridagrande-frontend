'use client';

import React from "react";
import { usePathname } from "next/navigation";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  correlationId?: string;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

// Wrapper component to handle route changes
function ErrorBoundaryWrapper({ children, fallback, onError }: ErrorBoundaryProps) {
  const pathname = usePathname();
  const boundaryRef = React.useRef<ErrorBoundary>(null);

  React.useEffect(() => {
    if (boundaryRef.current?.state.hasError) {
      boundaryRef.current.resetError();
    }
  }, [pathname]);

  return (
    <ErrorBoundary ref={boundaryRef} fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      correlationId: undefined
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error with proper operation tracking
    console.error('Error', {
      domain: 'ErrorBoundary',
      error,
      component: this.constructor.name,
      reactErrorInfo: errorInfo
    });
    
    this.setState({ 
      errorInfo
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = () => {
    const { correlationId } = this.state;
    if (correlationId) {
      console.info('Error boundary reset', {
        domain: 'ErrorBoundary',
        action: 'reset',
        component: this.constructor.name,
        correlationId
      });
    }

    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null,
      correlationId: undefined
    });
  }

  private handleReload = () => {
    const { correlationId } = this.state;
    if (correlationId) {
      console.info('Error boundary reload', {
        domain: 'ErrorBoundary',
        action: 'reload',
        component: this.constructor.name,
        correlationId
      });
    }
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex items-center justify-center min-h-[400px] p-4">
          <Card className="w-full max-w-lg p-6">
            <div className="flex flex-col items-center text-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-destructive mb-4" />
              <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>
                  {this.state.error?.message || "An unexpected error occurred"}
                </AlertDescription>
              </Alert>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={this.resetError}
                >
                  Try Again
                </Button>
                <Button
                  variant="default"
                  onClick={this.handleReload}
                >
                  Reload Page
                </Button>
              </div>
              {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
                <details className="mt-4 text-left w-full">
                  <summary className="cursor-pointer text-sm text-muted-foreground">Error Details</summary>
                  <pre className="mt-2 text-xs bg-muted p-4 rounded overflow-auto max-h-[200px]">
                    {this.state.error?.stack}
                    {'\n\nComponent Stack:\n'}
                    {this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Export the wrapper instead of the ErrorBoundary directly
export { ErrorBoundaryWrapper as ErrorBoundary };