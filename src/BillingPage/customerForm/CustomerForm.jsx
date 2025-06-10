import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { selectCustomer, addCustomer } from "../../redux/customerReducer";
import { createFilterOptions } from '@mui/material/Autocomplete';
import './customerStyles.css';

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

const CustomerForm = () => {
    const dispatch = useDispatch();
    const { customers, selectedCustomer } = useSelector(state => state.customers);
    const [open, setOpen] = useState(false);
    const [newCustomerId, setNewCustomerId] = useState('');
    const [newCustomerName, setNewCustomerName] = useState('');
    const [newCustomerMobile, setNewCustomerMobile] = useState('');
    const [newCustomerLocation, setNewCustomerLocation] = useState('');


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCustomerChange = (event, newValue) => {
        if (newValue && newValue.isAddNew) {
            handleOpen();
        } else {
            dispatch(selectCustomer(newValue));
        }
    };

    const handleAddNewCustomer = () => {
        const newCustomer = {
            customerId : newCustomerId,
            customerName: newCustomerName,
            customerMobile: newCustomerMobile,
            customerLocation: newCustomerLocation,
        };
        dispatch(addCustomer(newCustomer));
        setNewCustomerId('');
        setNewCustomerName('');
        setNewCustomerMobile('');
        setNewCustomerLocation('');
        handleClose();
    };


    const filter = createFilterOptions();
    return (
        <div>
            <form className="customer-form">
                <div className="form-row">
                    <div className="input-group input-customer-name">
                        <label htmlFor="customerNameDisplay">Customer Name</label>
                        <Autocomplete
                            options={customers || []}
                            getOptionLabel={(option) => option.customerName ? `${option.customerName} -- ${option.customerMobile}` : ''}
                            isOptionEqualToValue={(option, value) => option && value && option.customerId === value.customerId}
                            value={selectedCustomer || null}
                            onChange={handleCustomerChange}
                            filterOptions={(options, params) => {
                            const filtered = filter(options, {
                                ...params,
                                getOptionLabel: (option) => `${option.customerName} ${option.customerMobile}`
                            });

                            if (true) {
                                filtered.push({
                                    customerName: `+ Add New Customer`,
                                    isAddNew: true,
                                });
                            }
                            return filtered;
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
                </div>
            </form>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Add New Customer</h2>
                    <TextField label="Id" value={newCustomerId} onChange={(e) => setNewCustomerId(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Name" value={newCustomerName} onChange={(e) => setNewCustomerName(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Mobile" value={newCustomerMobile} onChange={(e) => setNewCustomerMobile(e.target.value)} fullWidth margin="normal" />
                    <TextField label="Location" value={newCustomerLocation} onChange={(e) => setNewCustomerLocation(e.target.value)} fullWidth margin="normal" />
                    <Button onClick={handleAddNewCustomer} variant="contained" color="primary">Save Customer</Button>
                </Box>
            </Modal>
        </div>
    );
}

export default CustomerForm;