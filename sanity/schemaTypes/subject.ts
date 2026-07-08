// sanity/schemaTypes/subject.ts
import { defineField, defineType } from 'sanity'

export const subjectType = defineType({
  name: 'subject',
  title: 'Subject',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Subject Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., Physics, Chemistry, Mathematics, Biology',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Subject Code',
      type: 'string',
      description: 'e.g., PHY, CHEM, MATH',
    }),
    defineField({
      name: 'grade',
      title: 'Grade',
      type: 'reference',
      to: [{ type: 'grade' }],
      validation: (rule) => rule.required(),
      description: 'Select the grade this subject belongs to',
    }),
    defineField({
      name: 'board',
      title: 'Board',
      type: 'reference',
      to: [{ type: 'board' }],
      validation: (rule) => rule.required(),
      description: 'Select the board (automatically inherited from grade)',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'color',
      title: 'Color Theme',
      type: 'string',
      description: 'e.g., #FF6B6B, #4ECDC4, #45B7D1',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
	defineField({
      name: 'image',
      title: 'Subject Image',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Main image for the subject card',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Grade',
      name: 'gradeAsc',
      by: [{ field: 'grade.level', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      grade: 'grade.title',
      board: 'board.name',
      media: 'icon',
    },
    prepare({ title, grade, board, media }) {
      return {
        title: title,
        subtitle: `${board || 'No Board'} - ${grade || 'No Grade'}`,
        media: media,
      }
    },
  },
})