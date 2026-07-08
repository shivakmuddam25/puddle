// sanity/schemaTypes/customLesson.ts (Optional - for one-off lessons)
import { defineField, defineType } from 'sanity'

export const customLessonType = defineType({
  name: 'customLesson',
  title: 'Custom Lesson (Chapter Specific)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
      type: 'string',
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
      name: 'chapter',
      title: 'Chapter',
      type: 'reference',
      to: [{ type: 'chapter' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
    }),
  ],
})