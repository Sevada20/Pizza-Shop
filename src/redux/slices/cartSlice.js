import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => (obj.id = action.payload.id));
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return sum + obj.price;
      }, 0);
    },
    removeItem(state, action) {
      state.items.filter((item) => item.id !== action.payload);
    },
    clearAllItems(state) {
      state.items = [];
    },
  },
});
export const { addItem, removeAllItems, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
