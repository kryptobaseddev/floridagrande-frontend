'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import ContactForm from './ContactForm'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { AUTH_ROUTES } from '@/lib/core/auth/routes'

export default function Navigation() {
  const [scrollY, setScrollY] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Rentals', href: '/rentals' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Ownership', href: 'https://floridagrandeproperties.com/', external: true },
  ]

  return (
    <>
      <header className="fixed w-full z-50 bg-[#1E1E1E] shadow-md transition-all duration-300" style={{ padding: `${Math.max(0.5, 1 - scrollY / 500)}rem 0` }}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-12 w-auto flex items-center gap-3"
          >
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logos/logo-round.webp"
                alt="Florida Grande Logo"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <span className="text-white text-xl font-semibold">Florida Grande</span>
            </Link>
          </motion.div>
          <nav className="hidden md:flex items-center">
            <ul className="flex space-x-6">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-white hover:text-[#EFC25D] font-semibold transition-colors"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {item.name}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button 
                  onClick={() => setShowContactForm(true)}
                  className="text-white hover:text-[#EFC25D] font-semibold transition-colors"
                >
                  Contact
                </button>
              </motion.li>
            </ul>
            <Button asChild className="ml-6 bg-[#EFC25D] text-[#1E1E1E] hover:bg-[#D5AD4E]">
              <Link href={AUTH_ROUTES.LOGIN}>Login</Link>
            </Button>
          </nav>
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#1E1E1E] md:hidden"
          >
            <div className="flex flex-col h-full pt-20 px-4">
              <nav>
                <ul className="space-y-4">
                  {navItems.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="text-white hover:text-[#EFC25D] font-semibold text-2xl transition-colors block py-2"
                        {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <button 
                      onClick={() => {
                        setShowContactForm(true)
                        setIsMenuOpen(false)
                      }}
                      className="text-white hover:text-[#EFC25D] font-semibold text-2xl transition-colors block py-2"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="mt-8">
                <Button asChild className="w-full bg-[#EFC25D] text-[#1E1E1E] hover:bg-[#D5AD4E]">
                  <Link href={AUTH_ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>Login</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <ContactForm onClose={() => setShowContactForm(false)} />
          </div>
        </div>
      )}
    </>
  )
}

