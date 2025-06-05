import React , { useState, useEffect } from 'react';
import './headerStyle.css'
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Header ({onMenuButtonClick}) {

    const [dateTime, setDateTime] = useState(new Date())
    useEffect(() => {
            const timer = setInterval(() => {
                setDateTime(new Date());
            }, 1000);
            return () => {clearInterval(timer);};

        },[]);
    return (
        <header className='header-container'>
            <IconButton color="inherit" onClick={onMenuButtonClick}>
                <MenuIcon />
            </IconButton>
            <div className='header-main-content'>
            <h1><ShoppingBagIcon/>Ashoka's SuperBazaar<ShoppingBagIcon/></h1>
            <p className='live-datetime'>{dateTime.toLocaleString()}</p>
            </div>
            <AccountCircleIcon fontSize='large'/>
            <p style={{paddingRight: '20px' , paddingLeft:'10px'}}>Employee name</p>
        </header>
    );
}

export default Header;

