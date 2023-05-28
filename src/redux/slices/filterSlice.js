import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.categoryId = action.payload.categoryId;
      state.currentPage = action.payload.currentPage;
      state.sort.sortProperty = action.payload.sortProperty;
    },
  },
});

export const { setCategory, setSortType, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
