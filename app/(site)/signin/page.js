"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="flex items-center justify-center bg-zinc-100 px-4 my-4 md:my-16">
			<div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
				{/* Banner */}
				<div
					className="h-40 bg-contain bg-center flex items-center justify-center text-center"
					style={{
						backgroundImage:
							"url('/img/winter-sale-flex.svg')",
					}}
				></div>

				{/* Form */}
				<div className="p-8">
					<h2 className="text-center text-lg font-semibold text-gray-700 mb-6">
						Welcome back
					</h2>

					{/* Email */}
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2 text-gray-700">
							Email
						</label>
						<input
							type="email"
							placeholder="example@email.com"
							className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
						/>
					</div>

					{/* Password */}
					<div className="mb-2">
						<label className="block text-sm font-medium mb-2 text-gray-700">
							Password
						</label>

						<div className="relative">
							<input
								type={
									showPassword ? "text" : "password"
								}
								className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
							/>

							<button
								type="button"
								onClick={() =>
									setShowPassword(!showPassword)
								}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
							>
								{showPassword ? (
									<EyeOff size={18} />
								) : (
									<Eye size={18} />
								)}
							</button>
						</div>
					</div>

					{/* Forgot Password */}
					<div className="text-sm text-gray-600 mb-6">
						<Link href="#" className="hover:underline">
							Forgot password?
						</Link>
					</div>

					{/* Login Button */}
					<button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-zinc-800 transition">
						Login
					</button>

					{/* Divider */}
					<div className="flex items-center gap-3 my-6">
						<div className="flex-1 h-px bg-gray-300"></div>
						<span className="text-sm text-gray-500">Or</span>
						<div className="flex-1 h-px bg-gray-300"></div>
					</div>

					{/* Google Button */}
					<button className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
						<img
							src="https://www.svgrepo.com/show/475656/google-color.svg"
							alt="google"
							className="w-5 h-5"
						/>
						<span className="text-sm font-medium">
							Google
						</span>
					</button>

					{/* Register Link */}
					<p className="text-center text-sm text-gray-600 mt-6">
						Don’t have an account?{" "}
						<Link
							href="/register"
							className="font-medium text-black hover:underline"
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
