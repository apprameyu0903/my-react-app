export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (productData) => {
  const qtyNum = parseFloat(productData.qty);
  const priceNum = parseFloat(productData.price);
  const taxNum = parseFloat(productData.tax) || 0;
  const newAmount = (qtyNum * priceNum) * (1 + (taxNum / 100));

  return {
    type: ADD_TO_CART,
    payload: {
      ...productData, 
      cartItemId: Date.now().toString(), 
      qty: qtyNum,
      price: priceNum,
      tax: taxNum,
      amount: newAmount,
      dbProductId: productData.databaseProductId 
    }
  };
};