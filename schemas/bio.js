export default {
  name: 'bio',
  type: 'document',
	title: 'Bio',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role'
    },
    {
      name: 'bio',
      type: 'string',
      title: 'Bio'
    },
    {
      name: 'about',
      type: 'text',
      title: 'About',
      rows: 10,
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true // <-- Defaults to false
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ]
    },
  ]
}
