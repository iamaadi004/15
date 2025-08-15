import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeLogin from './EmployeeLogin';
import EmployeeDashboard from './EmployeeDashboard';

const StaffPortal: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<EmployeeLogin />} />
      <Route path="/login" element={<EmployeeLogin />} />
      <Route path="/dashboard" element={<EmployeeDashboard />} />
    </Routes>
  );
};

export default StaffPortal;
