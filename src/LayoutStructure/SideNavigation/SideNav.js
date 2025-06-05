import React from 'react';
import './navStyle.css';
import { Link } from 'react-router-dom';
import { MenuButton } from '../../BillingPage/StyledComponents';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';


function SideNav({open, onClose}) {


    const listContent = () => (
        <div className="sidenav-drawer-content">
            <MenuIcon fontSize='large'/>
            <h2 className='menu-heading'>Menu Options</h2>
            <List>
                <ListItem button component={Link} to="/login" onClick={onClose}>
                    <MenuButton style={{ width: '100%', marginBottom: '10px' }}><LoginIcon/>Login</MenuButton>
                </ListItem>
                <ListItem button component={Link} to="/home" onClick={onClose}> 
                    <MenuButton style={{ width: '100%', marginBottom: '10px' }}><HomeIcon />Home</MenuButton>
                </ListItem>
                <ListItem button component={Link} to="/billing" onClick={onClose}>
                    <MenuButton style={{ width: '100%' }}><ShoppingCartIcon/>Cart</MenuButton>
                </ListItem>
            </List>
        </div>
    );

    return (
        <Drawer anchor="left" open={open} onClose={onClose}
            PaperProps={{
              sx: {
                backgroundColor: 'aliceblue', 
              }
            }}
        >
            {listContent()}
        </Drawer>
    );
}

export default SideNav;