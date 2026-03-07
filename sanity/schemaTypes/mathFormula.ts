import { defineField, defineType } from 'sanity'

export const mathFormulaType = defineType({
  name: 'mathFormula',
  title: 'Math Formula',
  type: 'object',
  fields: [
    defineField({
      name: 'latex',
      type: 'text',
      title: 'LaTeX',
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
    }),
  ],
  preview: {
    select: { latex: 'latex' },
    prepare({ latex }) {
      return { title: latex ? `Math: ${latex.substring(0, 30)}` : 'Math formula' }
    },
  },
})