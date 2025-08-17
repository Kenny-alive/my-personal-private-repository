import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  distDir: 'dist',
};

export default createNextIntlPlugin()(nextConfig);