import './App.css';
import Layout from './LayoutStructure/Layout/Layout';
import ProjectManager from './BillingPage/ProductManager'
import CustomerTable from './CustomersPage/customerTable/CustomerTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import { Provider } from 'react-redux';
import {store } from './redux/store';
import PrivateRouter from './PrivacyAuth/PrivateRoute';
import Reports from './ReportsPage/ReportsTable';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/billing" element={<PrivateRouter><ProjectManager /></PrivateRouter>} />
          <Route path="/customers" element={<PrivateRouter><CustomerTable /></PrivateRouter>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/reports" element={<Reports />}/>
          <Route path="/home" element={<PrivateRouter><Home /></PrivateRouter>}/>
          <Route path="/" element={<PrivateRouter><Home /></PrivateRouter>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
