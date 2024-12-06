import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  liked: boolean;
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filter: "all" | "favorites"; // New filter for viewing all or only favorites
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
  filter: "all", // Show all products by default
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.products.push(action.payload);
    },
    setLoading(state) {
      state.status = "loading";
    },
    setError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    toggleLike(state, action: PayloadAction<number>) {
      const product = state.products.find((p) => p.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
    setFilter(state, action: PayloadAction<"all" | "favorites">) {
      state.filter = action.payload;
    },
  },
});

export const {
  addProduct,
  setLoading,
  setError,
  toggleLike,
  deleteProduct,
  setFilter,
} = productsSlice.actions;

export default productsSlice.reducer;
