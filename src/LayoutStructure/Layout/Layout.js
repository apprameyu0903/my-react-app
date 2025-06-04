import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SideNav from '../SideNavigation/SideNav';
import Body from '../Body/Body';
import './Style.css';

const Layout = ({children}) => {
    return(
      <div className='layout-container'> 
      <Header />
      <div className="layout-middle-section"> 
        <SideNav/>
        <main className='layout-main-content'>
        <Body> {children}</Body>
        </main>
      </div>
      <Footer />
    </div>
    );
}

export default Layout;
