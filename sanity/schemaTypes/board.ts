// sanity/schemaTypes/board.ts
import { defineField, defineType } from 'sanity'

export const boardType = defineType({
  name: 'board',
  title: 'Board',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Board Name',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., CBSE, ICSE, State Board, Cambridge',
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
      title: 'Board Code',
      type: 'string',
      description: 'e.g., CBSE, ICSE, MAH',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
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
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'code',
      media: 'logo',
    },
  },
})