import React, {useState, useEffect} from 'react';
import './rowStyle.css'
import { useDispatch } from 'react-redux';
import { deleteCartItem , updateCartItem } from '../../redux/cartReducer';


const ProductRow = ({product, sNo}) => {

    const [editedName, setEditedName] = useState(product.name);
    const [editedQty, setEditedQty] = useState(product.qty.toString());
    const [editedPrice, setEditedPrice] = useState(product.price.toString());
    const dispatch = useDispatch();
    useEffect(() => {
        setEditedName(product.name);
        setEditedQty(product.qty.toString());
        setEditedPrice(product.price.toString());
    }, [product]);

    const handleDeleteProductFromCart = (cartItemId) => {
        dispatch(deleteCartItem(cartItemId));
    }

    const handleSave = () => {
        const qtyNum = parseFloat(editedQty);
        const priceNum = parseFloat(editedPrice);

        if (editedName.trim() === '') {
            alert("Product name cannot be empty.");
            return;
        }
        if (isNaN(qtyNum) || qtyNum <= 0) {
            alert("Quantity must be a number greater than 0.");
            return;
        }
        if (isNaN(priceNum) || priceNum <= 0) {
            alert("Price must be a number greater than 0.");
            return;
        }

        dispatch(updateCartItem({
            ...product,
            qty: editedQty,
            price: editedPrice,
        }));
    };

    const handleInputKeyDown = (event) => {
        if (event.key === 'Tab') {
            handleSave();
        }
    };

    const subTotal = (parseFloat(editedQty) * parseFloat(editedPrice)) || 0;
    const taxAmount = (subTotal * (parseFloat(product.tax)/100))
    const currentAmount = subTotal + taxAmount|| 0;

    return (
   <tr className='product-row editing'>
                <td>{sNo}</td>
                <td>{product.name}</td>
                <td>
                    <input
                        type="number"
                        value={editedQty}
                        onChange={(e) => setEditedQty(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min="0"
                        step="any"
                    />
                </td>
                <td>
                    <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        onKeyDown={handleInputKeyDown}
                        min="0"
                        step="any"
                    />
                </td>
                <td>{subTotal.toFixed(2)}</td>
                <td>{product.tax.toFixed(2)}</td>
                <td>{taxAmount.toFixed(2)}</td>
                <td>{currentAmount.toFixed(2)}</td>
                <td><button onClick={() => handleDeleteProductFromCart(product.cartItemId)}>Delete</button></td>
            </tr>
    );
}

export default ProductRow;