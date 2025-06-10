import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCarts = createAsyncThunk(
  'carts/getCarts',
  async () => {
    const response = await axios.get('http://localhost:5050/api/invoice');
    const responseData = response.data;
    const formattedCartData = responseData.map(cart => {
      return {
        invoiceId : cart.invoiceId,
        invoiceNumber : cart.invoiceNumber,
        customerId : cart.customerId,
        empId : cart.employeeId,
        tAmount : cart.totalAmount,
        dueDate : cart.dueDate,
        invoiceDate : cart.invoiceDate
      }
    }).filter(cart => cart !== null);
    return formattedCartData;
  }

)


export const getInvoiceById = createAsyncThunk(
  'carts/getInvoiceById',
  async (invoiceId) => {
    const response = await axios.get(`http://localhost:5050/api/invoice/${invoiceId}`);
    console.log(response.data);
    return response.data;
  }
);


export const updateInvoice = createAsyncThunk(
  'carts/updateInvoice',
  async (invoiceData, { dispatch }) => {
    const { invoiceId, ...payload } = invoiceData;
    const response = await axios.put(`http://localhost:5050/api/invoice/${invoiceId}`, payload);
    dispatch(getCarts());
    return response.data;
  }
);



const initialState = {
  carts : [],
  cartProducts: [],
  subTotal: 0,
  taxTotal: 0,
  totalAmount: 0,
  currentInvoice: null
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
  extraReducers: (builder) => {
      builder
          .addCase(getCarts.fulfilled, (state, action) => {
              state.carts = action.payload;
          })
          .addCase(getInvoiceById.fulfilled, (state, action) => {
            const { invoiceDetails } = action.payload;
            state.currentInvoice = invoiceDetails;
            const formattedItems = (invoiceDetails.items || []).map(item => ({
            dbProductId: item.productId,
            name: item.name,
            qty: item.quantity,
            price: item.price,
            tax: item.tax,
            cartItemId: `${Date.now()}-${Math.random()}` 
          }));

            state.cartProducts = formattedItems;
            updateTotalAmounts(state);
          })
    }
});

export const { addToCart, updateCartItem, deleteCartItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;