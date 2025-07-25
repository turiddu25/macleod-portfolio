import { urlForImage } from 'lib/sanity.image'
import type { Track } from 'lib/sanity.queries'
import Image from 'next/image'
import Link from 'next/link'

interface TrackGridProps {
  tracks: Track[]
}

export default function TrackGrid({ tracks }: TrackGridProps) {
  if (!tracks?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tracks found.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-6">
      {tracks.map((track) => (
        <TrackCard key={track._id} track={track} />
      ))}
    </div>
  )
}

interface TrackCardProps {
  track: Track
}

function TrackCard({ track }: TrackCardProps) {
  const imageUrl = track.coverImage
    ? urlForImage(track.coverImage).width(400).height(400).url()
    : '/default-album-cover.jpg'

  return (
    <div className="group relative aspect-square cursor-pointer">
      {/* Main Image */}
      <Link
        href={track.trackUrl || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full h-full"
      >
        <Image
          src={imageUrl}
          alt={`${track.title} by ${track.artist}`}
          fill
          className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 rounded-lg flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-4">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2">
              {track.title}
            </h3>
            <p className="text-xs text-gray-300 mb-2 line-clamp-1">
              {track.artist}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {track.producerRole?.replace('-', ' ')}
            </p>
            {track.featured && (
              <div className="mt-2">
                <span className="inline-block bg-yellow-500 text-black text-xs px-2 py-1 rounded">
                  Featured
                </span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}
