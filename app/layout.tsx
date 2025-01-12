import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ChatBot from '@/components/ChatBot'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Florida Grande Motor Coach Resort',
  description: 'Luxury RV living in Central Florida',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ChatBot />
        <Footer />
      </body>
    </html>
  )
}

