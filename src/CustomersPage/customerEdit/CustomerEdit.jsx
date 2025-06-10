import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../redux/customerReducer';
import { Modal, Box, TextField, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CustomerEdit = ({ open, onClose, customer }) => {
    const [customerId, setCustomerId] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerMobile, setCustomerMobile] = useState('');
    const [customerLocation, setCustomerLocation] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (customer) {
            setCustomerId(customer.customerId);
            setCustomerName(customer.customerName);
            setCustomerMobile(customer.customerMobile);
            setCustomerLocation(customer.customerLocation);
        }
    }, [customer]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCustomer({
            ...customer,
            customerName,
            customerMobile,
            customerLocation
        }));
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box sx={style}>
                <h2>Edit Customer</h2>
                <form onSubmit={handleSubmit}>
                    <TextField label="Customer Id" value={customerId} onChange={(e) => setCustomerId(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Mobile" value={customerMobile} onChange={(e) => setCustomerMobile(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Location" value={customerLocation} onChange={(e) => setCustomerLocation(e.target.value)} fullWidth margin="normal" />
                    <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CustomerEdit;