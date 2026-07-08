// sanity/schemaTypes/index.ts
import { boardType } from './board'
import { gradeType } from './grade'
import { subjectType } from './subject'
import { chapterType } from './chapter'
import { postType } from './postType'
import { quizType } from './quiz'
import { mediaObjectType } from './mediaObject'
import { mathFormulaType } from './mathFormula'
import { chemicalFormulaType } from './chemicalFormula'

export const schemaTypes = [
  boardType,
  gradeType,
  subjectType,
  chapterType,
  postType,
  quizType,
  mediaObjectType,
  mathFormulaType,
  chemicalFormulaType,
]