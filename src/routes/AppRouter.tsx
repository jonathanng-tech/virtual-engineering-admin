import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StorePage from '@/pages/StorePage';
import BrandPage from '@/pages/BrandPage';
import HomePage from '@/pages/HomePage';
import DomainRedirect from './DomainRedirect';

const AppRouter: React.FC = () => (
  <Router>
    <DomainRedirect />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:brand" element={<BrandPage />} />
      <Route path="/:brand/:store" element={<StorePage />} />
    </Routes>
  </Router>
);

export default AppRouter;
