import { CogIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Portfolio Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'producerPhoto' } },
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'producerPhoto',
      description: 'Professional photo of the music producer for the hero section (optional).',
      title: 'Producer Photo',
      type: 'image',
      options: {
        hotspot: true,
        accept: 'image/*',
      },
    }),
    defineField({
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          title: 'Instagram',
          type: 'url',
          description: 'Your Instagram profile URL',
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'Your Twitter/X profile URL',
        },
        {
          name: 'soundcloud',
          title: 'SoundCloud',
          type: 'url',
          description: 'Your SoundCloud profile URL',
        },
        {
          name: 'spotify',
          title: 'Spotify',
          type: 'url',
          description: 'Your Spotify artist profile URL',
        },
        {
          name: 'youtube',
          title: 'YouTube',
          type: 'url',
          description: 'Your YouTube channel URL',
        },
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'Your LinkedIn profile URL',
        },
        {
          name: 'website',
          title: 'Personal Website',
          type: 'url',
          description: 'Your personal website URL',
        },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'email',
          description: 'Your business email for collaborations',
        },
        {
          name: 'location',
          title: 'Location',
          type: 'string',
          description: 'Your city/location (e.g., "Los Angeles, CA")',
        },
      ],
    }),
  ],
})
