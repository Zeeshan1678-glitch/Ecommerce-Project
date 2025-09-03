import {Routes, Route } from 'react-router';
import axios from 'axios';
import { HomePage } from './pages/HomePage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { TrackingPage } from './pages/TrackingPage';
import './App.css'
import { useEffect,useState } from 'react';

function App() {
   const [cart, setCart] = useState([]);
   useEffect(() => {
       axios.get('/api/cart-items?expand=product')
           .then((response) => {
               setCart(response.data);
           });
   }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} />}></Route> 
      <Route path="checkout" element={<CheckoutPage cart={cart} />}></Route>
      <Route path="orders" element={<OrdersPage cart={cart} />}></Route>
      <Route path="tracking" element={<TrackingPage />}></Route>
    </Routes>
  )
}

export default App;
