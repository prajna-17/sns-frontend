"use client";

import { useState } from "react";
import { Search, User, ShoppingCart, MapPin, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
	const [showCategories, setShowCategories] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<header className="header">
				{/* Sidebar Button (Mobile Only) */}

				<div className="left">SNS</div>

				<div className="searchWrapper">
					<div
						className="category"
						onClick={() => setShowCategories(!showCategories)}
					>
						Categories
					</div>

					{showCategories && (
						<div className="categoryPopup">
							<p>Electronics</p>
							<p>Furniture</p>
							<p>Appliances</p>
							<p>Decor</p>
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
					<button className="actionBtn" suppressHydrationWarning>
						<User size={20} />
					</button>
					<Link href="/cart" className="actionBtn">
						<ShoppingCart
							size={20}
							suppressHydrationWarning
						/>
					</Link>
					<button
						className="menuBtn mobile-only"
						onClick={() => setSidebarOpen(true)}
					>
						<Menu size={22} />
					</button>
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
