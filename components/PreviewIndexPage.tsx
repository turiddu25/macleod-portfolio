import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  indexQuery,
  type Post,
  type Settings,
  settingsQuery,
  tracksQuery,
  type Track,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
  const [posts, loadingPosts] = useLiveQuery<Post[]>(props.posts, indexQuery)
  const [tracks, loadingTracks] = useLiveQuery<Track[]>(
    props.tracks,
    tracksQuery,
  )
  const [settings, loadingSettings] = useLiveQuery<Settings>(
    props.settings,
    settingsQuery,
  )

  return (
    <IndexPage
      preview
      loading={loadingPosts || loadingTracks || loadingSettings}
      posts={posts || []}
      tracks={tracks || []}
      settings={settings || {}}
    />
  )
}
