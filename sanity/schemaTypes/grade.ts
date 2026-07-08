// sanity/schemaTypes/grade.ts
import { defineField, defineType } from 'sanity'

export const gradeType = defineType({
  name: 'grade',
  title: 'Grade',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Grade Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., Grade 9, Class 10, Year 11',
    }),
    defineField({
      name: 'level',
      title: 'Grade Level',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(12),
      description: 'Numeric value: 1-12',
    }),
    defineField({
      name: 'board',
      title: 'Board',
      type: 'reference',
      to: [{ type: 'board' }],
      validation: (rule) => rule.required(),
      description: 'Select the board this grade belongs to',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.board?.name}-grade-${doc.level}`,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
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
  ],
  orderings: [
    {
      title: 'Grade Level',
      name: 'levelAsc',
      by: [{ field: 'level', direction: 'asc' }],
    },
    {
      title: 'Board',
      name: 'boardAsc',
      by: [{ field: 'board.name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      level: 'level',
      board: 'board.name',
    },
    prepare({ title, level, board }) {
      return {
        title: title || `Grade ${level}`,
        subtitle: board || 'No Board',
      }
    },
  },
})