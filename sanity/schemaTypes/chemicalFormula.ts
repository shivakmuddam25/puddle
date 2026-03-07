import { defineField, defineType } from 'sanity'

export const chemicalFormulaType = defineType({
  name: 'chemicalFormula',
  title: 'Chemical Formula',
  type: 'object',
  fields: [
    defineField({
      name: 'formula',
      type: 'string',
      title: 'Formula (e.g., H₂O)',
    }),
    defineField({
      name: 'name',
      type: 'string',
      title: 'Compound name',
    }),
  ],
  preview: {
    select: { formula: 'formula', name: 'name' },
    prepare({ formula, name }) {
      return { title: formula || 'Chemical formula', subtitle: name }
    },
  },
})