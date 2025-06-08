import React from 'react';
import './Total.css'
import { useSelector } from 'react-redux';

const TotalAmount = () => {
  const {totalAmount , subTotal , taxTotal} = useSelector(state => state.cart);
    if (totalAmount === 0) return null;

    return (
    <div className='total-container'>
      <p>
        SubTotal: <span>{subTotal.toFixed(2)}</span>
      </p>
      <p>
        TotalTax: <span>{taxTotal.toFixed(2)}</span>
      </p>
      <p>
        Total: <span>{totalAmount.toFixed(2)}</span>
      </p>
    </div>
  );
}

export default TotalAmount