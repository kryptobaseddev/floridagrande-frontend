'use client'

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ImageRotator } from "./image-rotator"
import { ImageViewerModal } from "./image-viewer-modal"

interface CardCarouselProps {
  items: {
    title?: string
    icon?: React.ReactNode
    content: React.ReactNode
    images?: string[]
    imageDirectory?: string
  }[]
  autoplayInterval?: number
  showControls?: boolean
  className?: string
  cardClassName?: string
}

export function CardCarousel({
  items,
  autoplayInterval = 5000,
  showControls = true,
  className = "",
  cardClassName = ""
}: CardCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: autoplayInterval, stopOnInteraction: true })
  )

  const [selectedImages, setSelectedImages] = React.useState<string[]>([])
  const [isViewerOpen, setIsViewerOpen] = React.useState(false)
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

  const handleImageClick = (images: string[]) => {
    setSelectedImages(images)
    setCurrentImageIndex(0)
    setIsViewerOpen(true)
  }

  return (
    <>
      <Carousel
        plugins={[plugin.current]}
        className={`w-full ${className}`}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className={`h-full ${cardClassName}`}>
                  {item.images && item.images.length > 0 && (
                    <div 
                      className="relative w-full h-48 cursor-pointer"
                      onClick={() => handleImageClick(item.images!)}
                    >
                      <ImageRotator
                        images={item.images}
                        fill
                        className="rounded-t-lg"
                      />
                    </div>
                  )}
                  {(item.title || item.icon) && (
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        {item.icon}
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                  )}
                  <CardContent>
                    {item.content}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {showControls && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )}
      </Carousel>

      <ImageViewerModal
        images={selectedImages}
        open={isViewerOpen}
        onOpenChange={setIsViewerOpen}
        currentImageIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
      />
    </>
  )
}
