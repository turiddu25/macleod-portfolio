import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import IndexPageHead from 'components/IndexPageHead'
import TrackGrid from 'components/TrackGrid'
import IntroTemplate from 'intro-template'
import * as demo from 'lib/demo.data'
import type { Settings, Track } from 'lib/sanity.queries'
import { Suspense } from 'react'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  tracks: Track[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, tracks, settings } = props
  const {
    title = demo.title,
    description = demo.description,
    producerName = 'Music Producer',
  } = settings || {}

  return (
    <>
      <IndexPageHead settings={settings} />

      <Layout preview={preview} loading={loading}>
        <Container>
          <BlogHeader
            title={producerName || title}
            description={description}
            level={1}
          />

          {/* All Tracks Section */}
          {tracks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Credits</h2>
              <TrackGrid tracks={tracks} />
            </section>
          )}
        </Container>
        <Suspense>
          <IntroTemplate />
        </Suspense>
      </Layout>
    </>
  )
}
