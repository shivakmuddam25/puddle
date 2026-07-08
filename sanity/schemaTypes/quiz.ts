// sanity/schemaTypes/quiz.ts
import { defineField, defineType } from 'sanity'

export const quizType = defineType({
  name: 'quiz',
  title: 'Quiz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Quiz Title',
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
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'duration',
      title: 'Time Limit (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'passingScore',
      title: 'Passing Score (%)',
      type: 'number',
      initialValue: 40,
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'text' }),
            defineField({
              name: 'questionType',
              title: 'Question Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Multiple Choice', value: 'mcq' },
                  { title: 'True/False', value: 'truefalse' },
                ],
              },
            }),
            defineField({ name: 'options', type: 'array', of: [{ type: 'string' }] }),
            defineField({ name: 'correctAnswer', type: 'string' }),
            defineField({ name: 'explanation', type: 'text' }),
            defineField({ name: 'points', type: 'number', initialValue: 1 }),
          ],
        },
      ],
    }),
    defineField({
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Medium', value: 'medium' },
          { title: 'Hard', value: 'hard' },
        ],
      },
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})