// sanity/schemaTypes/course.ts
import { defineField, defineType } from 'sanity'

export const courseType = defineType({
  name: 'course',
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
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'grade',
      title: 'Grade',
      type: 'reference',
      to: [{ type: 'grade' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      options: {
        list: [
          { title: 'Physics', value: 'physics' },
          { title: 'Chemistry', value: 'chemistry' },
          { title: 'Biology', value: 'biology' },
          { title: 'Mathematics', value: 'mathematics' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'chapterNumber',
      title: 'Chapter Number',
      type: 'string',
      description: 'e.g., "1", "2.1", etc.',
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
      name: 'lessons',
      title: 'Lessons',
      type: 'array',
      of: [{ 
        type: 'reference', 
        to: [{ type: 'post' }],
        options: {
          filter: ({ document }) => {
            // Filter posts by subject when selecting
            return {
              filter: 'subject == $subject',
              params: { subject: document.subject }
            }
          }
        }
      }],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subject: 'subject',
      chapterNumber: 'chapterNumber',
      gradeTitle: 'grade.title',
    },
    prepare({ title, subject, chapterNumber, gradeTitle }) {
      return {
        title: `${chapterNumber ? `Ch ${chapterNumber}: ` : ''}${title}`,
        subtitle: `${gradeTitle || 'No Grade'} - ${subject || 'No Subject'}`,
      }
    },
  },
})