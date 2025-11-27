import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes'; 
import Acomodacoes from './pages/Acomodacoes';
import Hospedagem from './pages/Hospedagem';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="acomodacoes" element={<Acomodacoes />} />
          <Route path="hospedagem" element={<Hospedagem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;