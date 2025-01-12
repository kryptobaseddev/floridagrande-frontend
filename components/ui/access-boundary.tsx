'use client';

import React from "react";
import { NoSymbolIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface AccessBoundaryProps {
  children: React.ReactNode;
  isAuthorized: boolean;
  isLoading?: boolean;
  fallback?: React.ReactNode;
  onAccessDenied?: () => void;
  redirectPath?: string;
}

export function AccessBoundary({
  children,
  isAuthorized,
  isLoading = false,
  fallback,
  onAccessDenied,
  redirectPath,
}: AccessBoundaryProps) {
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthorized) {
      onAccessDenied?.();
    }
  }, [isLoading, isAuthorized, onAccessDenied]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="w-full max-w-lg p-6">
          <div className="flex flex-col items-center text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EFC25D] mb-4" />
            <p className="text-gray-500">Checking access permissions...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAuthorized) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-full max-w-lg p-6">
          <div className="flex flex-col items-center text-center">
            <NoSymbolIcon className="h-12 w-12 text-red-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-500 mb-4">
              You don&apos;t have permission to access this page. Please contact your administrator if you believe this is a mistake.
            </p>
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => {
                  window.history.back();
                }}
              >
                Go Back
              </Button>
              {redirectPath && (
                <Button
                  onClick={() => {
                    router.push(redirectPath);
                  }}
                >
                  Go to Home
                </Button>
              )}
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return children;
}
