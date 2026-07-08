// sanity/schemaTypes/subTopic.ts
import { defineField, defineType } from 'sanity'

export const subTopicType = defineType({
  name: 'subTopic',
  title: 'Sub-Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sub-Topic Title',
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
      name: 'parentLesson',
      title: 'Parent Lesson',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
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
      name: 'duration',
      title: 'Estimated Duration (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'order',
      title: 'Order in Lesson',
      type: 'number',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      lesson: 'parentLesson.title',
      duration: 'duration',
    },
    prepare({ title, lesson, duration }) {
      return {
        title: title,
        subtitle: `${lesson || 'No Lesson'}${duration ? ` • ${duration} min` : ''}`,
      }
    },
  },
})