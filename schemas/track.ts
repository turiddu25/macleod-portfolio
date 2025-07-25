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
      type: 'string',
      description:
        'Your role in this track (Producer, Co-Producer, Mix Engineer, etc.)',
      options: {
        list: [
          { title: 'Producer', value: 'producer' },
          { title: 'Co-Producer', value: 'co-producer' },
          { title: 'Executive Producer', value: 'executive-producer' },
          { title: 'Mix Engineer', value: 'mix-engineer' },
          { title: 'Mastering Engineer', value: 'mastering-engineer' },
          { title: 'Songwriter', value: 'songwriter' },
          { title: 'Composer', value: 'composer' },
          { title: 'Arranger', value: 'arranger' },
          { title: 'Sound Designer', value: 'sound-designer' },
          { title: 'Recording Engineer', value: 'recording-engineer' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      description: 'When the track was released',
    }),
    defineField({
      name: 'genre',
      title: 'Genre',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Hip Hop', value: 'hip-hop' },
          { title: 'R&B', value: 'rnb' },
          { title: 'Pop', value: 'pop' },
          { title: 'Electronic', value: 'electronic' },
          { title: 'Rock', value: 'rock' },
          { title: 'Jazz', value: 'jazz' },
          { title: 'Classical', value: 'classical' },
          { title: 'Country', value: 'country' },
          { title: 'Reggae', value: 'reggae' },
          { title: 'Blues', value: 'blues' },
          { title: 'Folk', value: 'folk' },
          { title: 'Funk', value: 'funk' },
          { title: 'Soul', value: 'soul' },
          { title: 'Alternative', value: 'alternative' },
          { title: 'Indie', value: 'indie' },
        ],
      },
    }),
    defineField({
      name: 'label',
      title: 'Record Label',
      type: 'string',
      description: 'The record label that released this track',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Track',
      type: 'boolean',
      description:
        'Mark this track as featured to highlight it on the portfolio',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'Optional description or notes about your work on this track',
      rows: 3,
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
            },
          ],
        },
      ],
      description: 'Other people who worked on this track',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      artist: 'artist',
      media: 'coverImage',
      role: 'producerRole',
      featured: 'featured',
    },
    prepare({ title, artist, media, role, featured }) {
      const subtitle = [
        artist && `by ${artist}`,
        role && `(${role})`,
        featured && '⭐ Featured',
      ]
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
      title: 'Release Date, New',
      name: 'releaseDateDesc',
      by: [{ field: 'releaseDate', direction: 'desc' }],
    },
    {
      title: 'Release Date, Old',
      name: 'releaseDateAsc',
      by: [{ field: 'releaseDate', direction: 'asc' }],
    },
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
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'releaseDate', direction: 'desc' },
      ],
    },
  ],
})
