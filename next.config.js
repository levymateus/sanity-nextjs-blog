const path = require('path')

const imagesDomains = []
const isDev = process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_ENV === 'development'

if (isDev) {
  imagesDomains.push('localhost')
}

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: { domains: ["cdn.sanity.io", ...imagesDomains ] },
  reactStrictMode: true,
}

module.exports = nextConfig
