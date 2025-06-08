import React, { createContext, useState, useContext} from 'react'

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [userObject, setUserObject] = useState({name: "Demo User", employeeId: "EMP002" });

    const isLogged = Boolean(userObject);

    if (userObject && userObject.name !== "Demo User"){
        setUserObject(null);
    }

    const contextValue = { userObject, isLogged};


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    return context;
};
