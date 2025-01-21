import { booksSlice } from "./booksInfo";

export const bookReducer = (state = {}, action) => ({
  ...booksSlice.reducer(state.books, action)
});
