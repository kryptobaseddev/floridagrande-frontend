'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from '../components/Navigation'
import ContactForm from '../components/ContactForm'
// import RentalBooking from '@/components/RentalBooking'

export default function RentalsPage() {
  const [showContactForm, setShowContactForm] = useState(false)

  const documents = [
    { title: 'Rental Agreement', description: 'Terms and conditions for renting at Florida Grande', pdfUrl: '/documents/rental-agreement.pdf' },
    { title: 'Rules and Regulations', description: 'Guidelines for all guests staying at Florida Grande', pdfUrl: '/documents/rules-regulations.pdf' },
    { title: 'Rental Consent Form', description: 'Required consent form for all renters', pdfUrl: '/documents/rental-consent.pdf' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-[#1E1E1E]">Rentals at Florida Grande</h1>
        
        <section className="mb-16">
          <Card className="bg-[#F5F5F5] border-l-4 border-[#EFC25D]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#1E1E1E]">Rental Booking Coming Soon</h2>
              <p className="text-lg leading-relaxed text-[#1E1E1E] mb-4">
                We're excited to announce that our online rental booking system is currently under development. Soon, you'll be able to easily browse available lots, check rates, and make reservations directly through our website.
              </p>
              <p className="text-lg leading-relaxed text-[#1E1E1E]">
                In the meantime, please contact our office for rental inquiries and bookings. We appreciate your patience and look forward to providing you with a seamless booking experience in the near future.
              </p>
              <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-[#1E1E1E]">Contact Information</h3>
                <p className="mb-2">Phone: (352) 569-1169</p>
                <p className="mb-2">Email: info@fgpoa.com</p>
                <p>Office Hours: Monday to Friday, 9 AM to 5 PM EST</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-[#1E1E1E]">General Rental Information</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="list-disc list-inside space-y-4">
                <li>Spacious 26' x 76' lots with full hookups</li>
                <li>Access to all resort amenities included with your stay</li>
                <li>Check-in time: 12:00 PM, Check-out time: 11:00 AM</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-[#1E1E1E]">Important Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {documents.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{doc.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{doc.description}</p>
                    <Button asChild className="w-full bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E]">
                      <Link href={doc.pdfUrl} target="_blank" rel="noopener noreferrer">View PDF</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#1E1E1E]">Need More Information?</h2>
              <p className="text-lg mb-4">
                If you have any questions about renting at Florida Grande or would like to make a reservation, please don't hesitate to contact us.
              </p>
              <Button onClick={() => setShowContactForm(true)} className="bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E]">
                Contact Us
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <Card className="bg-[#F5F5F5] border-l-4 border-[#EFC25D]">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-[#1E1E1E]">Cancellation Policy</h2>
              <div className="mt-6 bg-[#F5F5F5] p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-[#1E1E1E]">Cancellation Policy</h3>
                <ul className="list-disc list-inside space-y-3">
                  <li>Full refund minus $25 processing fee if canceled at least 60 days prior to arrival date</li>
                  <li>Cancellations less than 60 days from arrival date result in forfeiture of entire deposit</li>
                  <li>Refunds are not issued after check-in for any reason, except if mandated by the state for evacuation</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Uncomment this section when ready to implement rental booking */}
        {/* <RentalBooking /> */}
      </main>

      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <ContactForm onClose={() => setShowContactForm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
