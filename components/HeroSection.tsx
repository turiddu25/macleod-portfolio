'use client';
import { Settings } from 'lib/sanity.queries'
import { TextEffect } from './motion-primitives/text-effect'
import { motion } from 'motion/react'
import dynamic from 'next/dynamic'
import Script from 'next/script'

const VantaBackground = dynamic(() => import('./VantaBackground'), {
  ssr: false,
})

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
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.trunk.min.js"
        strategy="beforeInteractive"
      />
      <section
        id="hero"
        className="relative flex min-h-screen items-center justify-center mx-auto bg-background text-foreground overflow-hidden pt-[calc(4rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]"
      >
        <VantaBackground />
        <div className="relative z-10 text-center px-6 sm:px-8 w-full">
          <div className="mx-auto">
            <div className="mb-6">
              <TextEffect
                className="font-normal text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-primary-dark"
                preset="fade-in-blur"
                as="h1"
                per="char"
                speedReveal={3}
                segmentTransition={{ duration: 0.6, ease: 'easeOut' }}
              >
                DAVOR
              </TextEffect>
              <TextEffect
                className="font-normal text-[10vw] sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.9] text-primary-dark"
                preset="fade-in-blur"
                as="h1"
                per="char"
                delay={0.3}
                speedReveal={3}
                segmentTransition={{ duration: 0.6, ease: 'easeOut' }}
              >
                MACLEOD
              </TextEffect>
            </div>

            <div className="mt-8 space-y-2">
              <TextEffect
                className="text-lg sm:text-xl lg:text-2xl font-baunk font-light text-muted-foreground tracking-normal"
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
                  className="text-base sm:text-lg lg:text-xl font-baunk font-light text-muted-foreground tracking-normal"
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
        <a
          href="#credits"
          aria-label="Scroll to credits"
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 transform cursor-pointer text-muted-foreground transition-colors duration-300 hover:text-primary animate-bounce"
        >
          <svg
            className="h-10 w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </section>
    </>
  )
}