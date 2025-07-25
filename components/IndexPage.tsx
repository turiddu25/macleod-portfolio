import Container from 'components/BlogContainer'
import BlogHeader from 'components/BlogHeader'
import Layout from 'components/BlogLayout'
import HeroPost from 'components/HeroPost'
import IndexPageHead from 'components/IndexPageHead'
import MoreStories from 'components/MoreStories'
import TrackGrid from 'components/TrackGrid'
import IntroTemplate from 'intro-template'
import * as demo from 'lib/demo.data'
import type { Post, Settings, Track } from 'lib/sanity.queries'
import { Suspense } from 'react'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: Post[]
  tracks: Track[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, tracks, settings } = props
  const [heroPost, ...morePosts] = posts || []
  const featuredTracks = tracks?.filter((track) => track.featured) || []
  const allTracks = tracks || []
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

          {/* Featured Tracks Section */}
          {featuredTracks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Featured Work</h2>
              <TrackGrid tracks={featuredTracks} />
            </section>
          )}

          {/* All Tracks Section */}
          {allTracks.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">
                {featuredTracks.length > 0 ? 'All Credits' : 'Credits'}
              </h2>
              <TrackGrid tracks={allTracks} />
            </section>
          )}

          {/* Keep the blog section for additional content if needed */}
          {heroPost && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            </section>
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
        <Suspense>
          <IntroTemplate />
        </Suspense>
      </Layout>
    </>
  )
}
