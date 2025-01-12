'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AUTH_ROUTES } from '@/lib/core/auth/routes';
import { useCore } from '@/lib/hooks/use-core';

export function LoginButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const { client } = useCore();

  // Check session state
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await client.auth.getSession();
        if (error) throw error;
        setHasSession(!!session);
      } catch (error) {
        console.error('Error', {
          message: 'Session check error',
          error
        });
        setHasSession(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [client]);

  const handleClick = useCallback(() => {
    if (hasSession) {
      router.replace(AUTH_ROUTES.PORTAL);
    } else {
      const returnUrl = encodeURIComponent(pathname || '/');
      router.replace(AUTH_ROUTES.getLoginRedirect(returnUrl));
    }
  }, [hasSession, pathname, router]);

  if (isLoading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      className="bg-brand-gold hover:bg-brand-darkGold text-white border-none"
    >
      {hasSession ? 'Go to Portal' : 'Sign In'}
    </Button>
  );
}