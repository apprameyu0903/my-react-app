import cartReducer from './cartReducer';
import productListReducer from './productListReducer'
import storage from 'redux-persist/lib/storage'
import customerReducer from './customerReducer'
import userReducer from './userReducer'
import { configureStore } from '@reduxjs/toolkit';
import { persistStore , persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig , userReducer);

export const store = configureStore ({
  reducer : {
    cart: cartReducer,
    products: productListReducer,
    customers: customerReducer,
    users: persistedReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
})
export const persistor = persistStore(store);



