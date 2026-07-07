/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Allow optimized remote images (e.g., Cloudinary) and current Squarespace assets during transition.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
    ],
  },
  // 301 redirects: add every old Squarespace URL here so rankings/link-equity carry over.
  // Fill these in from Google Search Console + the old sitemap before launch.
  async redirects() {
    return [
      // Example — replace/extend with your real old → new map:
      // { source: "/old-scheduling", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
