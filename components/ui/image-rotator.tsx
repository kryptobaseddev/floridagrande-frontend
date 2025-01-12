'use client'

// Handles image rotation with smooth transitions
// Configurable interval
// Supports different aspect ratios
// Uses Framer Motion for animations
// Fully responsive

import * as React from "react"
import Image from "next/image"
import { motion, AnimatePresence } from 'framer-motion'

interface ImageRotatorProps {
  images: string[]
  interval?: number
  className?: string
  aspectRatio?: "square" | "video" | "wide"
  fill?: boolean
  width?: number
  height?: number
}

export function ImageRotator({
  images,
  interval = 5000,
  className,
  aspectRatio = "video",
  fill = false,
  width,
  height,
}: ImageRotatorProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const aspectRatioClass = {
    square: "aspect-square",
    video: "aspect-video",
    wide: "aspect-[16/6]",
  }[aspectRatio]

  return (
    <div className={`relative overflow-hidden ${aspectRatioClass} ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`Rotating image ${currentIndex + 1}`}
            className="object-cover"
            fill={fill}
            width={!fill ? width : undefined}
            height={!fill ? height : undefined}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
