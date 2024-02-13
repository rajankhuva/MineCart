import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const navigate = useNavigate();
  const handleNavigate = (url) => {
    navigate(url);
  };

  const handleLogOut = () => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }
  return (
    <header className="header">
      <div className="logo">Mine Cart</div>
      <nav className="navigation">
        <ul>
          <li
            onClick={() => {
              handleNavigate("/");
            }}
          >
            Products
          </li>
        
        </ul>
      </nav>
      <div>
      <span
        className="cart-icon"
        onClick={() => {
          handleNavigate("/cart");
        }}
      >
        🛒
      </span>
      <span
        className="cart-icon"       
      ><LogoutIcon style={{color : "#BEBEBE" ,marginTop: "3px" }} onClick={handleLogOut}/>
       
      </span></div>
    </header>
  );
};

export default Header;
