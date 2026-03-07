import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    // Optional: keep the top-level image if you still need it
    defineField({
      name: 'image',
      type: 'image',
    }),
    // Add a subject field (optional but useful for tagging)
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        list: [
          { title: 'Mathematics', value: 'math' },
          { title: 'Chemistry', value: 'chemistry' },
          { title: 'Physics', value: 'physics' },
        ],
      },
    }),
    // Update the body array to include custom blocks
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },          // standard rich text
        { type: 'image' },           // default image block
        { type: 'mathFormula' },      // your custom math block
        { type: 'chemicalFormula' },  // your custom chem block
        { type: 'mediaObject' },       // your custom media block
      ],
    }),
  ],
})