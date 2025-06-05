import './App.css';
import Layout from './LayoutStructure/Layout/Layout';
import ProjectManager from './BillingPage/ProductManager'
import { UserProvider } from './BillingPage/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';

function App() {

  return (
    <UserProvider >
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/billing" element={ <ProjectManager />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
