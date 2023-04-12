import { slugify } from "../utils/slugify"

export default {
  name: 'post',
  type: 'document',
	title: 'Post',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'string',
      title: 'Description',
      rows: 5,
    },
    {
      name: 'content',
      type: 'text',
      title: 'Content',
      rows: 5,
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200, // will be ignored if slugify is set
        slugify: slugify
      }
    }
  ],
}
