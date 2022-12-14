// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import "./Navigation.css";
import SignupFormModal from "../SignupFormPage";


function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = 
    // <div className='profile-btn-div'>
      <ProfileButton user={sessionUser}  />
    // </div>
  } else {
    sessionLinks = (
      <div className='login-modals'>
        <SignupFormModal />
        <LoginFormModal />
      </div>
    );
  }

  return (
    <ul className="nav-bar">
      {/* <ul> */}
      <NavLink exact to="/" className="home-logo">
        <img
          src="https://i.imgur.com/XKLweDp.png"
          alt="home-logo"
          className="logo-btn"
        />
      </NavLink>
      {sessionUser &&
      <NavLink to={"/spots/new"} className='add-spot-link'>
        Become a Host! 
      </NavLink>
        }
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;
