const path = require('path')
const withBundleAnalyzer = require('@next/bundle-analyzer')

const isBundleAnalyzeEnabled = process.env.ANALYZE == 'true'
const imagesDomains = []

if (process.env.NEXT_PUBLIC_ENV == process.env.NODE_ENV) {
  imagesDomains.push('localhost')
}

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: { domains: ["cdn.sanity.io", ...imagesDomains ] },
  reactStrictMode: true,
}

module.exports = withBundleAnalyzer({
  enabled: isBundleAnalyzeEnabled,
})(nextConfig)
