'use client'

import * as React from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from 'framer-motion'

interface ImageViewerModalProps {
  images: string[]
  open: boolean
  onOpenChange: (open: boolean) => void
  currentImageIndex?: number
  onIndexChange?: (index: number) => void
}

export function ImageViewerModal({
  images,
  open,
  onOpenChange,
  currentImageIndex = 0,
  onIndexChange
}: ImageViewerModalProps) {
  const [activeIndex, setActiveIndex] = React.useState(currentImageIndex)

  React.useEffect(() => {
    setActiveIndex(currentImageIndex)
  }, [currentImageIndex])

  const handlePrevious = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length
    setActiveIndex(newIndex)
    onIndexChange?.(newIndex)
  }

  const handleNext = () => {
    const newIndex = (activeIndex + 1) % images.length
    setActiveIndex(newIndex)
    onIndexChange?.(newIndex)
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return
      if (e.key === 'ArrowLeft') handlePrevious()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'Escape') onOpenChange(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, activeIndex])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 bg-black/90">
        <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:bg-white/20 z-50"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <div className="relative w-full h-full flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[activeIndex]}
                  alt={`Image ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 z-50"
            onClick={handleNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => {
                  setActiveIndex(index)
                  onIndexChange?.(index)
                }}
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
