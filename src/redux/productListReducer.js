import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const response = await axios.get('http://localhost:8082/api/products');
        const responseData = response.data;
        if (!Array.isArray(responseData)) {
            console.error("API did not return an array:", responseData);
            return [];
        }
        const formattedProductList = responseData.map(product => {
            if (!product || typeof product.productId === 'undefined' || product.productId === null ||
                typeof product.name === 'undefined' || product.name === null) {
              console.warn("Skipping product with missing productId or name from API:", product);
              return null;
            }
            return {
              id: product.productId.toString(),
              name: product.name,
              price: parseFloat(product.price) || 0,
              tax: parseFloat(product.taxPercent) || 0,
              originalPrice: parseFloat(product.price) || 0,
              originalTaxPercent: parseFloat(product.taxPercent) || 0,
            };
          }).filter(product => product !== null);
        return formattedProductList;
    }
);

const productListSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        selectedProduct: null,
        productStatus: 'idle',
        error: null
    },
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProduct = action.payload;
        },
        clearProducts: (state) => {
            state.selectedProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.fulfilled, (state, action) => {
                state.productStatus = 'succeeded';
                state.products = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.productStatus = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { selectProduct , clearProducts} = productListSlice.actions;

export default productListSlice.reducer;