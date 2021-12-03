import React from 'react';
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./components/shop/shop.component";
import Header from "./components/header/header.component";
import './App.css';
import { Route, Routes } from "react-router-dom";



function App() {
  return (
      <div>
          <Header/>
          <Routes>
              <Route exact path='/' element={<HomePage/>}/>
              <Route path='/shop' element={<ShopPage/>}/>
          </Routes>
      </div>

  );
}

export default App;
