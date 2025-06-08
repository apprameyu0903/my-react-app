import React from 'react';
import { useSelector } from 'react-redux';
import ProductRow from '../row/Row';
import './tableStyle.css'


const ProductTable = () => {

    const products = useSelector(state => state.cart.cartProducts);
    
    const message = 'No Products added yet. Add some products';
    return (
        <div className='product-table-container'>
        <table className='product-table'>
            <thead className='product-table'>
                <tr>
                    <th>S.No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price/Unit</th>
                    <th>Price (total)</th>
                    <th>Tax Percent</th>
                    <th>Tax Amount</th>
                    <th>Amount (incl. tax)</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {products.length === 0 ? (
                    <tr>
                    <td colSpan = "8" style={{textAlign : 'center'}}>{message}</td>
                    </tr>) :
                (products.map((product, index) => <ProductRow key = {product.id} product={product} sNo={index + 1}/>))}
            </tbody>
        </table>
        </div>
    );
}

export default ProductTable