import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useImage from '../hooks/useImage';
import { cartItemsContext } from "../App";
var NavBar = () => {
  const {image} = useImage('cart');
  const {products} = useContext(cartItemsContext);

  return (
    <>
      <div className="nav-bar">
        <div>
          <img className="logo" src={image} alt="logo"/>
          <NavLink className={"app-name"} to="/"> SOLITON Bazar</NavLink>
        </div>
        <div className="nav-bar-ele">
          <NavLink to="/home" className={"nav-btn"}>Home<img className="icon" src={useImage('home').image} alt="home"/></NavLink>
          <NavLink to="/cart" className={"nav-btn"}>Cart<img className="icon" src={useImage('basket').image} alt="cart"/>{products.filter((item)=> item.selected >0).length > 0 && <span className="cart-count">{(products.filter((item)=> item.selected >0)).length}</span>}</NavLink>
        </div>

      </div>
    </>
  );
};

export default NavBar;
