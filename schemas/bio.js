export default {
  name: 'bio',
  type: 'document',
	title: 'Bio',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      initialValue: 'Jhon Doe'
    },
    {
      name: 'role',
      type: 'string',
      title: 'Role',
      initialValue: 'Programmer'
    },
    {
      name: 'bio',
      type: 'string',
      title: 'Bio',
      initialValue: 'Nam id nibh quis mauris tincidunt mattis. Vivamus vitae justo tristique erat scelerisque pulvinar quis tempor dolor.'
    },
    {
      name: 'about',
      type: 'text',
      title: 'About',
      rows: 10,
      initialValue: 'Nam id nibh quis mauris tincidunt mattis. Vivamus vitae justo tristique erat scelerisque pulvinar quis tempor dolor.'
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
