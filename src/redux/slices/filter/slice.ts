import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterState, SortPropertyEnum, Sort } from "./types";
const initialState: FilterState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortPropertyEnum.PRICE_DESC,
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterState>) {
      state.categoryId = +action.payload.categoryId;
      state.currentPage = +action.payload.currentPage;
      state.sort = action.payload.sort;
    },
  },
});

export const {
  setCategory,
  setSortType,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
