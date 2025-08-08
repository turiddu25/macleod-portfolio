import { urlForImage } from 'lib/sanity.image'
import { Track } from 'lib/sanity.queries'
import Image from 'next/image'
import { useState } from 'react'

interface TrackCardProps {
  track: Track
}

export default function TrackCard({ track }: TrackCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { title, artist, coverImage, trackUrl, producerRole } = track

  const handleClick = () => {
    if (trackUrl) {
      window.open(trackUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-card transition-transform duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
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
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
      
      {/* Hover overlay - without background tint */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center p-4 text-center">
          <h3 className="mb-2 text-lg font-medium leading-tight text-primary-foreground drop-shadow-lg">
            {title}
          </h3>
          {artist && (
            <p className="mb-2 text-sm text-primary-foreground/90 drop-shadow-lg">
              by {artist}
            </p>
          )}
          {producerRole && (
            <p className="text-xs text-primary-foreground/80 uppercase tracking-wide drop-shadow-lg">
              {producerRole.replace('-', ' ')}
            </p>
          )}
          
          {/* Play button indicator */}
        </div>
      </div>
    </div>
  )
}