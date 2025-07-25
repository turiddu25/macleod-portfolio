import { readToken } from 'lib/sanity.api'
import { getAllTracks, getClient, getSettings } from 'lib/sanity.client'
import { Settings, Track } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

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
    <div>
      <h1>Portfolio Website</h1>
      <p>Coming soon...</p>
      {/* You can build your portfolio components here */}
    </div>
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
