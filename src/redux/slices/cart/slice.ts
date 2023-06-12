import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getCartFromLocalStorage } from "../../../utils/getCartFromLS";
import { CartItem, CartSliceInitialState } from "./types";

const cartFromLS = getCartFromLocalStorage();
const initialState: CartSliceInitialState = {
  totalPrice: cartFromLS.totalPrice,
  items: cartFromLS.items,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return (sum += obj.price * obj.count);
      }, 0);
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.totalPrice - findItem.price;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        state.totalPrice -= findItem.price * findItem.count;
      }
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearAllItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, clearAllItems, removeItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
