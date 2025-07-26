import { Track } from 'lib/sanity.queries'
import TrackCard from './TrackCard'
import { InView } from '@/components/ui/in-view'

interface CreditsSectionProps {
  tracks: Track[]
}

export default function CreditsSection({ tracks }: CreditsSectionProps) {
  return (
    <section
      id="credits"
      className="min-h-screen bg-[#5A544A] py-16 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <InView
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewOptions={{ amount: 0.3 }}
        >
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#D4B896] mb-4">
              My Work
            </h2>
          </div>
        </InView>
        
        {tracks && tracks.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {tracks.map((track, index) => (
              <InView
                key={track._id}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1 }
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut'
                }}
                viewOptions={{ amount: 0.1 }}
                once
              >
                <TrackCard track={track} />
              </InView>
            ))}
          </div>
        ) : (
          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewOptions={{ amount: 0.3 }}
          >
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 text-[#B8A082] mb-4">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#D4B896] mb-2">
                No tracks yet
              </h3>
              <p className="text-[#B8A082]">
                Add your first track in the Sanity Studio to get started.
              </p>
            </div>
          </InView>
        )}
      </div>
    </section>
  )
}