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
      <header className="bg-[#111] text-white sticky top-0 z-50 shadow-md">
        {/* Top Row */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={22} />
            </button>

            <p className="text-lg font-semibold tracking-wide">
              <span className="text-amber-500">S</span>NS
            </p>
          </div>

          <div className="flex items-center gap-4">
            <UserMenu />

            <Link href="/cart" className="relative">
              <ShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-bold min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="hidden sm:flex items-center gap-1 text-sm text-gray-300">
              <MapPin size={16} />
              <span>Mumbai</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="px-4 pb-4 relative">
          <div className="flex items-center bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="bg-amber-500 text-black text-xs font-semibold px-3 py-3 hover:brightness-95 transition"
            >
              Categories
            </button>

            <input
              type="text"
              placeholder="Search for items..."
              className="flex-1 px-3 py-3 text-sm text-black outline-none"
            />

            <div className="px-3 text-gray-600">
              <Search size={18} />
            </div>
          </div>

          {showCategories && (
            <div className="absolute mt-2 w-44 bg-white rounded-xl shadow-xl text-black text-sm animate-[fadeIn_0.2s_ease]">
              <Link
                href="/products?superCategory=699d8b96faa37050c8fbf346"
                className="block px-4 py-3 hover:bg-gray-100 transition"
              >
                Electronics
              </Link>

              <Link
                href="/products?superCategory=699d7db8b47815543edfa29c"
                className="block px-4 py-3 hover:bg-gray-100 transition border-t"
              >
                Furniture
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#121212] text-white shadow-xl z-50 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">SNS Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="flex flex-col text-sm">
          <p className="px-4 py-3 hover:bg-gray-800 cursor-pointer">Home</p>
          <p className="px-4 py-3 hover:bg-gray-800 cursor-pointer">
            Electronics
          </p>
          <p className="px-4 py-3 hover:bg-gray-800 cursor-pointer">
            Furniture
          </p>
          <p className="px-4 py-3 hover:bg-gray-800 cursor-pointer">Account</p>
          <p className="px-4 py-3 hover:bg-gray-800 cursor-pointer">Orders</p>
          <p className="px-4 py-3 hover:bg-gray-800 cursor-pointer">
            Help & Support
          </p>
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)}>
        <User size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-44 rounded-xl bg-[#111] border border-amber-500/30 shadow-xl z-50 backdrop-blur-md animate-[fadeIn_0.2s_ease]">
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
