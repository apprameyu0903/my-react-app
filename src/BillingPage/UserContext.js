import React, { createContext, useState, useContext, useEffect } from 'react'

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

    const [userObject, setUserObject] = useState({ name: "Demo User", id: 123 });

    const isLogged = !!userObject;

    useEffect(() => {
        if (userObject && userObject.name !== "Demo User") {
            setUserObject(null);
        }
    }, [userObject]);


    const contextValue = { userObject, isLogged};


    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
