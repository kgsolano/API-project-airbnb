// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser}  />;
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul className="nav-bar">
      {/* <ul> */}
        <NavLink exact to="/" className='home-logo'>
          <img src='https://i.imgur.com/XKLweDp.png' alt='home-logo' className="logo-btn" />
        </NavLink>
        {isLoaded && sessionLinks}
      {/* </ul> */}
    </ul>
  );
}

export default Navigation;
