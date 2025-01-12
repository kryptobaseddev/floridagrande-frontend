// app/layout.tsx
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { RootProvider } from '@/components/providers/root-provider'
import { metadata, viewport } from './metadata'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Force dynamic rendering for auth state
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-brand-cream font-sans antialiased">
        <RootProvider>
          <Toaster />
          {children}
        </RootProvider>
      </body>
    </html>
  )
}