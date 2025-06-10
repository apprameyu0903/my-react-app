// src/ProjectManager.jsx
import React, { useEffect, useCallback} from 'react';
import InputForm from './inputForm/InputForm';
import ProductTable from './table/Table';
import TotalAmount from './total/Total';
import axios from 'axios';
import CustomerForm from './customerForm/CustomerForm';
import { ApiError } from './StyledComponents';
import {clearCart , updateInvoice} from '../redux/cartReducer';
import { getProducts } from '../redux/productListReducer';
import { getCustomers , selectCustomer } from '../redux/customerReducer';
import { clearCustomerSelection } from '../redux/customerReducer';
import { clearProducts } from '../redux/productListReducer';
import { useDispatch, useSelector } from 'react-redux';

const ProjectManager = () => {
  const cartProducts = useSelector(state => state.cart.cartProducts);
  const {selectedCustomer , customers} = useSelector(state => state.customers);
  const { productStatus, error: apiError } = useSelector(state => state.products);
  const user = useSelector(state => state.users.user);
  const { customerStatus, error: customerError } = useSelector(state => state.customers);
  const dispatch = useDispatch();
  const { currentInvoice } = useSelector(state => state.cart);

  useEffect(() => {
  if (productStatus === 'idle') {
      dispatch(getProducts());
  }
  }, [productStatus, dispatch]);

  useEffect(() => {
      if (customerStatus === 'idle'){
          dispatch(getCustomers());
      }
  }, [customerStatus , dispatch]);

   useEffect(() => {
        if (currentInvoice && customers.length > 0) {
            const customerForInvoice = customers.find(c => c.customerId === currentInvoice.customerId);
            if (customerForInvoice) {
                dispatch(selectCustomer(customerForInvoice));
            }
        }
    }, [currentInvoice, customers, dispatch]);

  const handleClearAllCartProducts = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all products from the cart?")) {
      dispatch(clearCart());
    }
  }, [dispatch]);

  const handleExportCartAsJson = async () => {
    
    const employeeId = user ? user.userId : 'null';
    const customerId = selectedCustomer.customerId;
    const items = cartProducts.map(p => {

      const productId = p.dbProductId ? parseInt(p.dbProductId,10) : null;
      return {
        productId : productId,
        quantity : p.qty
      }

    });

    const invoiceData = {
      customerId: customerId,
      employeeId: employeeId,
      items: items
    };

    try {
      if (currentInvoice) {
          await dispatch(updateInvoice({ ...invoiceData, invoiceId: currentInvoice.invoiceId })).unwrap();
          alert("Invoice updated successfully!");
      } else {
          const response = await axios.post('http://localhost:5050/api/invoice', invoiceData);
          alert("Invoice submitted successfully!");
          console.log("Server response:", response.data);
      }

            dispatch(clearCart());
            dispatch(clearCustomerSelection());
            dispatch(clearProducts());

    } catch (error) {
      console.error("Failed to submit invoice:", error);
      const errorMessage = error.response ? JSON.stringify(error.response.data) : error.message;
      alert(`Error submitting invoice: ${errorMessage}`);
    }
  };



  return (
    <div>
      {productStatus === 'failed' && <ApiError>API Error: {apiError}</ApiError>}
      {customerStatus === 'failed' && <ApiError>API Error (Customers): {customerError}</ApiError>}
      <main>
        <CustomerForm />
        <InputForm/>
        <ProductTable />
        <TotalAmount/>
        <div style={{display: 'flex', justifyContent: 'center', gap:'15px', marginTop:'15px'}}>
        {cartProducts.length > 0 && (
            <button onClick={handleExportCartAsJson} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                {currentInvoice ? 'Update Invoice' : 'Proceed'}
            </button>
        )}
        {cartProducts.length > 0 && (
          <button onClick={handleClearAllCartProducts} style={{  padding: '10px 20px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Clear All Cart Products
          </button>
        )}

        </div>

      </main>
      
    </div>
  );
}

export default ProjectManager;