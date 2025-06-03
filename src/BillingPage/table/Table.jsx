import React from 'react';
import ProductRow from '../row/Row';
import './tableStyle.css'

const ProductTable = ({products, onDeleteProduct, onEditProduct, onSaveProduct, onCancelEdit, editingProductId}) => {
    
    const message = 'No Products added yet. Add some products';
    return (
        <div className='product-table-container'>
        <table className='product-table'>
            <thead className='product-table'>
                <tr>
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
                (products.map((product) => <ProductRow key = {product.id} product={product} onDeleteProduct={onDeleteProduct} onEditProduct={onEditProduct}
                            onSaveProduct={onSaveProduct} onCancelEdit={onCancelEdit} isEditing={editingProductId === product.id}/>))}
            </tbody>
        </table>
        </div>
    );
}

export default ProductTable