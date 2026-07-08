// sanity/schemaTypes/chapter.ts
import { defineField, defineType } from 'sanity'

export const chapterType = defineType({
  name: 'chapter',
  title: 'Chapter',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Chapter Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'reference',
      to: [{ type: 'subject' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'contentType',
      title: 'Content Type',
      type: 'string',
      options: {
        list: [
          { title: 'Create New Content', value: 'new' },
          { title: 'Reference Existing Chapter', value: 'reference' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({
      name: 'referenceChapter',
      title: 'Reference Chapter',
      type: 'reference',
      to: [{ type: 'chapter' }],
      hidden: ({ parent }) => parent?.contentType !== 'reference',
    }),
    // Use references to posts instead of embedded lessons
    defineField({
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
      hidden: ({ parent }) => parent?.contentType !== 'new',
    }),
    defineField({
      name: 'quizzes',
      title: 'Quizzes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'quiz' }],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Chapter Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})