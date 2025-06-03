import './App.css';
import Layout from './LayoutStructure/Layout/Layout';
import ProjectManager from './BillingPage/ProductManager'
import { UserProvider } from './BillingPage/UserContext';

function App() {

  return (
    <UserProvider >
    <Layout>
    <ProjectManager />
    </Layout>
    </UserProvider>
  );
}

export default App;
