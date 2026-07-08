// sanity/schemaTypes/mediaObject.ts
import { defineField, defineType } from 'sanity'

export const mediaObjectType = defineType({
  name: 'mediaObject',
  title: 'Media with Caption',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        }),
      ],
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4,video/quicktime,video/webm',
      },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      image: 'image',
      video: 'video',
      caption: 'caption',
    },
    prepare({ mediaType, image, video, caption }) {
      return {
        title: caption || `Media object (${mediaType || 'image'})`,
        media: mediaType === 'video' ? video : image,
      }
    },
  },
})