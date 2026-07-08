import { defineField, defineType } from 'sanity'

export const mediaObjectType = defineType({
  name: 'mediaObject',
  title: 'Media with Caption',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
    }),
  ],
  preview: {
    select: { media: 'image', caption: 'caption' },
    prepare({ media, caption }) {
      return { title: caption || 'Media object', media }
    },
  },
})