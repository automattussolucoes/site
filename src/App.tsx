import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';
import Automacao from '@/pages/Automacao';
import CRM from '@/pages/CRM';
import PDV from '@/pages/PDV';
import Obras from '@/pages/Obras';
import Barber from '@/pages/Barber';
import PaginaProdutos from '@/pages/PaginaProdutos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/automacao" element={<Automacao />} />
      <Route path="/crm" element={<CRM />} />
      <Route path="/pdv" element={<PDV />} />
      <Route path="/obras" element={<Obras />} />
      <Route path="/barber" element={<Barber />} />
      <Route path="/produtos" element={<PaginaProdutos />} />
    </Routes>
  );
}

export default App;
