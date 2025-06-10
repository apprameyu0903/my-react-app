import cartReducer from './cartReducer';
import productListReducer from './productListReducer'
import customerReducer from './customerReducer'
import userReducer from './userReducer'
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore ({
  reducer : {
    cart: cartReducer,
    products: productListReducer,
    customers: customerReducer,
    users: userReducer
  }
})




