import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },

    deleteItem: (state, action) => {
      const { _id, quantity, price } = action.payload.product;

      state.products = state.products.filter((product) => product._id !== _id);
      state.quantity -= 1;
      state.total -= quantity * price;
      console.log("delete item ran");
    },

    incrementItemQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload.product._id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      state.total += action.payload.product.price;
    },

    decrementItemQuantity: (state, action) => {
      state.products = state.products.map((product) =>
        product._id === action.payload.product._id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      state.total -= action.payload.product.price;
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  incrementItemQuantity,
  decrementItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
