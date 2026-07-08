// sanity/schemaTypes/chemicalFormula.ts
import { defineField, defineType } from 'sanity'

export const chemicalFormulaType = defineType({
  name: 'chemicalFormula',
  title: 'Chemical Formula',
  type: 'object',
  fields: [
    defineField({
      name: 'formula',
      title: 'Chemical Formula',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., H₂O, C₆H₁₂O₆, NaCl',
    }),
    defineField({
      name: 'name',
      title: 'Compound Name',
      type: 'string',
      description: 'e.g., Water, Glucose, Sodium Chloride',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'formula',
      subtitle: 'name',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Chemical Formula',
        subtitle: subtitle,
      }
    },
  },
})