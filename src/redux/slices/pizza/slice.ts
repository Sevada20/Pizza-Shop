import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pizza, PizzaSliceState, SearchPizzaParams } from "./types";
import axios from "axios";

const initialState: PizzaSliceState = {
  items: [],
  status: "",
};

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async ({ order, sortBy, category, search, currentPage }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://6466842bba7110b663a2c623.mockapi.io/items?p=${currentPage}&l=4&${category}&sortBy=${sortBy}${search}&order=${order}`
    );
    return data;
  }
);
const pizzaSlice = createSlice({
  name: "pizza",
  initialState: initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
