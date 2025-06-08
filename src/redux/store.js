import cartReducer from './cartReducer';
import productListReducer from './productListReducer'
import customerReducer from './customerReducer'
import { configureStore } from '@reduxjs/toolkit';

export default configureStore ({
  reducer : {
    cart: cartReducer,
    products: productListReducer,
    customers: customerReducer
  }
})


