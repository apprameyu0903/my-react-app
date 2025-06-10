import React , {useEffect} from "react";
import { useSelector , useDispatch } from "react-redux";
import { getCarts } from "../redux/cartReducer";
import { useNavigate } from "react-router-dom";
import './reportsStyle.css';
import { getInvoiceById } from "../redux/cartReducer";
import { selectCustomer } from "../redux/customerReducer";
const Reports = () => {

    const dispatch = useDispatch();
    const { carts } = useSelector(state => state.cart);
    const { customers } = useSelector(state => state.customers);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getCarts());
    }, [dispatch]);

    const handleEdit = (cart) => {
        const customerToSelect = customers.find(c => c.customerId === cart.customerId);
        if (customerToSelect) {
            dispatch(selectCustomer(customerToSelect));
        }
        dispatch(getInvoiceById(cart.invoiceId));
        navigate("/billing");
    };


    return(
        <div>
            <div className='cart-table-container'>
                <table className='cart-table'>
                    <thead className='cart-table-header'>
                        <tr>
                            <th>Invoice ID</th>
                            <th>Invoice Number</th>
                            <th>Customer Id</th>
                            <th>Employee Id</th>
                            <th>Due Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts && carts.map(cart => (
                            <tr key={cart.invoiceId}>
                                <td>{cart.invoiceId}</td>
                                <td>{cart.invoiceNumber}</td>
                                <td>{cart.customerId}</td>
                                <td>{cart.empId}</td>
                                <td>{cart.dueDate}</td>
                                <td><button onClick={handleEdit}>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Reports;