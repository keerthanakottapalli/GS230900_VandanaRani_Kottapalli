import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storeData } from "../../data/StoresData"; // Import store data

interface Store {
    id: string;
    label: string;
    city: string;
    state: string;
  }
  
  interface StoreState {
    stores: Store[];
  }
  
  // Set the initial state with sample storeData
  const initialState: StoreState = {
    stores: storeData,
  };
  
  const storeSlice = createSlice({
    name: "stores",
    initialState,
    reducers: {
      addStore: (state, action: PayloadAction<Store>) => {
        state.stores.push(action.payload);
      },
      updateStore: (state, action: PayloadAction<Store>) => {
        const index = state.stores.findIndex(store => store.id === action.payload.id);
        if (index !== -1) state.stores[index] = action.payload;
      },
      removeStore: (state, action: PayloadAction<string>) => {
        state.stores = state.stores.filter(store => store.id !== action.payload);
      },
    },
  });
  
  export const { addStore, updateStore, removeStore } = storeSlice.actions;
  export default storeSlice.reducer;