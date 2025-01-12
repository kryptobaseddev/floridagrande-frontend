'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react'

export default function RentalBooking() {
  const [selectedRental, setSelectedRental] = useState(null)

  const availableRentals = [
    { 
      id: 1, 
      name: 'Luxury Lot A1', 
      size: '26\' x 76\'', 
      rate: '$75/night', 
      image: '/placeholder.svg?height=300&width=400',
      description: 'Spacious luxury lot with full hookups and premium landscaping.',
      amenities: ['Full Hookups', 'Concrete Pad', 'Landscaped', 'Wi-Fi'],
      images: [
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400'
      ]
    },
    { 
      id: 2, 
      name: 'Premium Lot B3', 
      size: '26\' x 76\'', 
      rate: '$80/night', 
      image: '/placeholder.svg?height=300&width=400',
      description: 'Premium corner lot with extra space and privacy.',
      amenities: ['Full Hookups', 'Concrete Pad', 'Corner Lot', 'Wi-Fi'],
      images: [
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400'
      ]
    },
    { 
      id: 3, 
      name: 'Deluxe Lot C5', 
      size: '26\' x 76\'', 
      rate: '$85/night', 
      image: '/placeholder.svg?height=300&width=400',
      description: 'Deluxe lot with a view of the central lake.',
      amenities: ['Full Hookups', 'Concrete Pad', 'Lake View', 'Wi-Fi'],
      images: [
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400'
      ]
    },
    { 
      id: 4, 
      name: 'Executive Lot D7', 
      size: '26\' x 76\'', 
      rate: '$90/night', 
      image: '/placeholder.svg?height=300&width=400',
      description: 'Executive lot with premium amenities and extra privacy.',
      amenities: ['Full Hookups', 'Concrete Pad', 'Private Patio', 'Wi-Fi'],
      images: [
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400',
        '/placeholder.svg?height=300&width=400'
      ]
    },
  ]

  return (
    <div>
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-[#1E1E1E]">Available Rentals</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {availableRentals.map((rental) => (
              <CarouselItem key={rental.id} className="md:basis-1/2 lg:basis-1/3">
                <RentalCard rental={rental} onSelect={() => setSelectedRental(rental)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      <section id="reservation-form" className="mb-16">
        <h2 className="text-3xl font-semibold mb-6 text-[#1E1E1E]">Make a Reservation</h2>
        <Card className="bg-white shadow-lg">
          <CardContent className="p-6">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="arrival">Arrival Date</Label>
                  <Input type="date" id="arrival" name="arrival" required />
                </div>
                <div>
                  <Label htmlFor="departure">Departure Date</Label>
                  <Input type="date" id="departure" name="departure" required />
                </div>
              </div>
              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input type="number" id="guests" name="guests" min="1" required />
              </div>
              <div>
                <Label htmlFor="lot-type">Preferred Lot Type</Label>
                <Select name="lot-type">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a lot type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury Lot</SelectItem>
                    <SelectItem value="premium">Premium Lot</SelectItem>
                    <SelectItem value="deluxe">Deluxe Lot</SelectItem>
                    <SelectItem value="executive">Executive Lot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="special-requests">Special Requests</Label>
                <Textarea id="special-requests" name="special-requests" placeholder="Any special requests or accommodations?" />
              </div>
              <Button type="submit" className="w-full bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E] text-lg py-3">Book Your Stay</Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {selectedRental && (
        <Dialog open={!!selectedRental} onOpenChange={() => setSelectedRental(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedRental.name}</DialogTitle>
              <DialogDescription>{selectedRental.description}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Carousel className="w-full">
                <CarouselContent>
                  {selectedRental.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <Image src={image} alt={`${selectedRental.name} - Image ${index + 1}`} width={400} height={300} className="w-full h-48 object-cover rounded-lg" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div>
                <h4 className="font-semibold mb-2">Amenities:</h4>
                <ul className="list-disc list-inside">
                  {selectedRental.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">{selectedRental.rate}</span>
                <Button className="bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E]" onClick={() => document.getElementById('reservation-form').scrollIntoView({ behavior: 'smooth' })}>
                  Book Now
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function RentalCard({ rental, onSelect }) {
  return (
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
      <Image src={rental.image} alt={rental.name} width={400} height={300} className="w-full h-48 object-cover rounded-t-lg" />
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-[#1E1E1E]">{rental.name}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{rental.size}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <DollarSign className="h-4 w-4 mr-1" />
          <span>{rental.rate}</span>
        </div>
        <Button className="w-full bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E]" onClick={onSelect}>
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

