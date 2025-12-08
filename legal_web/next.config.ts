/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // ⬅️ required for static export if you use <Image />
  },
  trailingSlash: true, // ⬅️ ensures all routes end with / (important for cPanel hosting)
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

module.exports = nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   trailingSlash: true,
//   reactStrictMode: true,
//   compress: true,

//   images: {
//     formats: ['image/avif', 'image/webp'], // Smallest+fastest images
//   },

//   compiler: {
//     removeConsole: process.env.NODE_ENV === "production",
//   },

//   experimental: {
//     optimizeCss: true,
//     scrollRestoration: true,
//     optimizePackageImports: ["lucide-react"], // boost bundle speed
//   },

//   poweredByHeader: false,
// };

// module.exports = nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//  // static export
// trailingSlash: false, // optional, depends on hosting
// images: {
// unoptimized: true, // required for static export if using <Image />
// },
// compiler: {
// removeConsole: process.env.NODE_ENV === "production",
// },
// // No rewrites or redirects for /admin — access /admin/index.html directly
// };

// module.exports = nextConfig;
