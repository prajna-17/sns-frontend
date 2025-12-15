import { Geist } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

export const metadata = {
	title: "SNS",
	description: "Electronics and Furniture website for business in next js",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} antialiased`}
				suppressHydrationWarning
			>
				<Providers>
					<Header />

					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
