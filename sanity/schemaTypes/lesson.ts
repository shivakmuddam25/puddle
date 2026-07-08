// sanity/schemaTypes/lesson.ts
import { defineField, defineType } from 'sanity'

export const lessonType = defineType({
  name: 'lesson',
  title: 'Lesson Library',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'mathFormula' },
        { type: 'chemicalFormula' },
        { type: 'mediaObject' },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'subTopics',
      title: 'Sub-Topics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'duration',
              title: 'Duration (minutes)',
              type: 'number',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'featuredImage',
    },
  },
})