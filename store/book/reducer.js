import { booksSlice } from "./booksInfo";

export const bookReducer = (state = {}, action) => ({
  books: booksSlice.reducer(state.books, action),
});
