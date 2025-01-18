"use client"
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@/app/redux/cartSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});

