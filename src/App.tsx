import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Admin from '@/pages/Admin';

import Projetos from '@/pages/Projetos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/projetos" element={<Projetos />} />
    </Routes>
  );
}

export default App;
