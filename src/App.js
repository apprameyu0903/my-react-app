import './App.css';
import Layout from './LayoutStructure/Layout/Layout';
import ProjectManager from './BillingPage/ProductManager'
import { UserProvider } from './BillingPage/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Login/Login';

function App() {

  return (
    <UserProvider >
      <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={ <ProjectManager />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
