import {defineConfig, isDev } from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import { getStartedPlugin } from './plugins/sanity-plugin-tutorial'
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy'
import * as envs from './envs'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'sanity-nextjs-blog',

  projectId: envs.sanityProjectId,
  dataset: envs.sanityDataset,

  plugins: [deskTool(), visionTool(), vercelDeployTool(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
})
