// import '@/app/globals.css'
import type { Metadata } from 'next'
import ChatBot from './components/ChatBot'
import Footer from './components/Footer'

export const metadata: Metadata = {
  title: 'Florida Grande Motor Coach Resort',
  description: 'Luxury RV living in Central Florida',
}

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow">
        {children}
      </main>
      <ChatBot />
      <Footer />
    </div>
  )
}

