"use client";

import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItem.find((p) => p.id === action.payload.id);
      if (item) {
        item.quantity++;
        item.price = item.oneQuantityPrice * item.quantity;
      } else {
        state.cartItem.push({ ...action.payload, quantity: 1 });
      }
    },
    changeSize: (state, action) => {
      state.cartItem = state.cartItem.filter((p) => {
        if (p?.id === action.payload.id) {
          p.selectedSize = action.payload.size;
        }
        return p;
      });
    },
    changeQuantity: (state, action) => {
      state.cartItem = state.cartItem.filter((p) => {
        if (p?.id === action.payload.id) {
          p.quantity = action.payload.quantity;
          p.price = p.oneQuantityPrice * p.quantity;
        }
        return p;
      });
    },
    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter((p) => p.id !== action.payload.id);
    },
    emptyCart: (state, action) => {
      state.cartItem = [];
    },
  },
});

export const { addToCart, changeSize, changeQuantity, removeItem, emptyCart } =
  cartSlice.actions;

export default cartSlice.reducer;
