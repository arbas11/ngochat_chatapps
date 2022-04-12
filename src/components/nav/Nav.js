import React from "react";
import "./nav.scss";
import logo from "./../../images/dibimbing.png";

function Nav({ setContactSelected }) {
  return (
    <div className="nav">
      <div onClick={() => setContactSelected(false)} className="nav__blocks">
        <img src={logo} alt="logo dibimbing"></img>
      </div>
      <div className="nav__blocks"></div>
      <div className="nav__blocks"></div>
    </div>
  );
}

export default Nav;
