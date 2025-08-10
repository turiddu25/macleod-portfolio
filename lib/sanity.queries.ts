import groq from 'groq'

const trackFields = groq`
  _id,
  title,
  artist,
  _updatedAt,
  coverImage,
  "slug": slug.current,
  trackUrl,
  producerRole,
  slider,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const tracksQuery = groq`
*[_type == "track"] | order(_updatedAt desc) {
  ${trackFields}
}`

export const trackBySlugQuery = groq`
*[_type == "track" && slug.current == $slug][0] {
  content,
  ${trackFields}
}
`

export const trackSlugsQuery = groq`
*[_type == "track" && defined(slug.current)][].slug.current
`

export interface Track {
  _id: string
  title?: string
  artist?: string
  coverImage?: any
  _updatedAt?: string
  slug?: string
  trackUrl?: string
  producerRole?: string
  slider?: 'top' | 'bottom'
}

export interface Settings {
  title?: string
  producerName?: string
  producerPhoto?: any
  bio?: string
  description?: any[]
  socialMedia?: {
    instagram?: string
    twitter?: string
    soundcloud?: string
    spotify?: string
    youtube?: string
    linkedin?: string
    website?: string
  }
  contact?: {
    email?: string
    location?: string
  }
  ogImage?: {
    title?: string
  }
}
