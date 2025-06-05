import React , {useState} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideNav from '../SideNavigation/SideNav';
import Body from '../Body/Body';
import './Style.css';

const Layout = ({children}) => {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };
    return(
      <div className='layout-container'> 
      <Header onMenuButtonClick={handleDrawerToggle}/>
      <div className="layout-middle-section"> 
        <SideNav open={drawerOpen} onClose={handleDrawerClose}/>
        <main className='layout-main-content'>
        <Body> {children}</Body>
        </main>
      </div>
      <Footer />
    </div>
    );
}

export default Layout;
