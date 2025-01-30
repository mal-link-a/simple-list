import { Products, Product } from "@/entities/Product/Product";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ApiProduct } from "./types";

export interface ProductSlice {
  productsArr: Products;
  index: number;
}

const initialState: ProductSlice = {
  productsArr: [],
  index: 0,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<Products>) => {
      state.productsArr = action.payload.sort(
        (a, b) =>
          Date.parse(b.createdAt.toString()) -
          Date.parse(a.createdAt.toString())
      );
    },
    setIndex: (state, action: PayloadAction<number>) => {
      state.index = action.payload;
    },
    updateProduct: (state, action: PayloadAction<[Product, number]>) => {
      state.productsArr[action.payload[1]] = action.payload[0];
    },
    //, action: PayloadAction<Product>
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.productsArr.splice(action.payload, 1);
    },
    createTemporary: (state, action: PayloadAction<ApiProduct>) => {
      const temporaryData = {
        createdAt: "optimisticUpdate",
        id: "optimisticUpdate",
      };
      state.productsArr.push(Object.assign({}, action.payload, temporaryData));
    },
    deleteTemporary: (state) => {
      state.productsArr.filter((item) => item.createdAt != "optimisticUpdate");
    },
    createProduct: (state, action: PayloadAction<Product>) => {
      state.productsArr.push(action.payload);
    },
  },
});
export const {
  setAll,
  setIndex,
  updateProduct,
  deleteProduct,
  createTemporary,
  deleteTemporary,
  createProduct,
} = productSlice.actions;
export default productSlice.reducer;
