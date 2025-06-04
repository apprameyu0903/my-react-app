import React , { useState, useEffect } from 'react';
import './headerStyle.css'

function Header () {

    const [dateTime, setDateTime] = useState(new Date())
    useEffect(() => {
            const timer = setInterval(() => {
                setDateTime(new Date());
            }, 1000);

            return () => {clearInterval(timer);};

        },[]);
    return (
        
        <header className='header-container'>
            <h2>Product Cart Management</h2>
            <p className='live-datetime'>{dateTime.toLocaleString()}</p>
        </header>
    );
}

export default Header;

