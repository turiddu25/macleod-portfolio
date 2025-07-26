'use client';
import { urlForImage } from 'lib/sanity.image'
import { Settings } from 'lib/sanity.queries'
import Image from 'next/image'
import { TextEffect } from './motion-primitives/text-effect'
import { motion } from 'motion/react'
import { InView } from '@/components/ui/in-view'

const ENTRY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
};

interface HeroSectionProps {
  settings: Settings
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const { producerName, producerPhoto, contact } = settings

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center bg-[#222831] text-[#DFD0B8]"
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
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}
      </div>
      
      <InView
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewOptions={{ amount: 0.3 }}
      >
        <div className="relative z-10 text-center px-6 sm:px-8">
          <div className="mx-auto max-w-4xl">
            
            <div className="mb-6">
              <TextEffect
                className="font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] 2xl:text-[10rem] tracking-tight leading-none text-[#DFD0B8]"
                preset="fade-in-blur"
                as="h1"
                per="char"
                speedReveal={3}
                segmentTransition={{ duration: 0.6, ease: 'easeOut' }}
              >
                Davor
              </TextEffect>
              <TextEffect
                className="font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] 2xl:text-[10rem] tracking-tight leading-none text-[#DFD0B8]"
                preset="fade-in-blur"
                as="h1"
                per="char"
                delay={0.3}
                speedReveal={3}
                segmentTransition={{ duration: 0.6, ease: 'easeOut' }}
              >
                MacLeod
              </TextEffect>
            </div>
            
            <div className="mt-8 space-y-2">
              <TextEffect
                className="text-xl sm:text-2xl lg:text-3xl font-light text-[#948979] tracking-wide"
                preset="blur"
                as="p"
                per="word"
                delay={0.8}
                speedReveal={1.5}
                segmentTransition={{ duration: 0.5, ease: 'easeOut' }}
              >
                Music Producer & Engineer
              </TextEffect>
              {contact?.location && (
                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl font-light text-[#948979] tracking-wide"
                  variants={ENTRY_VARIANTS}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    duration: 0.5,
                    delay: 1.2,
                    ease: 'easeOut',
                  }}
                >
                  Based in {contact.location}
                </motion.p>
              )}
            </div>
            
          </div>
        </div>
      </InView>
    </section>
  )
}