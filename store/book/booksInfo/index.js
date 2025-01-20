import { createSlice } from "@reduxjs/toolkit";

const SLICE_NAME = "allBooks";
const initialState = {
  books: [],
};

export const booksSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    saveAllBooks: (state, action) => {
      state.books = action.payload;

      return state;
    },
  },
});

export const booksActions = booksSlice.actions;
