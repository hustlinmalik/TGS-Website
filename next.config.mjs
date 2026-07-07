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
  // NOTE: 301 redirects from the old Squarespace URLs live in `vercel.json`
  // (single source of truth). Add new old→new mappings there.
};

export default nextConfig;
