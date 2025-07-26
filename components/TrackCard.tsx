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
      className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-[#3A352E] transition-transform duration-300 hover:scale-105"
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
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      )}
      
      {/* Hover overlay */}
      <div
        className={`absolute inset-0 bg-[#4F4A41]/80 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center p-4 text-center text-[#D4B896]">
          <h3 className="mb-2 text-lg font-semibold leading-tight text-[#D4B896]">
            {title}
          </h3>
          {artist && (
            <p className="mb-2 text-sm text-[#B8A082]">
              by {artist}
            </p>
          )}
          {producerRole && (
            <p className="text-xs text-[#A0916F] uppercase tracking-wide">
              {producerRole.replace('-', ' ')}
            </p>
          )}
          
          {/* Play button indicator */}
          <div className="mt-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#D4B896]/20 backdrop-blur-sm">
              <svg
                className="ml-1 h-5 w-5 text-[#D4B896]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M8 5v10l8-5-8-5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}