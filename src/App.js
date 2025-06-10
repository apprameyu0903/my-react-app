import './App.css';
import Layout from './LayoutStructure/Layout/Layout';
import ProjectManager from './BillingPage/ProductManager'
import CustomerTable from './CustomersPage/customerTable/CustomerTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import { Provider } from 'react-redux';
import {store , persistor} from './redux/store';
import PrivateRouter from './PrivacyAuth/PrivateRoute';
import { PersistGate } from 'redux-persist/integration/react';
import SessionTimeout from './SessionTimeout';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
      <SessionTimeout />
      <Layout>
        <Routes>
          <Route path="/billing" element={<PrivateRouter><ProjectManager /></PrivateRouter>} />
          <Route path="/customers" element={<PrivateRouter><CustomerTable /></PrivateRouter>} />
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<PrivateRouter><Home /></PrivateRouter>}/>
          <Route path="/" element={<PrivateRouter><Home /></PrivateRouter>}/>
        </Routes>
      </Layout>
    </BrowserRouter>
    </PersistGate>
    </Provider>
  );
}

export default App;
