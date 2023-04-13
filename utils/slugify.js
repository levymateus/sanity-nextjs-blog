
export const slugify = input => input.toLowerCase().replace(/[^a-zA-Z0-9]/gm, ' ').replace(/( )+/gm, ' ').trim().replace(/( )/gm, '-').slice(0, 200)
