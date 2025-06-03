// src/ProjectManager.jsx
import React, { useState, useEffect, useCallback} from 'react';
import InputForm from './inputForm/InputForm';
import ProductTable from './table/Table';
import TotalAmount from './total/Total';
import axios from 'axios';
import { ApiError } from './StyledComponents';

const ProjectManager = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [taxTotal, setTaxTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [editingCartProductId, setEditingCartProductId] = useState(null); 

  const [apiProductList, setApiProductList] = useState([]);
  const [selectedProductFromApi, setSelectedProductFromApi] = useState(null);
  const [apiError, setApiError] = useState(null);
  const fetchProductsFromApi = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/products');
      const responseData = response.data;

      if (!Array.isArray(responseData)) {
        console.error("API did not return an array:", responseData);
        setApiError("Failed to fetch products: Invalid data format from server.");
        setApiProductList([]);
        return;
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

      setApiProductList(formattedProductList);
    } catch (error) {
      console.error("Error fetching products from API:", error);
      if (error.response) {
        setApiError(`Error ${error.response.status}: ${error.response.data?.message || error.message}`);
      } else if (error.request) {
        setApiError("Network Error or CORS issue. Check API server and browser console.");
      } else {
        setApiError(`Error: ${error.message}`);
      }
      setApiProductList([]);
    }
  }, []);

  useEffect(() => {
    fetchProductsFromApi();
  }, [fetchProductsFromApi]);

  const updateTotal = useCallback((updatedCartList) => {
    const calculatedSubTotal = updatedCartList.reduce((sum, product) => {
        const quantity = parseFloat(product.qty) || 0;
        const price = parseFloat(product.price) || 0;
        return sum + (quantity * price);
    }, 0);

    const calculatedGrandTotal = updatedCartList.reduce((sum, product) => {
        return sum + (parseFloat(product.amount) || 0);
    }, 0);

    const calculatedTotalTax = calculatedGrandTotal - calculatedSubTotal;

    setSubTotal(calculatedSubTotal);
    setTaxTotal(calculatedTotalTax);
    setTotalAmount(calculatedGrandTotal);
  }, []);

  const handleAddProductToCart = useCallback((productDataFromForm) => {
  const { databaseProductId, name, qty, price, tax } = productDataFromForm;
  let newAmount = (parseFloat(qty) * parseFloat(price)) * (1 + (parseFloat(tax) / 100 || 0));

  setCartProducts(prevCartProducts => {
    const existingCartItemIndex = prevCartProducts.findIndex(
      item => item.dbProductId === databaseProductId
    );

    let updatedCart;

    if (existingCartItemIndex > -1) {
      updatedCart = prevCartProducts.map((item, index) => {
        if (index === existingCartItemIndex) {
          const newQty = item.qty + qty; 
          const updatedAmount = (newQty * parseFloat(price)) * (1 + (parseFloat(tax) / 100 || 0));
          return {
            ...item,
            qty: newQty,
            price: parseFloat(price), 
            tax: parseFloat(tax),     
            name: name,               
            amount: updatedAmount,
          };
        }
        return item;
      });
    } else {
     
      const newCartItem = {
        cartItemId: Date.now().toString(), 
        dbProductId: databaseProductId,    
        name: name,
        qty: qty,
        price: parseFloat(price),
        tax: parseFloat(tax),
        amount: newAmount,
      };
      updatedCart = [...prevCartProducts, newCartItem];
    }
    updateTotal(updatedCart); 
    return updatedCart;       
  });

  setSelectedProductFromApi(null); 
}, [updateTotal, setSelectedProductFromApi]);

  const handleDeleteProductFromCart = useCallback((cartItemIdToDelete) => {
    const updatedCart = cartProducts.filter(product => product.cartItemId !== cartItemIdToDelete);
    setCartProducts(updatedCart);
    updateTotal(updatedCart);
    if (editingCartProductId === cartItemIdToDelete) {
      setEditingCartProductId(null);
    }
  }, [cartProducts, updateTotal, editingCartProductId]);

  const handleClearAllCartProducts = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all products from the cart?")) {
      setCartProducts([]);
      updateTotal([]);
      setEditingCartProductId(null);
    }
  }, [updateTotal]);

  const handleSetEditCartProduct = useCallback((cartItemId) => {
    setEditingCartProductId(cartItemId);
  }, []);

  const handleCancelEditCartProduct = useCallback(() => {
    setEditingCartProductId(null);
  }, []);

  const handleSaveCartProduct = useCallback((updatedCartItem) => {
    const qty = parseFloat(updatedCartItem.qty) || 0;
    const price = parseFloat(updatedCartItem.price) || 0;
    const tax = parseFloat(updatedCartItem.tax) || 0; 
    const subTotal = qty * price;
    const finalAmount = subTotal * (1 + tax / 100);

    const updatedCart = cartProducts.map(p =>
      p.cartItemId === updatedCartItem.cartItemId ? { ...updatedCartItem, amount: finalAmount } : p
    );
    setCartProducts(updatedCart);
    updateTotal(updatedCart);
    setEditingCartProductId(null);
  }, [cartProducts, updateTotal]);

  const handleApiProductSelection = useCallback((productId) => { 
    if (!productId) {
      setSelectedProductFromApi(null);
      return;
    }
    const product = apiProductList.find(p => p.id === productId);
    setSelectedProductFromApi(product || null);
  }, [apiProductList]);

  return (
    <div>
      {apiError && <ApiError>API Error: {apiError}</ApiError>}
      <main>
        <InputForm
          apiProductList={apiProductList}
          selectedProductFromApi={selectedProductFromApi}
          onProductSelect={handleApiProductSelection}
          onAddProduct={handleAddProductToCart}
          key={selectedProductFromApi ? selectedProductFromApi.id : 'empty-form'} 
        />
        <ProductTable
          products={cartProducts}
          onDeleteProduct={handleDeleteProductFromCart}
          onEditProduct={handleSetEditCartProduct}
          onSaveProduct={handleSaveCartProduct}
          onCancelEdit={handleCancelEditCartProduct}
          editingProductId={editingCartProductId}
        />
        <TotalAmount totalAmount={totalAmount} subTotal={subTotal} taxTotal={taxTotal}/>
        {cartProducts.length > 0 && (
          <button onClick={handleClearAllCartProducts} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Clear All Cart Products
          </button>
        )}
      </main>
      
    </div>
  );
}

export default ProjectManager;