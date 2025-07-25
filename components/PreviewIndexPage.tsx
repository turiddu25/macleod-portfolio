import IndexPage, { type IndexPageProps } from 'components/IndexPage'
import {
  type Settings,
  settingsQuery,
  tracksQuery,
  type Track,
} from 'lib/sanity.queries'
import { useLiveQuery } from 'next-sanity/preview'

export default function PreviewIndexPage(props: IndexPageProps) {
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
      loading={loadingTracks || loadingSettings}
      tracks={tracks || []}
      settings={settings || {}}
    />
  )
}
