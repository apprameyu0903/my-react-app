import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers , deleteCustomer} from '../../redux/customerReducer';
import './customerStyles.css';
import CustomerAdd from '../customerAdd/CustomerAdd'
import CustomerEdit from '../customerEdit/CustomerEdit';
import { Button } from '@mui/material';

const CustomerTable = () => {
    const dispatch = useDispatch();
    const { customers, customerStatus } = useSelector(state => state.customers);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);


    useEffect(() => {
        if (customerStatus === 'idle') {
            dispatch(getCustomers());
        }
    }, [customerStatus, dispatch]);

    const handleDelete = (customerId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            dispatch(deleteCustomer(customerId));
        }
    };

    const handleEdit = (customer) => {
        setSelectedCustomer(customer);
        setEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setEditModalOpen(false);
        setSelectedCustomer(null);
    };

    const message = 'No Customers found. Please add some customers.';

    const toggleAddFormVisibility = () => {
        setIsAddFormVisible(!isAddFormVisible);
    };

    return (
        <div>
        <button onClick={toggleAddFormVisibility} className="toggle-add-form-button">
            {isAddFormVisible ? 'Hide Customer Form' : 'Add New Customer'}
        </button>
        <div className='customer-table-container'>
            {isAddFormVisible && <CustomerAdd />}
            <table className='customer-table'>
                <thead className='customer-table-header'>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Mobile Number</th>
                        <th>Location</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.length === 0 ? (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>{message}</td>
                        </tr>
                    ) : (
                        customers.map((customer) => (
                            <tr key={customer.customerId}>
                                <td>{customer.customerId}</td>
                                <td>{customer.customerName}</td>
                                <td>{customer.customerMobile}</td>
                                <td>{customer.customerLocation}</td>
                                <td>
                                    <Button variant="outlined" color="primary" onClick={() => handleEdit(customer)}>Edit</Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(customer.customerId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        {selectedCustomer && (
            <CustomerEdit
                open={editModalOpen}
                onClose={handleCloseEditModal}
                customer={selectedCustomer}
            />
        )}
    </div>
    );
}

export default CustomerTable;