import React, { useState, useEffect, useCallback } from 'react';
import './inputStyle.css';
import { AddToCartButton } from '../StyledComponents';
import { useUser } from '../UserContext';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const InputForm = ({ apiProductList, selectedProductFromApi, onProductSelect, onAddProduct }) => {
  const [productIdSearchText, setProductIdSearchText] = useState('');
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');
  const [amount, setAmount] = useState(0);
  const { isLogged } = useUser(); 

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  useEffect(() => {
    if (selectedProductFromApi) {
      setProductIdSearchText(selectedProductFromApi.id || '');
      setProductName(selectedProductFromApi.name || '');
      setPrice(selectedProductFromApi.originalPrice !== undefined ? selectedProductFromApi.originalPrice.toString() : '');
      setTax(selectedProductFromApi.originalTaxPercent !== undefined ? selectedProductFromApi.originalTaxPercent.toString() : '');
      setQuantity('1'); 
    } else {
      setProductIdSearchText('');
      setProductName('');
      setPrice('');
      setTax('');
      setQuantity('');
    }
  }, [selectedProductFromApi]);

  const calculateAndUpdateAmount = useCallback(() => {
    const qtyNum = parseFloat(quantity);
    const priceNum = parseFloat(price);
    const taxPercentNum = parseFloat(tax) || 0;

    if (!isNaN(qtyNum) && !isNaN(priceNum) && qtyNum > 0 && priceNum >= 0) {
      const subTotal = qtyNum * priceNum;
      const totalAmount = subTotal * (1 + taxPercentNum / 100);
      setAmount(totalAmount);
    } else {
      setAmount(0);
    }
  }, [quantity, price, tax]);

  useEffect(() => {
    calculateAndUpdateAmount();
  }, [calculateAndUpdateAmount]);


  const handleProductIdSearchChange = (e) => {
    const query = e.target.value;
    setProductIdSearchText(query);

    if (query.trim().length > 0) {
      const suggestions = apiProductList.filter(product => {
        const idMatch = product.id.toLowerCase().includes(query.toLowerCase());
        const nameMatch = product.name.toLowerCase().includes(query.toLowerCase());
        return idMatch || nameMatch;
      });
      setFilteredSuggestions(suggestions);
      setShowSuggestions(true);

    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      onProductSelect(''); 
    }
  };

  const handleSuggestionClick = (productIdFromSuggestion) => {
    if (typeof productIdFromSuggestion === 'undefined' || productIdFromSuggestion === null) {
        console.error("handleSuggestionClick called with undefined or null productId.");
        return;
    }
    setProductIdSearchText(productIdFromSuggestion); 
    onProductSelect(productIdFromSuggestion);     
    setShowSuggestions(false);
    setFilteredSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogged) {
      alert("Please log in to add products to the cart.");
    return;
    }
    const qtyNum = parseFloat(quantity);
    const priceNum = parseFloat(price);
    const taxNum = parseFloat(tax) || 0; 

    if (productName.trim() === '') {
      alert("Product name cannot be empty. Please select a product.");
      return;
    }
    if (isNaN(qtyNum) || qtyNum <= 0) {
      alert("Quantity must be a number greater than 0.");
      return;
    }
    if (isNaN(priceNum) || priceNum < 0) {
      alert("Price must be a non-negative number.");
      return;
    }
    if (isNaN(taxNum) || taxNum < 0) {
      alert("Tax percentage must be a non-negative number.");
      return;
    }

    onAddProduct({
      databaseProductId: selectedProductFromApi ? selectedProductFromApi.id : null,
      name: productName,
      qty: qtyNum,
      price: priceNum,
      tax: taxNum,
      amount: parseFloat(amount.toFixed(2))
    });

  };

  return (
    <form onSubmit={handleSubmit} className='input-form'>
      <div className='form-row'>
        <div className='input-group product-search-group'>
          <label htmlFor="productNameDisplay">Search Product (Name /Id)</label>
          <Autocomplete
            options={apiProductList || []} 
            getOptionLabel={(option) => option.name ? `${option.name} (ID: ${option.id})` : ''}
            isOptionEqualToValue={(option, value) => option && value && option.id === value.id}
            value={selectedProductFromApi || null} 
            onChange={(event, newValue) => {
              onProductSelect(newValue ? newValue.id : '');
            }}
            inputValue={productIdSearchText}
            onInputChange={(event, newInputValue, reason) => {
              if (reason === 'input') {
                setProductIdSearchText(newInputValue);
              } else if (reason === 'clear' || (reason === 'reset' && !newInputValue && selectedProductFromApi) ) {
                setProductIdSearchText('');
                if (selectedProductFromApi) { 
                    onProductSelect('');
                }
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                style={{ width: '100%' }} 
                size="medium" 
              />
            )}
            />
        </div>

        <div className='input-group input-group-name'>
          <label htmlFor="productNameDisplay">Product Name</label>
          <input type="text" id="productNameDisplay" value={productName} readOnly style={{ backgroundColor: '#e9ecef' }} placeholder="Selected Product Name"/>
        </div>

        <div className='input-group input-group-qty'>
          <label htmlFor="quantity">Qty</label>
          <input type="number" id="quantity" placeholder="Enter Qty" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" step="1"/>
        </div>

        <div className='input-group input-group-price'>
          <label htmlFor="pricePerUnitDisplay">Price/Unit</label>
          <input type="number" id="pricePerUnitDisplay" value={price} placeholder="Selected Price"/>
        </div>

        <div className='input-group input-group-tax'>
          <label htmlFor="taxPercentageDisplay">Tax %</label>
          <input type="number" id="taxPercentageDisplay" value={tax} readOnly style={{ backgroundColor: '#e9ecef' }} placeholder="Selected Tax"/>
        </div>

        <div className='input-group input-group-amount'>
          <label htmlFor="amount">Amount (incl. Tax)</label>
          <input type="number" id="amount" value={amount.toFixed(2)} readOnly style={{ backgroundColor: '#e9ecef' }}/>
        </div>
        <AddToCartButton type="submit" disabled={!isLogged}>{isLogged ? "Add to Cart" : "Login to Add"}</AddToCartButton>
        {!isLogged && (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '10px', width: '100%' }}>
          You must be logged in to add items to the cart.
        </p>
      )}
      </div>
    </form>
  );
}

export default InputForm;