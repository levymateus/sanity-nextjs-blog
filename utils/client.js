import { createClient } from "next-sanity"
import * as envs from '../envs'

const client = createClient({
  projectId: envs.sanityProjectId,
  dataset: envs.sanityDataset,
  apiVersion: "2022-03-25",
  useCdn: false
})

export default client
