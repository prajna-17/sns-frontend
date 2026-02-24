/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "zzh7okv7qy.ufs.sh",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
