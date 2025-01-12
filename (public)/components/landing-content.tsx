'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Umbrella, TreePalmIcon as PalmTree, Car, Dumbbell, Users, Sun, Waves, Mountain, Utensils, Music, Palette, Clock, Plane } from 'lucide-react'
import Navigation from './Navigation'

function HighlightCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        <CardContent className="flex flex-col items-center text-center p-6">
          <div className="mb-4 text-[#EFC25D]">
            {icon}
          </div>
          <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#1E1E1E]">{title}</h3>
          <p className="text-sm md:text-base text-[#1E1E1E]">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function LuxuryFeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
        <CardContent className="flex flex-col items-center text-center p-6">
          <div className="mb-4">
            {icon}
          </div>
          <h3 className="text-lg md:text-xl font-semibold mb-2 text-[#1E1E1E]">{title}</h3>
          <p className="text-sm md:text-base text-[#1E1E1E]">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function AttractionCard({ name, distance, time, description, icon, image }: { 
  name: string, 
  distance: string, 
  time: string, 
  description: string, 
  icon: React.ReactNode,
  image: string 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        <div className="relative h-40 md:h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 transform hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-xl md:text-2xl font-bold text-white text-center px-4">{name}</h3>
          </div>
        </div>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-[#EFC25D]">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-xs md:text-sm font-semibold">{distance}</span>
            </div>
            <div className="flex items-center text-[#EFC25D]">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs md:text-sm font-semibold">{time}</span>
            </div>
          </div>
          <p className="text-[#1E1E1E] text-xs md:text-sm mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <div className="text-[#EFC25D]">
              {icon}
            </div>
            <Button variant="outline" size="sm" className="text-[#EFC25D] border-[#EFC25D] hover:bg-[#EFC25D] hover:text-white transition-colors duration-300">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function LandingContent() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          >
            <source src="https://rn1.ede.myftpupload.com/wp-content/uploads/2024/09/dji_video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
          <div className="relative z-20 text-center text-white px-4">
            <motion.h1 
              className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Discover Luxury at Florida Grande
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl lg:text-2xl mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your Premier Motor Coach Resort in Central Florida
            </motion.p>
            <motion.div 
              className="space-y-4 md:space-y-0 md:space-x-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button size="lg" asChild className="bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E] font-bold py-3 px-6 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-1">
                <Link href="/rentals">Explore Rentals</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-transparent hover:bg-white text-white hover:text-[#1E1E1E] font-bold py-3 px-6 rounded-full transition-all border-2 border-white hover:border-transparent">
                <a href="https://floridagrandeproperties.com/" target="_blank" rel="noopener noreferrer">
                  Ownership
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Luxury RV Living Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1E1E1E]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Luxury RV Living at Its Finest
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Florida Grande offers a premier RV community where you can embrace the ultimate Florida lifestyle. Enjoy spacious lots, resort-style amenities, and a vibrant community atmosphere. Find your perfect haven and start living your best life today.
            </motion.p>
          </div>
        </section>

        {/* Property Highlights */}
        <section className="py-16 bg-[#F5F5F5]">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1E1E1E]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Why Choose Florida Grande?
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HighlightCard 
                icon={<MapPin className="h-12 w-12 md:h-16 md:w-16 text-[#EFC25D]" />}
                title="Prime Location"
                description="Centrally located near Florida's top attractions"
              />
              <HighlightCard 
                icon={<Umbrella className="h-12 w-12 md:h-16 md:w-16 text-[#EFC25D]" />}
                title="Luxurious Amenities"
                description="20,000 sq ft clubhouse, pool, and more"
              />
              <HighlightCard 
                icon={<PalmTree className="h-12 w-12 md:h-16 md:w-16 text-[#EFC25D]" />}
                title="Spacious Lots"
                description="26'x76' concrete pads with full hookups"
              />
            </div>
          </div>
        </section>

        {/* Unwind in Luxury Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#1E1E1E]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Unwind in Luxury
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Experience first-class amenities centered around our impressive 20,000 square foot clubhouse.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              <LuxuryFeatureCard
                icon={<Dumbbell className="h-10 w-10 md:h-12 md:w-12 text-[#EFC25D]" />}
                title="Fitness Center"
                description="Stay active with state-of-the-art equipment"
              />
              <LuxuryFeatureCard
                icon={<Umbrella className="h-10 w-10 md:h-12 md:w-12 text-[#EFC25D]" />}
                title="Pool & Hot Tub"
                description="Relax in our heated pool or unwind in the spa"
              />
              <LuxuryFeatureCard
                icon={<Users className="h-10 w-10 md:h-12 md:w-12 text-[#EFC25D]" />}
                title="Grande Room"
                description="Host unforgettable celebrations and events"
              />
              <LuxuryFeatureCard
                icon={<Utensils className="h-10 w-10 md:h-12 md:w-12 text-[#EFC25D]" />}
                title="Outdoor Pavilion"
                description="Gather with friends for outdoor dining"
              />
              <LuxuryFeatureCard
                icon={<Palette className="h-10 w-10 md:h-12 md:w-12 text-[#EFC25D]" />}
                title="Craft Room"
                description="Pursue your hobbies and creative passions"
              />
              <LuxuryFeatureCard
                icon={<Music className="h-10 w-10 md:h-12 md:w-12 text-[#EFC25D]" />}
                title="Entertainment"
                description="Enjoy card games, dances, and more"
              />
            </div>
            <div className="text-center">
              <Button asChild className="bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E] font-bold py-3 px-6 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-1">
                <Link href="/amenities">Explore All Amenities</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ownership Section */}
        <section className="py-16 bg-[#1E1E1E] text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Own Your Piece of Paradise
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Discover the benefits of owning a lot at Florida Grande Motor Coach Resort
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button size="lg" asChild className="bg-[#EFC25D] hover:bg-[#D5AD4E] text-[#1E1E1E] font-bold py-3 px-8 rounded-full transition-all hover:shadow-lg transform hover:-translate-y-1">
                <a href="https://floridagrandeproperties.com/" target="_blank" rel="noopener noreferrer">
                  Explore Ownership Opportunities
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Nearby Attractions */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-16 text-[#1E1E1E]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Nearby Attractions
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AttractionCard 
                name="Orlando International Airport" 
                distance="59 mi"
                time="1 hour"
                description="Your gateway to Central Florida's world-famous attractions."
                icon={<Plane className="h-6 w-6 md:h-8 md:w-8" />}
                image="https://upload.wikimedia.org/wikipedia/commons/1/16/Orlando_International_Airport_Intermodal_Terminal_%2824691228848%29.jpg"
              />
              <AttractionCard 
                name="Disney World" 
                distance="57 mi"
                time="1 hour"
                description="Experience the magic of the world's most famous theme park."
                icon={<Sun className="h-6 w-6 md:h-8 md:w-8" />}
                image="https://ktla.com/wp-content/uploads/sites/4/2021/06/AP21173416004367.jpg?w=2560&h=1440&crop=1"
              />
              <AttractionCard 
                name="Universal Studios" 
                distance="57 mi"
                time="1 hour"
                description="Immerse yourself in the movies at this thrilling theme park."
                icon={<Mountain className="h-6 w-6 md:h-8 md:w-8" />}
                image="https://www.attractiontickets.com/sites/default/files/2024-06/universal-studios-entrance.jpg"
              />
              <AttractionCard 
                name="Clearwater Beach" 
                distance="87 mi"
                time="1 hour 30 minutes"
                description="Relax on the white sands of one of America's best beaches."
                icon={<Waves className="h-6 w-6 md:h-8 md:w-8" />}
                image="https://media1.thrillophilia.com/filestore/c3b6ux4q9whymijmripva1cbnd3m_shutterstock_1314556250.jpg"
              />
              <AttractionCard 
                name="World Equestrian Center" 
                distance="50 mi"
                time="45 minutes"
                description="Visit the largest equestrian complex in the United States."
                icon={<PalmTree className="h-6 w-6 md:h-8 md:w-8" />}
                image="https://www.horseillustrated.com/wp-content/uploads/1-WEC.jpg"
              />
              <AttractionCard 
                name="Busch Gardens" 
                distance="60 mi"
                time="1 hour"
                description="Enjoy thrilling rides and amazing animal encounters."
                icon={<Mountain className="h-6 w-6 md:h-8 md:w-8" />}
                image="https://orlandoinformer.com/wp-content/uploads/2021/11/20210714-DSC09791.jpg"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
} 