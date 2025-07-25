import groq from 'groq'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

const trackFields = groq`
  _id,
  title,
  artist,
  _updatedAt,
  coverImage,
  "slug": slug.current,
  trackUrl,
  producerRole,
  releaseDate,
  genre,
  label,
  featured,
  description,
  collaborators,
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

// Track queries for the portfolio
export const tracksQuery = groq`
*[_type == "track"] | order(featured desc, releaseDate desc, _updatedAt desc) {
  ${trackFields}
}`

export const featuredTracksQuery = groq`
*[_type == "track" && featured == true] | order(releaseDate desc, _updatedAt desc) {
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

export interface Author {
  name?: string
  picture?: any
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
}

export interface Track {
  _id: string
  title?: string
  artist?: string
  coverImage?: any
  _updatedAt?: string
  slug?: string
  trackUrl?: string
  producerRole?: string
  releaseDate?: string
  genre?: string[]
  label?: string
  featured?: boolean
  description?: string
  collaborators?: Array<{
    name?: string
    role?: string
  }>
}

export interface Settings {
  title?: string
  producerName?: string
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
