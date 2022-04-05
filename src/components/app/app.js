import React from "react";
import { Route, Routes } from 'react-router-dom'
import { HomePage, CartPage } from '../pages/index.js'
import './app.css';



const App = () => {
  return(
    <Routes>
      <Route 
        path='/'
        element={<HomePage/>}
      />
      <Route 
        path='/cart'
        element={<CartPage/>}
      />
    </Routes>
    // <div>App</div>
  );
};

export default App;