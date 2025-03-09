import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./slices/storeSlice"; // Ensure this path is correct
import skuReducer from "./slices/skuSlice";

export const store = configureStore({
  reducer: {
    stores: storeReducer,// Added reducers here
    skus: skuReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
