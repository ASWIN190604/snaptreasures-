import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import MainLayout from './layouts/MainLayout';

import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Personalize from './pages/Personalize';
import BulkOrders from './pages/BulkOrders';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="personalize/:id" element={<Personalize />} />
              <Route path="bulk-orders" element={<BulkOrders />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </WishlistProvider>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
