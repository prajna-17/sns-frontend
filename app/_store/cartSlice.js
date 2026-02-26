import { createSlice } from "@reduxjs/toolkit";
import { getUserIdFromToken } from "@/utils/auth";

const getCartKey = () => {
  const userId = getUserIdFromToken();
  return userId ? `cart_${userId}` : "cart_guest";
};

const loadCart = () => {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(getCartKey());
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (cartState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(getCartKey(), JSON.stringify(cartState));
  }
};

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromStorage: (state) => {
      state.items = loadCart();
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.variantId !== action.payload,
      );
      saveCart(state.items);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.variantId === action.payload);
      if (item) {
        item.qty += 1;
        saveCart(state.items);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find((i) => i.variantId === action.payload);

      if (item) {
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.items = state.items.filter(
            (i) => i.variantId !== action.payload,
          );
        }
        saveCart(state.items);
      }
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const {
  setCartFromStorage,
  removeItem,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
