import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getCustomers = createAsyncThunk(
    'customers/getCustomers',
    async () => {
        const response = await axios.get("http://localhost:8080/api/customers")
        let responseData = response.data;
        if (!Array.isArray(responseData)) {
            console.warn("API did not return an array for customers, wrapping in an array:", responseData);
            responseData = [responseData];
        }
        console.log(responseData);
        const formattedCustomerList = responseData.map(customer => {
            if (!customer || typeof customer.customerId === 'undefined' || customer.customerId === null ||
                typeof customer.customerName === 'undefined' || customer.customerName === null || customer.customerMobile === null) {
              console.warn("Skipping product with missing productId or name from API:", customer);
              return null;
            }
            return{
                customerId : customer.customerId,
                customerName: customer.customerName,
                customerMobile: customer.customerMobile,
                customerLocation: customer.customerLocation
            }
        }).filter(customer => customer !== null);
        return formattedCustomerList;
    }
    
);

export const addCustomer = createAsyncThunk(
    'customers/addCustomer',
    async (customerData, {dispatch}) => {   

        const response = await axios.post("http://localhost:8080/api/customers", customerData);
        dispatch(getCustomers());
        return response.data;

})

export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (customerId, { dispatch }) => {
        await axios.delete(`http://localhost:8080/api/customers/${customerId}`);
        dispatch(getCustomers());
        return customerId;
    }
);

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async (customerData, { dispatch }) => {
        const response = await axios.put(`http://localhost:8080/api/customers/${customerData.customerId}`, customerData);
        dispatch(getCustomers());
        return response.data;
    }
);

export const customerSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: [],
        selectedCustomer: null,
        customerStatus: 'idle',
        error: null
    },
    reducers: {
        selectCustomer : (state , action) => {
            state.selectedCustomer = action.payload;
        },
        clearCustomerSelection: (state) => {
            state.selectedCustomer = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCustomers.fulfilled, (state, action) => {
                state.customerStatus = 'succeeded';
                state.customers = action.payload;
                console.log(action.payload);
            })
            .addCase(getCustomers.rejected, (state, action) => {
                state.customerStatus = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                state.customers = state.customers.filter(customer => customer.customerId !== action.payload);
            })
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.customers.findIndex(customer => customer.customerId === action.payload.customerId);
                if (index !== -1) {
                    state.customers[index] = action.payload;
                }
            });
    }

})

export const {selectCustomer , clearCustomerSelection} = customerSlice.actions;
export default customerSlice.reducer;