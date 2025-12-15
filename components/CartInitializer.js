"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCartFromStorage } from "@/app/_store/cartSlice";

export default function CartInitializer() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setCartFromStorage());
	}, [dispatch]);

	return null;
}
