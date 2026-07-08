// sanity/schemaTypes/postType.ts
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Lesson',
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
    }),
    // Remove chapter reference to break circular dependency
    // defineField({
    //   name: 'chapter',
    //   title: 'Chapter',
    //   type: 'reference',
    //   to: [{ type: 'chapter' }],
    // }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'mediaObject' },
        { type: 'mathFormula' },
        { type: 'chemicalFormula' },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'order',
      title: 'Lesson Order',
      type: 'number',
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
      subtitle: 'duration',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Untitled Lesson',
        subtitle: subtitle ? `${subtitle} min` : 'No duration',
      }
    },
  },
})