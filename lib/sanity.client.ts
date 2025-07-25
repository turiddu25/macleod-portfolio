import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  type Settings,
  settingsQuery,
  trackBySlugQuery,
  trackSlugsQuery,
  tracksQuery,
  type Track,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: preview?.token ? true : false,
      studioUrl,
    },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'drafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

// Track-related functions for the portfolio
export async function getAllTracks(client: SanityClient): Promise<Track[]> {
  return (await client.fetch(tracksQuery)) || []
}

export async function getAllTracksSlugs(): Promise<Pick<Track, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(trackSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getTrackBySlug(
  client: SanityClient,
  slug: string,
): Promise<Track> {
  return (await client.fetch(trackBySlugQuery, { slug })) || ({} as any)
}
