import { createSlice } from "@reduxjs/toolkit";

const loadCart = () => {
	if (typeof window === "undefined") return [];
	try {
		const saved = localStorage.getItem("cart");
		return saved ? JSON.parse(saved) : [];
	} catch {
		return [];
	}
};

const saveCart = (cartState) => {
	if (typeof window !== "undefined") {
		localStorage.setItem("cart", JSON.stringify(cartState));
	}
};

const initialState = {
	items: loadCart(),
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addItem: (state, action) => {
			const item = action.payload;

			const existing = state.items.find((x) => x.id === item.id);

			if (existing) {
				existing.quantity =
					(existing.quantity || 1) + (item.quantity || 1);
			} else {
				state.items.push({
					...item,
					quantity: item.quantity || 1,
				});
			}

			saveCart(state.items);
		},

		removeItem: (state, action) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload
			);
			saveCart(state.items);
		},

		clearCart: (state) => {
			state.items = [];
			saveCart(state.items);
		},

		setCartFromStorage: (state) => {
			state.items = loadCart();
		},

		increaseQuantity: (state, action) => {
			const id = action.payload;
			const item = state.items.find((i) => i.id === id);

			if (item) {
				item.quantity += 1;
				saveCart(state.items);
			}
		},

		decreaseQuantity: (state, action) => {
			const id = action.payload;
			const item = state.items.find((i) => i.id === id);

			if (item) {
				if (item.quantity > 1) {
					item.quantity -= 1;
				} else {
					// Remove item if quantity becomes zero
					state.items = state.items.filter((i) => i.id !== id);
				}
				saveCart(state.items);
			}
		},
	},
});

export const {
	addItem,
	removeItem,
	clearCart,
	setCartFromStorage,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
