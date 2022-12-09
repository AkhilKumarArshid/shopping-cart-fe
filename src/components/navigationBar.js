import { NavLink } from "react-router-dom";
import useImage from '../hooks/useImage'

var NavBar = () => {
  const {image} = useImage('cart');

  return (
    <>
      <div className="nav-bar">
        <div>
          <img className="logo" src={image} alt="logo"/>
          <NavLink className={"app-name"} to="/"> SOLITON Bazar</NavLink>
        </div>
        <div className="nav-bar-ele">
          <NavLink to="/home" className={"nav-btn"}>Home</NavLink>
          <NavLink to="/cart" className={"nav-btn"}>Cart</NavLink>
        </div>

      </div>
    </>
  );
};

export default NavBar;
