import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../../redux/customerReducer';
import './addCustomerFormStyle.css';

const AddCustomerForm = () => {
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [customerLocation, setCustomerLocation] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (customerId.trim() === ''||customerName.trim() === '' || customerMobile.trim() === '' || customerLocation.trim() === '') {
            alert('Please fill all the fields');
            return;
        }
        dispatch(addCustomer({
            customerId,
            customerName,
            customerMobile,
            customerLocation
        }))
        .unwrap()
        .then(() => {
            alert('Customer added successfully!');
            setCustomerName('');
            setCustomerMobile('');
            setCustomerLocation('');
        })
        .catch((error) => {
            alert(`Failed to add customer: ${error.message}`);
        });
    };

    return (
        <div className="add-customer-form-container">
            <h2>Add New Customer</h2>
            <form onSubmit={handleSubmit} className="add-customer-form">

                <div className="form-group">
                    <label htmlFor="customerId">Customer Id</label>
                    <input
                        type="text"
                        id="customerId"
                        value={customerId}
                        onChange={(e) => setCustomerId(e.target.value)}
                        placeholder="Enter Customer Id"
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter Customer Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerMobile">Mobile Number</label>
                    <input
                        type="text"
                        id="customerMobile"
                        value={customerMobile}
                        onChange={(e) => setCustomerMobile(e.target.value)}
                        placeholder="Enter Mobile Number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="customerLocation">Location</label>
                    <input
                        type="text"
                        id="customerLocation"
                        value={customerLocation}
                        onChange={(e) => setCustomerLocation(e.target.value)}
                        placeholder="Enter Location"
                    />
                </div>
                <button type="submit" className="add-customer-button">Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomerForm;