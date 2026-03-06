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
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InstallButton from "./InstallButton";
import { getCart } from "@/utils/cart";
export default function Header() {
  const router = useRouter();
  const [showCategories, setShowCategories] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // const getCartKey = () => {
    //   const userId = localStorage.getItem("userId");
    //   return userId ? `cart_${userId}` : "cart_guest";
    // };

    const loadCart = () => {
      const cart = getCart();

      const totalItems = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

      setCartCount(totalItems);
    };
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("loggedIn"));
    };

    loadCart();
    checkLogin();

    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("login-updated", checkLogin);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("login-updated", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");

    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userAddresses");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");

    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
    localStorage.removeItem("cart_guest");

    setIsLoggedIn(false);
    setCartCount(0);
    setSidebarOpen(false);

    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("login-updated"));

    router.push("/");
  };

  return (
    <>
      <header className="bg-[#000] rounded-b-[30px] px-4 pt-5 pb-6 shadow-lg">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={26} strokeWidth={2.5} className="text-white" />
            </button>

            <h1 className="text-2xl font-extrabold italic tracking-wide">
              <Link
                href="/"
                className="text-2xl font-extrabold italic tracking-wide"
              >
                <span className="text-orange-500">S</span>
                <span className="text-white">NS</span>
              </Link>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {isLoggedIn && (
              <button onClick={() => router.push("/account")}>
                <User size={26} strokeWidth={2.5} className="text-white" />
              </button>
            )}

            <Link href="/cart" className="relative">
              <ShoppingCart
                size={26}
                strokeWidth={2.5}
                className="text-white"
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Section */}
        <div className="relative">
          <div className="flex items-center bg-[#e9e9e9] rounded-2xl overflow-hidden">
            {/* Orange Category Section */}
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="bg-orange-500 text-white text-base font-semibold px-5 py-4"
            >
              All
            </button>

            <input
              type="text"
              placeholder="Search Items..."
              className="flex-1 px-5 py-4 text-base bg-transparent text-gray-600 placeholder-gray-500 outline-none"
            />

            <div className="absolute left-70 text-gray-600">
              <Search size={24} strokeWidth={2.5} />
            </div>
          </div>

          {showCategories && (
            <div className="absolute mt-3 w-44 bg-white rounded-xl shadow-xl text-black text-sm z-50">
              <Link
                href="/products?superCategory=699d8b96faa37050c8fbf346"
                className="block px-4 py-3 hover:bg-gray-100"
              >
                Electronics
              </Link>

              <Link
                href="/products?superCategory=699d7db8b47815543edfa29c"
                className="block px-4 py-3 hover:bg-gray-100 border-t"
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
          <Link
            href="/"
            className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>

          <Link
            href="/products?superCategory=699d8b96faa37050c8fbf346"
            className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition"
            onClick={() => setSidebarOpen(false)}
          >
            Electronics
          </Link>

          <Link
            href="/products?superCategory=699d7db8b47815543edfa29c"
            className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition"
            onClick={() => setSidebarOpen(false)}
          >
            Furniture
          </Link>

          <div className="border-t border-gray-700 my-2" />

          {isLoggedIn ? (
            <>
              <Link
                href="/account"
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition"
                onClick={() => setSidebarOpen(false)}
              >
                Account
              </Link>

              <Link
                href="/order-his"
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition"
                onClick={() => setSidebarOpen(false)}
              >
                Order History
              </Link>

              <Link
                href="/help-support"
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition"
                onClick={() => setSidebarOpen(false)}
              >
                Help & Support
              </Link>

              <div className="border-t border-gray-700 my-2" />

              <button
                onClick={handleLogout}
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition text-red-400 text-left w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  router.push("/login?admin=true");
                  setSidebarOpen(false);
                }}
                className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition text-orange-400 text-left w-full"
              >
                Admin Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("loggedIn"));

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const userId = localStorage.getItem("userId");

    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("userAddresses");
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");

    if (userId) {
      localStorage.removeItem(`cart_${userId}`);
    }
    localStorage.removeItem("cart_guest");

    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("login-updated"));

    setSidebarOpen(false);

    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setOpen(!open)}>
        <User size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-48 rounded-xl bg-[#111] border border-amber-500/30 shadow-xl z-50 backdrop-blur-md animate-[fadeIn_0.2s_ease]">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  router.push("/account");
                  setOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 transition"
              >
                My Account
              </button>

              <button
                onClick={() => {
                  router.push("/order-his");
                  setOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 transition border-t border-amber-500/20"
              >
                Orders
              </button>

              <button
                onClick={() => {
                  router.push("/help-support");
                  setOpen(false);
                }}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-amber-400 hover:bg-amber-500/10 transition border-t border-amber-500/20"
              >
                Help
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition border-t border-amber-500/20"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
