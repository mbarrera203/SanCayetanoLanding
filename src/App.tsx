import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ProductsProvider } from './contexts/ProductsContext';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';

export function App() {
  return (
    <ProductsProvider>
      <SettingsProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </SettingsProvider>
    </ProductsProvider>
  );
}
