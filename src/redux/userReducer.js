import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        const response = await axios.get('http://localhost:2105/api/employees');
        const responseData = response.data
        const formattedUserList = responseData.map(user => {

            return {
                userId : user.empId,
                userName : user.empName,
                userRole : user.postion,
                userPhone : user.phone
            }

        }).filter(user => user !== null)
        return formattedUserList;
    }
)

const userSlice = createSlice({
    name: 'users',
    initialState: {
        user: null,
        users : []
    },
    reducers:{
        login : (state,action) => {
            state.user = action.payload;
        },
        logout : (state, action) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.fulfilled, (state, action) => {
                        state.users = action.payload;
            
                    })
    }

})

export const {login , logout} = userSlice.actions;
export default userSlice.reducer;