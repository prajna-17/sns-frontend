import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
	dest: "public",
	register: true,
	skipWaiting: true,
	disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	turbopack: {}, // prevents Next 16 warning

	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "zzh7okv7qy.ufs.sh",
				pathname: "/**",
			},
		],
	},

	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default withPWA(nextConfig);
