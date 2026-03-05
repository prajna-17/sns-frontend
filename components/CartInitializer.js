"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartFromStorage } from "@/app/_store/cartSlice";

export default function CartInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadCart = () => {
      dispatch(setCartFromStorage());
    };

    // Load initially
    loadCart();

    // Listen for cart updates
    window.addEventListener("cart-updated", loadCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
    };
  }, [dispatch]);

  return null;
}
