import { PlayIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * This file is the schema definition for a music track/credit.
 *
 * Here you'll be able to edit the different fields that appear when you
 * create or edit a track in the studio.
 */

export default defineType({
  name: 'track',
  title: 'Track',
  icon: PlayIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Track Title',
      type: 'string',
      description: 'The name of the song/track',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist Name',
      type: 'string',
      description: 'The main artist or band name',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: any) => `${doc.artist}-${doc.title}`,
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Album Cover / Track Image',
      type: 'image',
      description: 'Square album cover or track artwork',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'trackUrl',
      title: 'Track URL',
      type: 'url',
      description: 'Link to the song (Spotify, Apple Music, YouTube, etc.)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'producerRole',
      title: 'Producer Role',
      type: 'text',
      description:
        'Your role in this track (Producer, Co-Producer, Mix Engineer, etc.)',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      media: 'coverImage',
      role: 'producerRole',
    },
    prepare({ title, artist, media, role }) {
      const subtitle = [artist && `by ${artist}`, role && `(${role})`]
        .filter(Boolean)
        .join(' ')

      return {
        title,
        media,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Artist A-Z',
      name: 'artistAsc',
      by: [{ field: 'artist', direction: 'asc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
})
