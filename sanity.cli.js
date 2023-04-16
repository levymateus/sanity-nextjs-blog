import {defineCliConfig} from 'sanity/cli'
import * as envs from './envs'

export default defineCliConfig({
  api: {
    projectId: envs.sanityProjectId,
    dataset: envs.sanityDataset,
  }
})
