import React from 'react';
import './navStyle.css'

function SideNav() {
    return(

        <nav className='sidenav-container'>
            <p>Side Navigation</p>
            <ul>
                <li>Home</li>
                <li>Dashboard</li>
                <li>others</li>
            </ul>
        </nav>

    );
}

export default SideNav;