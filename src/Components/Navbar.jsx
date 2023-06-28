import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="nav-header">
        <ul className="nav-links">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>
      <div className="cart-btn-wrapper">
        <Link to="/cart" className="cart-btn">
          Cart
          <span className="cart-container">
            <FaShoppingCart />
            <span className="cart-value">10</span>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
