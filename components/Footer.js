"use client";

import { Youtube, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-black text-gray-300 rounded-t-3xl">
			{/* Top Section */}
			<div className="max-w-7xl mx-auto px-6 py-16">
				<div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
					{/* Stay Connected */}
					<div>
						<h2 className="text-white text-xl font-semibold mb-4">
							Stay Connected
						</h2>
						<p className="text-gray-400 mb-6">
							Subscribe to our newsletter for the latest
							updates and exclusive offers.
						</p>

						<div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden max-w-md">
							<input
								type="email"
								placeholder="Enter your email address"
								className="flex-1 bg-transparent px-4 py-3 text-sm outline-none"
							/>
							<button className="px-4 text-gray-400 hover:text-white transition">
								→
							</button>
						</div>

						<h3 className="text-white text-sm tracking-wider mt-8 mb-4">
							FOLLOW US
						</h3>

						<div className="flex gap-4">
							{[
								Youtube,
								Facebook,
								Instagram,
								Linkedin,
								Twitter,
							].map((Icon, i) => (
								<div
									key={i}
									className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-900 hover:bg-zinc-800 transition cursor-pointer"
								>
									<Icon size={18} />
								</div>
							))}
						</div>
					</div>

					{/* Company */}
					<div>
						<h2 className="text-white text-xl font-semibold mb-4 border-b border-zinc-800 pb-2">
							Company
						</h2>
						<ul className="space-y-3 mt-4 text-sm">
							{[
								"Site Map",
								"Blogs",
								"Careers At SNS",
								"Terms Of Use",
								"Disclaimer",
								"Privacy Policy",
								"Unboxed",
								"Gift Card",
							].map((item, i) => (
								<li key={i}>
									<Link
										href="#"
										className="hover:text-white transition"
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Products */}
					<div>
						<h2 className="text-white text-xl font-semibold mb-4 border-b border-zinc-800 pb-2">
							Products
						</h2>
						<ul className="space-y-3 mt-4 text-sm">
							{[
								"Smart Devices",
								"Living Room Furniture",
								"Bedroom Furniture",
								"Dining Room Furniture",
								"Office Furniture",
								"Outdoor Furniture",
								"Sofas & Sectionals",
								"Beds & Mattresses",
								"Tables & Desks",
								"Chairs & Seating",
								"Wardrobes & Storage",
								"TV Units & Cabinets",
							].map((item, i) => (
								<li key={i}>
									<Link
										href="#"
										className="hover:text-white transition"
									>
										{item}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			{/* Divider */}
			<div className="border-t border-zinc-900"></div>

			{/* Bottom Section */}
			<div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
				<p>© 2026 SNS. All rights reserved</p>

				<div className="flex gap-6">
					<Link href="#" className="hover:text-white transition">
						Privacy Policy
					</Link>
					<Link href="#" className="hover:text-white transition">
						Terms of Service
					</Link>
					<Link href="#" className="hover:text-white transition">
						Cookies
					</Link>
				</div>
			</div>
		</footer>
	);
}
