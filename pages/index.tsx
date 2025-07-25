import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPosts,
  getAllTracks,
  getClient,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings, Track } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  tracks: Track[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, tracks, settings, draftMode } = props

  if (draftMode) {
    return (
      <PreviewIndexPage posts={posts} tracks={tracks} settings={settings} />
    )
  }

  return <IndexPage posts={posts} tracks={tracks} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, posts = [], tracks = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client),
    getAllTracks(client),
  ])

  return {
    props: {
      posts,
      tracks,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
