import { Track } from 'lib/sanity.queries'
import { InfiniteSlider } from './motion-primitives/infinite-slider'
import TrackCard from './TrackCard'
import { TextLoop } from './motion-primitives/text-loop'

interface CreditsSectionProps {
  tracks: Track[]
}

export default function CreditsSection({ tracks }: CreditsSectionProps) {
  const MIN_ITEMS = 12
  let extendedTracks = [...(tracks || [])]

  if (extendedTracks.length > 0 && extendedTracks.length < MIN_ITEMS) {
    const placeholdersNeeded = MIN_ITEMS - extendedTracks.length
    for (let i = 0; i < placeholdersNeeded; i++) {
      extendedTracks.push({
        _id: `placeholder-${i}`,
        title: `Placeholder ${i + 1}`,
      })
    }
  }

  const middleIndex = Math.ceil(extendedTracks.length / 2)
  const firstRowTracks = extendedTracks.slice(0, middleIndex)
  const secondRowTracks = extendedTracks.slice(middleIndex)

  return (
    <section
      id="credits"
      className="bg-secondary min-h-screen flex flex-col sm:justify-center overflow-x-hidden py-16 sm:py-0"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="mb-12">
          <h2 className="flex flex-col sm:flex-row items-center sm:items-baseline justify-center text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl text-secondary-foreground mb-4 responsive-h2">
            <span className="mb-4 sm:mb-0 sm:mr-4">Currently</span>
            <div className="grid place-items-center">
              <TextLoop
                className="overflow-y-clip text-center"
                transition={{
                  type: 'spring',
                  stiffness: 900,
                  damping: 80,
                  mass: 10,
                }}
                variants={{
                  initial: {
                    y: 20,
                    rotateX: 90,
                    opacity: 0,
                    filter: 'blur(4px)',
                  },
                  animate: {
                    y: 0,
                    rotateX: 0,
                    opacity: 1,
                    filter: 'blur(0px)',
                  },
                  exit: {
                    y: -20,
                    rotateX: -90,
                    opacity: 0,
                    filter: 'blur(4px)',
                  },
                }}
              >
                <span>Mastering</span>
                <span>Editing</span>
                <span>Mixing</span>
              </TextLoop>
            </div>
          </h2>
        </div>
      </div>

      {extendedTracks.length > 0 ? (
        <div className="space-y-6">
          <InfiniteSlider speed={100} speedOnHover={20} gap={24}>
            {firstRowTracks.map((track) => (
              <div key={track._id} className="w-[200px] sm:w-[250px]">
                <TrackCard track={track} />
              </div>
            ))}
          </InfiniteSlider>
          <InfiniteSlider speed={100} speedOnHover={20} gap={24} reverse>
            {secondRowTracks.map((track) => (
              <div key={track._id} className="w-[200px] sm:w-[250px]">
                <TrackCard track={track} />
              </div>
            ))}
          </InfiniteSlider>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="text-center py-16">
            <div className="mx-auto h-24 w-24 text-muted-foreground mb-4">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-secondary-foreground mb-2">
              No tracks yet
            </h3>
            <p className="text-muted-foreground">
              Add your first track in the Sanity Studio to get started.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}