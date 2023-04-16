export default {
  name: 'site',
  type: 'document',
	title: 'Site',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Sanity Nextjs Blog.'
    },
    {
      name: 'blog',
      type: 'string',
      title: 'Blog',
      initialValue: 'Search for some posted content.'
    },
    {
      name: 'snippets',
      type: 'string',
      title: 'Snippets',
      initialValue: 'Search for some code snnipets content.'
    },
  ]
}
