import React from 'react';
import './navStyle.css'
import { Link } from 'react-router-dom';

function SideNav() {
    return(

        <nav className='sidenav-container'>
            <p>Side Navigation</p>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li>Dashboard</li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>

    );
}

export default SideNav;