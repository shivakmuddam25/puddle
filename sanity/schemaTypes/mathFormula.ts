// sanity/schemaTypes/mathFormula.ts
import { defineField, defineType } from 'sanity'

export const mathFormulaType = defineType({
  name: 'mathFormula',
  title: 'Math Formula',
  type: 'object',
  fields: [
    defineField({
      name: 'latex',
      title: 'LaTeX Formula',
      type: 'text',
      validation: (rule) => rule.required(),
      description: 'Enter LaTeX formula, e.g., E = mc^2 or \\int_{0}^{\\infty} e^{-x} dx',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      description: 'Optional description of the formula',
    }),
  ],
  preview: {
    select: {
      title: 'latex',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title: title ? `Formula: ${title.substring(0, 50)}` : 'Math Formula',
        subtitle: subtitle,
      }
    },
  },
})