import { ADD_TO_CART } from './cartActions';

const initialState = {
  cartProducts: [],
  subTotal: 0,
  taxTotal: 0,
  totalAmount: 0,
};

const updateTotalAmounts = (cartList) => {
  const subTotal = cartList.reduce((sum, product) => {
    const quantity = parseFloat(product.qty) || 0;
    const price = parseFloat(product.price) || 0;
    return sum + (quantity * price);
  }, 0);

  const totalAmount = cartList.reduce((sum, product) => {
    return sum + (parseFloat(product.amount) || 0);
  }, 0);

  const taxTotal = totalAmount - subTotal;

  return { subTotal, taxTotal, totalAmount };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const newProduct = action.payload;
      let updatedCart;

      const existingCartItemIndex = state.cartProducts.findIndex(
        item => item.dbProductId === newProduct.dbProductId
      );

      if (existingCartItemIndex > -1) {
        updatedCart = state.cartProducts.map((item, index) => {
          if (index === existingCartItemIndex) {
            const newQty = item.qty + newProduct.qty;
            const updatedAmount = (newQty * parseFloat(item.price)) * (1 + (parseFloat(item.tax) / 100 || 0));
            return {
              ...item,
              qty: newQty,
              amount: updatedAmount,
              name: newProduct.name,
              price: newProduct.price,
              tax: newProduct.tax,
            };
          }
          return item;
        });
      } else {
        updatedCart = [...state.cartProducts, newProduct];
      }
      
      const totals = updateTotalAmounts(updatedCart);
      return {
        ...state,
        cartProducts: updatedCart,
        ...totals,
      };
    }
    default:
      return state;
  }
};

export default cartReducer;