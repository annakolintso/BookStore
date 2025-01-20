import { configureStore } from "@reduxjs/toolkit";
import { bookReducer } from "./book/reducer";

export const rootReducer = (state = {}, action = {}) => ({
  book: bookReducer(state.book, action),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
