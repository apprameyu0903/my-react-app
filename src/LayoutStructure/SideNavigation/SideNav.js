import React from 'react';
import './navStyle.css';
import { Link, useNavigate } from 'react-router-dom';
import { MenuButton } from '../../BillingPage/StyledComponents';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import GroupIcon from '@mui/icons-material/Group';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/userReducer';

function SideNav({open, onClose}) {

    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
        dispatch(logout());
    } 

    const listContent = () => (
        <div className="sidenav-drawer-content">
            <MenuIcon fontSize='large'/>
            <h2 className='menu-heading'>Menu Options</h2>
            <List>
                {!user ? (
                    <ListItem button component={Link} to="/login" onClick={onClose}>
                        <MenuButton style={{ width: '100%', marginBottom: '10px' }}><LoginIcon />Login</MenuButton>
                    </ListItem>
                ) : (
                    <ListItem button onClick={handleLogout}>
                        <MenuButton style={{ width: '100%', marginBottom: '10px' }}><LogoutIcon />Logout</MenuButton>
                    </ListItem>
                )}
                <ListItem button component={Link} to="/home" onClick={onClose}> 
                    <MenuButton style={{ width: '100%', marginBottom: '10px' }}><HomeIcon />Home</MenuButton>
                </ListItem>
                <ListItem button component={Link} to="/customers" onClick={onClose}>
                    <MenuButton style={{ width: '100%' }}><GroupIcon />Customers</MenuButton>
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