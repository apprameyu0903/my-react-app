import React from "react";
import { useSelector } from "react-redux";
import {Navigate}  from "react-router-dom";

const PrivateRouter = ({children}) => {

    const user = useSelector(state => state.users.user);
    if(!user){
        return <Navigate to="/login" />;
    }

    return children;
}

export default PrivateRouter; 