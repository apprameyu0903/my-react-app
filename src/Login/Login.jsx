import React , { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, getUsers} from '../redux/userReducer';
import { useNavigate } from "react-router-dom";
import './loginStyles.css'

const Login = () => {

    const [userName , setUserName] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [employeeNum, setEmployeeNum] = useState('');
    const {users} = useSelector(state => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(getUsers());
    },[dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = users.find(user => user.userName === userName && user.userId === employeeId && user.userPhone === employeeNum );

        if (user){
            dispatch(login(user));
            navigate("/home");
        } else {
            alert('invalid creds');
        }

    }

    return(
        <div className="login-container">
        <div className="form-group">
            <div className="form-row">
                <div className="input-username">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)} required></input>
                </div>
                <div className="input-employee-id">
                    <label htmlFor="employee-id">Employee Id: </label>
                    <input type="password" name="employeeid" placeholder="Enter Employee Id" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required></input>
                </div>
                <div className="input-employee-num">
                    <label htmlFor="employee-num">Employee Number: </label>
                    <input type="number" name="employee-num" placeholder="Enter Employee Number" value={employeeNum} onChange={(e) => setEmployeeNum(e.target.value)} required></input>
                </div>
            </div>
            <button type="submit" className="login-button" onClick={handleSubmit}>Continue</button>
        </div>
        </div>

    );
}

export default Login;