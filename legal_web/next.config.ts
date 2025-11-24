/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ⬅️ required for static export if you use <Image />
  },
  trailingSlash: true, // ⬅️ ensures all routes end with / (important for cPanel hosting)
};

module.exports = nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;
