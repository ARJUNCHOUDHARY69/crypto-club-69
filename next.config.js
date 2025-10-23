/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimize for Vercel
  images: {
    domains: [
      'assets.coingecko.com'
    ],
    formats: ['image/webp', 'image/avif'],
  },
  // Enable compression
  compress: true,
  // Optimize bundle
  swcMinify: true,
  // Enable static optimization
  output: 'standalone',
      // Cache headers for Vercel
      async headers() {
        return [
          {
            source: '/api/crypto',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=1800',
              },
            ],
          },
          {
            source: '/api/images',
            headers: [
              {
                key: 'Cache-Control',
                value: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=1800',
              },
            ],
          },
        ]
      },
}

module.exports = nextConfig
