const path = require('path')

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: { domains: ["cdn.sanity.io", "localhost"] },
  reactStrictMode: true,
}

module.exports = nextConfig
