import { slugify } from "../utils/slugify"

export default {
  name: 'snippet',
  type: 'document',
	title: 'Snippet',
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
      description: 'Short snippet description.',
      validation: Rule => Rule.max(64).warning(`A title shouldn't be more than 64 characters.`)
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ]
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
