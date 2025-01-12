'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dumbbell, Umbrella, Users, TreePalmIcon as PalmTree, Wifi, Utensils, Car, Tv } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function AmenitiesPage() {
  const amenities = [
    { icon: <Dumbbell className="h-8 w-8" />, name: 'Fitness Center', description: 'State-of-the-art equipment for your workout needs', image: '/placeholder.svg?height=200&width=300' },
    { icon: <Umbrella className="h-8 w-8" />, name: 'Swimming Pool', description: 'Heated pool and hot tub for year-round enjoyment', image: '/placeholder.svg?height=200&width=300' },
    { icon: <Users className="h-8 w-8" />, name: 'Clubhouse', description: '20,000 sq ft facility for social gatherings and events', image: '/placeholder.svg?height=200&width=300' },
    { icon: <PalmTree className="h-8 w-8" />, name: 'Nature Trails', description: 'Scenic walking paths throughout the resort', image: '/placeholder.svg?height=200&width=300' },
    { icon: <Wifi className="h-8 w-8" />, name: 'Wi-Fi', description: 'High-speed internet access throughout the resort', image: '/placeholder.svg?height=200&width=300' },
    { icon: <Utensils className="h-8 w-8" />, name: 'Picnic Areas', description: 'Outdoor grilling and dining spaces', image: '/placeholder.svg?height=200&width=300' },
    { icon: <Car className="h-8 w-8" />, name: 'Car Wash', description: 'Dedicated area for washing your vehicles', image: '/placeholder.svg?height=200&width=300' },
    { icon: <Tv className="h-8 w-8" />, name: 'Cable TV', description: 'Premium cable channels included with your stay', image: '/placeholder.svg?height=200&width=300' },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-[#1E1E1E]">Amenities at Florida Grande</h1>
        
        <section className="mb-16">
          <div className="bg-[#F5F5F5] border-l-4 border-[#EFC25D] p-6 rounded-r-lg shadow-md">
            <p className="text-lg leading-relaxed text-[#1E1E1E]">
              At Florida Grande Motor Coach Resort, we pride ourselves on offering a wide range of top-notch amenities to ensure your stay is comfortable, enjoyable, and memorable. Whether you're looking to stay active, relax, or socialize, we have something for everyone.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#1E1E1E]">Our Amenities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-sm">
                  <Image src={amenity.image} alt={amenity.name} width={300} height={200} className="w-full h-40 object-cover rounded-t-lg" />
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl text-[#1E1E1E]">
                      <span className="mr-4 text-[#EFC25D]">{amenity.icon}</span>
                      {amenity.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{amenity.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#1E1E1E]">Resort Map</h2>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Coming Soon</p>
                </div>
              </div>
              <Button asChild className="w-full bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E]">
                <Link href="/rentals">Explore Available Rentals</Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#1E1E1E]">Seasonal Activities</h2>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <p className="mb-4">
                Florida Grande offers a variety of seasonal activities to keep our guests entertained and engaged throughout the year. Some of our popular activities include:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Weekly potluck dinners</li>
                <li>Movie nights in the clubhouse</li>
                <li>Organized day trips to nearby attractions</li>
                <li>Holiday celebrations and themed parties</li>
                <li>Fitness classes and wellness workshops</li>
                <li>Arts and crafts sessions</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[#1E1E1E]">Local Attractions</h2>
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6">
              <p className="mb-4">
                While our resort offers plenty to keep you entertained, we're also conveniently located near some of Florida's most popular attractions:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Disney World & Universal Studios (57 miles)</li>
                <li>Busch Gardens (60 miles)</li>
                <li>Clearwater Beach (87 miles)</li>
                <li>World Equestrian Center in Ocala (50 miles)</li>
                <li>The Villages (15 miles)</li>
                <li>Brownwood Paddock Square (12 miles)</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  )
}

