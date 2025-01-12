'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Dumbbell, Umbrella, Users, TreePalmIcon as PalmTree, Wifi, 
  Utensils, WavesLadder, Tv, BookOpen, Table2, Briefcase, 
  Dices, Mail, Calendar, Ticket, MapPin, PartyPopper, Mountain, Building2
} from 'lucide-react'
import Navigation from '../components/Navigation'
import { ImageRotator } from '@/components/ui/image-rotator'
import { CardCarousel } from '@/components/ui/card-carousel'
import { getDirectoryImages } from '@/lib/utils/get-directory-images'

export default function AmenitiesPage() {
  const [weeklyGatheringsImages, setWeeklyGatheringsImages] = useState<string[]>([])
  const [outdoorActivitiesImages, setOutdoorActivitiesImages] = useState<string[]>([])
  const [socialEventsImages, setSocialEventsImages] = useState<string[]>([])
  const [themeParksImages, setThemeParksImages] = useState<string[]>([])
  const [beachesNatureImages, setBeachesNatureImages] = useState<string[]>([])
  const [localEntertainmentImages, setLocalEntertainmentImages] = useState<string[]>([])

  useEffect(() => {
    const loadImages = async () => {
      const [weekly, outdoor, social, parks, beaches, local] = await Promise.all([
        getDirectoryImages('seasonal-activities/weekly-gatherings'),
        getDirectoryImages('seasonal-activities/outdoor-activities'),
        getDirectoryImages('seasonal-activities/social-events'),
        getDirectoryImages('local-attractions/theme-parks'),
        getDirectoryImages('local-attractions/beaches-nature'),
        getDirectoryImages('local-attractions/local-entertainment')
      ])

      setWeeklyGatheringsImages(weekly)
      setOutdoorActivitiesImages(outdoor)
      setSocialEventsImages(social)
      setThemeParksImages(parks)
      setBeachesNatureImages(beaches)
      setLocalEntertainmentImages(local)
    }

    loadImages()
  }, [])

  const amenities = [
    { 
      icon: <Dumbbell className="h-8 w-8" />, 
      name: 'Fitness Center', 
      description: 'State-of-the-art equipment for your workout needs', 
      image: '/amenities/amenities-gym-1.webp' 
    },
    { 
      icon: <WavesLadder className="h-8 w-8" />, 
      name: 'Swimming Pool', 
      description: 'Heated pool and hot tub for year-round enjoyment', 
      image: '/amenities/amenities-pool-1.webp' 
    },
    { 
      icon: <Users className="h-8 w-8" />, 
      name: 'Clubhouse', 
      description: '20,000 sq ft facility for social gatherings and events', 
      image: '/amenities/amenities-clubhouse-1.webp' 
    },
    { 
      icon: <PalmTree className="h-8 w-8" />, 
      name: 'Nature Trails', 
      description: 'Scenic walking paths throughout the resort', 
      image: '/amenities/amenities-scenic-1.webp' 
    },
    { 
      icon: <BookOpen className="h-8 w-8" />, 
      name: 'Library', 
      description: 'Quiet reading space with a diverse collection of books', 
      image: '/amenities/amenities-library-1.webp' 
    },
    { 
      icon: <Table2 className="h-8 w-8" />, 
      name: 'Pickleball Courts', 
      description: 'Professional pickleball courts for active lifestyle', 
      image: '/amenities/amenities-pickleball-1.webp' 
    },
    { 
      icon: <Briefcase className="h-8 w-8" />, 
      name: 'Business Center', 
      description: 'Professional workspace with essential business amenities', 
      image: '/amenities/amenities-businesscenter-1.webp' 
    },
    { 
      icon: <Dices className="h-8 w-8" />, 
      name: 'Billiard Room', 
      description: 'Game room featuring pool tables and poker tables for entertainment', 
      image: '/amenities/amenities-billiard-1.webp' 
    },
    { 
      icon: <Mail className="h-8 w-8" />, 
      name: 'Laundry/Mail Room', 
      description: 'Convenient on-site laundry facilities and mail services', 
      image: '/amenities/amenities-laundry-1.webp' 
    }
  ]

  const activities = [
    { 
      title: "Weekly Gatherings",
      icon: <Calendar className="h-6 w-6 text-[#EFC25D]" />,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-600">Weekly potluck dinners</li>
          <li className="text-gray-600">Movie nights in the clubhouse</li>
        </ul>
      ),
      images: weeklyGatheringsImages
    },
    { 
      title: "Outdoor Activities",
      icon: <Mountain className="h-6 w-6 text-[#EFC25D]" />,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-600">Organized day trips to nearby attractions</li>
          <li className="text-gray-600">Fitness classes and wellness workshops</li>
        </ul>
      ),
      images: outdoorActivitiesImages
    },
    { 
      title: "Social Events",
      icon: <PartyPopper className="h-6 w-6 text-[#EFC25D]" />,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-600">Holiday celebrations and themed parties</li>
          <li className="text-gray-600">Arts and crafts sessions</li>
        </ul>
      ),
      images: socialEventsImages
    }
  ]

  const attractions = [
    { 
      title: "Theme Parks",
      icon: <Ticket className="h-6 w-6 text-[#EFC25D]" />,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-600">Disney World & Universal Studios (57 miles)</li>
          <li className="text-gray-600">Busch Gardens (60 miles)</li>
        </ul>
      ),
      images: themeParksImages
    },
    {
      title: "Beaches & Nature",
      icon: <Umbrella className="h-6 w-6 text-[#EFC25D]" />,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-600">Clearwater Beach (87 miles)</li>
          <li className="text-gray-600">World Equestrian Center in Ocala (50 miles)</li>
        </ul>
      ),
      images: beachesNatureImages
    },
    {
      title: "Local Entertainment",
      icon: <Building2 className="h-6 w-6 text-[#EFC25D]" />,
      content: (
        <ul className="list-disc list-inside space-y-2">
          <li className="text-gray-600">The Villages (15 miles)</li>
          <li className="text-gray-600">Brownwood Paddock Square (12 miles)</li>
        </ul>
      ),
      images: localEntertainmentImages
    }
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
                className="w-full"
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 w-full h-[400px] flex flex-col">
                  <div className="relative w-full h-48">
                    <ImageRotator 
                      images={[amenity.image]}
                      fill
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardHeader className="flex-none">
                    <CardTitle className="flex items-center text-xl text-[#1E1E1E]">
                      <span className="mr-4 text-[#EFC25D]">{amenity.icon}</span>
                      {amenity.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-600">{amenity.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-[#1E1E1E]">Seasonal Activities</h2>
          <CardCarousel 
            items={activities}
            autoplayInterval={5000}
            cardClassName="h-[400px]"
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-[#1E1E1E]">Local Attractions</h2>
          <CardCarousel 
            items={attractions}
            autoplayInterval={5000}
            cardClassName="h-[400px]"
          />
        </section>
      </main>
    </div>
  )
}
