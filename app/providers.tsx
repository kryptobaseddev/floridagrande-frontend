'use client';

import { RootProvider } from '@/components/providers/root-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <RootProvider>{children}</RootProvider>
} 