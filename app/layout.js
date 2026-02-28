import { Poppins } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";
import CartInitializer from "@/components/CartInitializer";
import InstallButton from "@/components/InstallButton";
const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
	title: "SNS",
	description: "Electronics and Furniture website for business in next js",
	manifest: "/manifest.json",
	appleWebApp: {
		capable: true,
		statusBarStyle: "default",
		title: "School ERP",
	},
	icons: {
		apple: "/img/appicon192.png",
	},
};

export const viewport = {
	themeColor: "#2563eb",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${poppins.className} antialiased`}
				suppressHydrationWarning
			>
				<Providers>
					<CartInitializer />
					{children}
				</Providers>{" "}
			</body>
		</html>
	);
}
