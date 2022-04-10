import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GroceryPage } from './pages/grocery';
import { LoginPage } from './pages/login';
import { SettingsPage } from './pages/settings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<LoginPage />} path='/login' />
        <Route element={<SettingsPage />} path='/settings' />
        <Route element={<GroceryPage />} path='/' />
      </Routes>
    </Router>
  );
};

export default App;
