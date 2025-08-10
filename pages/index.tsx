import { readToken } from 'lib/sanity.api'
import { getAllTracks, getClient, getSettings } from 'lib/sanity.client'
import { Settings, Track } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import HeroSection from 'components/HeroSection'
import CreditsSection from 'components/CreditsSection'
import ContactSection from 'components/ContactSection'
import { urlForImage } from 'lib/sanity.image'
import Head from 'next/head'

interface PageProps extends SharedPageProps {
  tracks: Track[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { tracks, settings, draftMode } = props

  return (
    <>
      <Head>
        {tracks.map((track) => (
          <link
            key={track._id}
            rel="preload"
            href={urlForImage(track.coverImage).width(400).height(400).quality(90).format('webp').url()}
            as="image"
          />
        ))}
      </Head>
      <main className="h-screen snap-y snap-mandatory overflow-y-auto overflow-x-hidden scroll-smooth overscroll-none">
        <HeroSection settings={settings} />
        <CreditsSection tracks={tracks} />
        <ContactSection settings={settings} />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, tracks = []] = await Promise.all([
    getSettings(client),
    getAllTracks(client),
  ])

  return {
    props: {
      tracks,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
