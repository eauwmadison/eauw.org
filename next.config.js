const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true"
});

module.exports = withBundleAnalyzer({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },
  images: {
    domains: ["placekitten.com", "placebear.com", "unsplash.it", "localhost"]
  },
  swcMinify: true,
  experimental: {
    images: {
      unoptimized: true
    }
  }
});
