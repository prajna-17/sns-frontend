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
					<div className="p-3">
						<Header />

						{children}
					</div>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
