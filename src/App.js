import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { GroceryPage } from './pages/grocery';
import { LoginPage } from './pages/login';
import { SettingsPage } from './pages/settings';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/settings',
    element: <SettingsPage />
  },
  {
    path: '/',
    element: <GroceryPage />
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
