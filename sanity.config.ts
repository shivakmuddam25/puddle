'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schemaTypes} from './sanity/schemaTypes'   // ✅ import named export
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/studio-school',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,   // ✅ use it here
  },
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})