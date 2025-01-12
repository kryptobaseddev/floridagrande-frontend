import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
    preferredContact: ''
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Show confirmation modal
    setShowConfirmation(true)
    // Reset form
    setFormData({ name: '', email: '', phone: '', reason: '', message: '', preferredContact: '' })
  }

  return (
    <>
      <p className="text-sm text-gray-600 mb-4">
        We will review and respond to your message during our normal business hours: Monday to Friday, 9 AM to 5 PM EST.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="reason">Reason for Contact</Label>
          <Select name="reason" onValueChange={(value) => handleChange({ target: { name: 'reason', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="reservation">Reservation Question</SelectItem>
              <SelectItem value="amenities">Amenities Information</SelectItem>
              <SelectItem value="ownership">Ownership Opportunities</SelectItem>
              <SelectItem value="feedback">Feedback</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Please provide details about your inquiry..."
          />
        </div>
        <div>
          <Label htmlFor="preferredContact">Preferred Contact Method</Label>
          <Select name="preferredContact" onValueChange={(value) => handleChange({ target: { name: 'preferredContact', value } })}>
            <SelectTrigger>
              <SelectValue placeholder="Select preferred contact method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="phone">Phone</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-[#FFD700] hover:bg-[#E5C100] text-[#1E1E1E]">
            Send Message
          </Button>
        </div>
      </form>
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="mb-4">Your message has been sent. We will review and respond during our normal business hours (Monday to Friday, 9 AM to 5 PM EST).</p>
            <p className="mb-4">For immediate assistance, please contact us:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Phone: (352) 569-1169</li>
              <li>Email: info@fgpoa.com</li>
            </ul>
            <Button onClick={() => {setShowConfirmation(false); onClose();}} className="w-full bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E]">
              Close
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

