import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { skuData } from "../../data/SKUData"; // Import default SKU data

// Define SKU type
export interface SKU {
  id: string;
  label: string;
  price: number;
  cost: number;
}

// Set initialState with sample data
const initialState: SKU[] = skuData;

const skuSlice = createSlice({
  name: "skus",
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<number>) => {
      state.splice(action.payload, 1);
    },
    updateSKU: (state, action: PayloadAction<{ index: number; sku: SKU }>) => {
      state[action.payload.index] = action.payload.sku;
    },
  },
});

export const { addSKU, removeSKU, updateSKU } = skuSlice.actions;
export default skuSlice.reducer;
