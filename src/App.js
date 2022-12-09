import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/navigationBar";
import HomePage from "./components/pages/homepage";
import CartPage from "./components/pages/cartPage";
import { createContext } from "react";
import { getProducts } from "./service/products";
import { useState, useEffect } from "react";
import CheckoutPage from "./components/pages/checkoutPage";

export const cartItemsContext = createContext([]);

function App() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);


  useEffect(() => {
    getProducts().then((response) => {
      setProducts(JSON.parse(response));
    });
  }, []);

  var value = { products, setProducts, cartProducts,  setCartProducts};

  return (
    <cartItemsContext.Provider value={value}>
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart/checkout" element={<CheckoutPage />} />

          </Routes>
        </BrowserRouter>
      </div>
    </cartItemsContext.Provider>
  );
}

export default App;
