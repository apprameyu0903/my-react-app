import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { selectCustomer } from "../../redux/customerReducer";
import './customerStyles.css';

const CustomerForm = () => {
    const dispatch = useDispatch();
    const { customers, selectedCustomer} = useSelector(state => state.customers);
    console.log(customers);

    const handleCustomerChange = (event, newValue) => {
        dispatch(selectCustomer(newValue));
    };



    return (
        <div>
            <form className="customer-form">
                <div className="form-row">
                    <div className="input-group input-customer-name">
                        <label htmlFor="customerNameDisplay">Customer Name</label>
                        <Autocomplete
                            options={customers || []}
                            getOptionLabel={(option) => option.customerName ? `${option.customerName} (ID: ${option.customerId})` : ''}
                            isOptionEqualToValue={(option, value) => option && value && option.customerId === value.customerId}
                            value={selectedCustomer || null}
                            onChange={handleCustomerChange}
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
        </div>
    );
}

export default CustomerForm;