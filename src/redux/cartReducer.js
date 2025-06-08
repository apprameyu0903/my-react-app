import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartProducts: [],
  subTotal: 0,
  taxTotal: 0,
  totalAmount: 0,
};

const updateTotalAmounts = (state) => {
  const subTotal = state.cartProducts.reduce((sum, product) => {
    const quantity = parseFloat(product.qty) || 0;
    const price = parseFloat(product.price) || 0;
    return sum + (quantity * price);
  }, 0);

  const totalAmount = state.cartProducts.reduce((sum, product) => {
    const qtyNum = parseFloat(product.qty) || 0;
    const priceNum = parseFloat(product.price) || 0;
    const taxNum = parseFloat(product.tax) || 0;
    const newAmount = (qtyNum * priceNum) * (1 + (taxNum / 100));
    return sum + newAmount;
  }, 0);

  const taxTotal = totalAmount - subTotal;

  state.subTotal = subTotal;
  state.taxTotal = taxTotal;
  state.totalAmount = totalAmount;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const existingItem = state.cartProducts.find(item => item.dbProductId === newProduct.databaseProductId);

      if (existingItem) {
        existingItem.qty += newProduct.qty;
      } else {
        state.cartProducts.push({
            ...newProduct,
            cartItemId: Date.now().toString(),
            dbProductId: newProduct.databaseProductId
        });
      }
      updateTotalAmounts(state);
    },
    updateCartItem: (state, action) => {
      const updatedItem = action.payload;
      const index = state.cartProducts.findIndex(item => item.cartItemId === updatedItem.cartItemId);
      if (index !== -1) {
        state.cartProducts[index] = { ...state.cartProducts[index], ...updatedItem };
      }
      updateTotalAmounts(state);
    },
    deleteCartItem: (state, action) => {
        const cartItemId = action.payload;
        state.cartProducts = state.cartProducts.filter(item => item.cartItemId !== cartItemId);
        updateTotalAmounts(state);
    },
    clearCart: (state) => {
      state.cartProducts = [];
      updateTotalAmounts(state);
    },
  },
});

export const { addToCart, updateCartItem, deleteCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;