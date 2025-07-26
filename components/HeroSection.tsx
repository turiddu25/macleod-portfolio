import { urlForImage } from 'lib/sanity.image'
import { Settings } from 'lib/sanity.queries'
import Image from 'next/image'

interface HeroSectionProps {
  settings: Settings
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const { producerName, producerPhoto } = settings

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-[#4F4A41] text-[#D4B896]"
    >
      <div className="absolute inset-0 z-0">
        {producerPhoto && (
          <Image
            src={urlForImage(producerPhoto)
              .quality(95)
              .format('webp')
              .url()}
            alt={producerPhoto.alt || `Photo of ${producerName || 'Producer'}`}
            fill
            className="object-cover opacity-15"
            priority
            sizes="100vw"
          />
        )}
      </div>
      
      <div className="relative z-10 text-center px-6 sm:px-8">
        <div className="mx-auto max-w-4xl">
          
          <div className="mb-6">
            <h1
              className="font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] 2xl:text-[10rem] tracking-tight leading-none text-[#D4B896]"
            >
              Davor
            </h1>
            <h1
              className="font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] 2xl:text-[10rem] tracking-tight leading-none text-[#D4B896]"
            >
              MacLeod
            </h1>
          </div>
          
        </div>
      </div>
    </section>
  )
}