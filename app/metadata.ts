import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#EFC25D',
  colorScheme: 'light'
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    template: '%s | Florida Grande Motor Coach Resort',
    default: 'Florida Grande Motor Coach Resort'
  },
  description: 'Luxury Motor Coach Resort in Webster, Florida',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#EFC25D'
      }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Florida Grande Motor Coach Resort',
    description: 'Luxury Motor Coach Resort in Webster, Florida',
    siteName: 'Florida Grande Motor Coach Resort',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Florida Grande Motor Coach Resort'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Florida Grande Motor Coach Resort',
    description: 'Luxury Motor Coach Resort in Webster, Florida',
    images: ['/og-image.png']
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Florida Grande Motor Coach Resort'
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
    url: true
  },
  other: {
    'msapplication-TileColor': '#EFC25D',
    'theme-color': '#EFC25D'
  }
} 