import {defineConfig, isDev } from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import { getStartedPlugin } from './plugins/sanity-plugin-tutorial'
import * as envs from './envs'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'sanity-nextjs-blog',

  projectId: envs.sanityProjectId,
  dataset: envs.sanityDataset,

  plugins: [deskTool(), visionTool(), ...(isDev ? devOnlyPlugins : [])],

  schema: {
    types: schemaTypes,
  },
})
