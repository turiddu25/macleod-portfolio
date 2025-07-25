import { CogIcon } from '@sanity/icons'
import * as demo from 'lib/demo.data'
import { defineArrayMember, defineField, defineType } from 'sanity'

import OpenGraphInput from './OpenGraphInput'

export default defineType({
  name: 'settings',
  title: 'Portfolio Settings',
  type: 'document',
  icon: CogIcon,
  preview: { select: { title: 'title', subtitle: 'description' } },
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'The title of your music producer portfolio.',
      title: 'Portfolio Title',
      type: 'string',
      initialValue: 'Music Producer Portfolio',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'producerName',
      description: 'Your producer name or stage name.',
      title: 'Producer Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      description: 'A short bio about yourself as a music producer.',
      title: 'Bio',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'description',
      description:
        'Used for the <meta> description tag for SEO and site description.',
      title: 'Description',
      type: 'array',
      initialValue: demo.description,
      of: [
        defineArrayMember({
          type: 'block',
          options: {},
          styles: [],
          lists: [],
          marks: {
            decorators: [],
            annotations: [
              defineField({
                type: 'object',
                name: 'link',
                fields: [
                  {
                    type: 'string',
                    name: 'href',
                    title: 'URL',
                    validation: (rule) => rule.required(),
                  },
                ],
              }),
            ],
          },
        }),
      ],
      validation: (rule) => rule.max(155).required(),
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
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      description:
        'Used for social media previews when linking to the index page.',
      type: 'object',
      components: {
        input: OpenGraphInput as any,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: demo.ogImageTitle,
        }),
      ],
    }),
  ],
})
