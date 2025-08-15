import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './components/MainApp';
import EmployeePortal from './components/EmployeePortal';
import QuickRegister from './components/QuickRegister';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/employee/*" element={<EmployeePortal />} />
        <Route path="/register" element={<QuickRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
