"use client";

import { useState, useRef, useEffect } from "react";
import {
	Search,
	User,
	ShoppingCart,
	MapPin,
	Menu,
	X,
	LogIn,
	UserPlus,
} from "lucide-react";
import Link from "next/link";

export default function Header() {
	const [showCategories, setShowCategories] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const loadCart = () => {
			const cart = JSON.parse(localStorage.getItem("cart")) || [];

			const totalItems = cart.reduce(
				(total, item) => total + (item.quantity || 1),
				0,
			);

			setCartCount(totalItems);
		};

		loadCart();

		window.addEventListener("storage", loadCart);

		return () => window.removeEventListener("storage", loadCart);
	}, []);

	return (
		<>
			<header className="header">
				<div className="left flex gap-2 items-center">
					<button
						className="menuBtn mobile-only"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu size={22} />
					</button>
					<p>SNS</p>
				</div>

				<div className="searchWrapper">
					<div
						className="category"
						onClick={() => setShowCategories(!showCategories)}
					>
						Categories
					</div>

					{showCategories && (
						<div className="categoryPopup">
							<p>
								<Link href="/products?category=electronics">
									Electronics
								</Link>
							</p>
							<Link href="/products?category=electronics">
								Furniture
							</Link>
						</div>
					)}

					<input
						type="text"
						className="searchInput"
						placeholder="Search for items"
					/>
					<Search className="searchIcon" />
				</div>

				<div className="actions">
					<UserMenu />
					<Link href="/cart" className="relative actionBtn">
						<ShoppingCart size={20} />

						{cartCount > 0 && (
							<span className="absolute -top-2 -right-2 bg-amber-600 text-white text-xs font-semibold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full">
								{cartCount}
							</span>
						)}
					</Link>
					<div className="location desktop-only">
						<MapPin size={20} />
						<span>Mumbai</span>
					</div>
				</div>
			</header>

			{/* Sidebar Overlay */}
			{sidebarOpen && (
				<div
					className="sidebar-overlay"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}

			{/* Sidebar Drawer */}
			<div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
				<div className="sidebar-header">
					<h2>SNS Menu</h2>
					<button onClick={() => setSidebarOpen(false)}>
						<X size={22} />
					</button>
				</div>

				<div className="sidebar-links">
					<p>Home</p>
					<p>Electronics</p>
					<p>Furniture</p>
					<p>Account</p>
					<p>Orders</p>
					<p>Help & Support</p>
				</div>
			</div>
		</>
	);
}

function UserMenu() {
	const [open, setOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div className="relative" ref={menuRef}>
			<button
				className="actionBtn"
				onClick={() => setOpen(!open)}
				suppressHydrationWarning
			>
				<User size={20} />
			</button>

			{open && (
				<div className="absolute right-0 mt-3 w-44 rounded-xl bg-[#111] border border-amber-500/30 shadow-lg shadow-amber-500/10 backdrop-blur-md z-50">
					<Link
						href="/signin"
						className="flex items-center gap-2 px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 transition"
					>
						<LogIn size={16} />
						Sign In
					</Link>

					<Link
						href="/register"
						className="flex items-center gap-2 px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 transition border-t border-amber-500/20"
					>
						<UserPlus size={16} />
						Register
					</Link>
				</div>
			)}
		</div>
	);
}
