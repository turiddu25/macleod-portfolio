import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'

interface Props {
  asset: SanityImageSource
  alt: string
  caption?: string
}

export const SanityImage = (props: Props) => {
  const { asset, alt, caption } = props
  
  if (!asset || (typeof asset === 'object' && !(asset as any)?.asset?._ref)) return null

  return (
    <figure>
      <Image
        src={urlForImage(asset).width(800).height(600).url()}
        alt={alt}
        width={800}
        height={600}
        sizes="(max-width: 800px) 100vw, 800px"
        className="h-auto w-full"
      />
      {caption && (
        <figcaption className="mt-2 text-center italic text-sm text-gray-500 dark:text-gray-400 text-pretty">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
