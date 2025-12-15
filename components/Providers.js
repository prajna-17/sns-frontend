"use client";

import { Provider } from "react-redux";
import { store } from "@/app/_store/store";
import CartInitializer from "./CartInitializer";

export default function Providers({ children }) {
	return (
		<Provider store={store}>
			<CartInitializer />
			{children}
		</Provider>
	);
}
