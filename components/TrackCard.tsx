import { urlForImage } from 'lib/sanity.image'
import { Track } from 'lib/sanity.queries'
import Image from 'next/image'
import { useState } from 'react'

interface TrackCardProps {
  track: Track
}

export default function TrackCard({ track }: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isTapped, setIsTapped] = useState(false)
  const { title, artist, coverImage, trackUrl, producerRole } = track

  // Check if it's a placeholder
  const isPlaceholder = !track.coverImage

  const handleClick = () => {
    if (isPlaceholder) return

    // On mobile, first tap shows details, second tap opens link
    if (window.innerWidth < 768) {
      if (isTapped) {
        if (trackUrl) {
          window.open(trackUrl, '_blank', 'noopener,noreferrer')
        }
      } else {
        setIsTapped(true)
        setIsHovered(true) // Show details
      }
    } else {
      // On desktop, click always opens link
      if (trackUrl) {
        window.open(trackUrl, '_blank', 'noopener,noreferrer')
      }
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (isTapped) {
      setIsTapped(false) // Reset tapped state when mouse leaves
    }
  }

  return (
    <div
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-card transition-transform duration-300"
      onMouseEnter={() => !isPlaceholder && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={() => !isPlaceholder && setIsHovered(true)} // For touch devices
    >
      {isPlaceholder ? (
        <div className="w-full h-full bg-primary"></div>
      ) : (
        <>
          {coverImage && (
            <Image
              src={urlForImage(coverImage)
                .width(400)
                .height(400)
                .quality(90)
                .format('webp')
                .url()}
              alt={coverImage.alt || `Cover art for ${title} by ${artist}`}
              fill
              className="object-cover transition-transform duration-300"
              priority
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}

          {/* Hover overlay - without background tint */}
          <div
            className={`absolute inset-0 flex items-center justify-center ${
              isHovered || isTapped ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
            <div className="relative flex h-full flex-col justify-center p-4 text-center text-primary-foreground transition-colors duration-300 group-hover:text-primary-dark">
              <h3 className="mb-2 text-lg font-medium leading-tight drop-shadow-lg">
                {title}
              </h3>
              {artist && (
                <p className="mb-2 text-sm drop-shadow-lg opacity-90">
                  by {artist}
                </p>
              )}
              {producerRole && (
                <p className="text-xs uppercase tracking-wide drop-shadow-lg opacity-80">
                  {producerRole.replace('-', ' ')}
                </p>
              )}

              {/* Play button indicator */}
            </div>
          </div>
        </>
      )}
    </div>
  )
}