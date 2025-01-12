import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1E1E1E] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Florida Grande Motor Coach Resort</h3>
            <p className="mb-2">9675 SE 49th Terrace</p>
            <p className="mb-2">Webster, FL 33597</p>
            <p className="mb-2">Phone: (352) 569-1169</p>
            <p>Email: info@fgpoa.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-[#EFC25D]">Home</Link></li>
              <li><Link href="/rentals" className="hover:text-[#EFC25D]">Rentals</Link></li>
              <li><Link href="/amenities" className="hover:text-[#EFC25D]">Amenities</Link></li>
              <li><Link href="https://floridagrandeproperties.com/" className="hover:text-[#EFC25D]" target="_blank" rel="noopener noreferrer">Ownership</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-4">Office Hours: Monday to Friday, 9 AM to 5 PM EST</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EFC25D]">
                <Facebook />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EFC25D]">
                <Instagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#EFC25D]">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Florida Grande Motor Coach Resort. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

