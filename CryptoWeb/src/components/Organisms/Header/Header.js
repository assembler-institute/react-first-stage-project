import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { CryptoWebContext } from "../../../context/CryptoWeb/reducer";
import "./header.scss";

function Header() {
  const { user, logOut } = useContext(CryptoWebContext);

  function handleLogOut() {
    logOut();
  }

  return (
    <header>
      <div className="header__nav">
        <Link style={{ textDecoration: "none", color: "white" }} to="/home">
          <div className="header__nav__item">
            <i className="fas fa-bars"></i> Menu
          </div>
        </Link>
        <div className="header__nav__item">
          <i className="fas fa-search"></i> Search
        </div>
      </div>
      <div className="header__title">
        <h1>CryptoWeb</h1>
        <i className="fas fa-coins"></i>
      </div>
      <div className="header__media">
        <div className="header__media__item">
          <i className="fab fa-facebook-square"></i>
        </div>
        <div className="header__media__item">
          <i className="fab fa-instagram"></i>
        </div>
        <div className="header__media__item">
          <i className="fab fa-twitter-square"></i>
        </div>
      </div>
      <div className="header__userName">
        <div>{user.username}</div>
        <div className="header__nav__item">
          <i onClick={handleLogOut} className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
