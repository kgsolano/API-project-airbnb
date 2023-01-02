// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const {spotId} = useParams()
  const history = useHistory()
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  }; 

  return (
    <>
      <div onClick={openMenu} className="profile-btn">
        <i className="fas fa-user-circle profile-icons" />
        <i className="fas fa-bars profile-icons" />
      {showMenu && (
        <ul className="profile-dropdown">
          <p>Welcome {user.username}</p>
          <p>{user.email}</p>
          <div className="manage-user-div">
            <Link to="/current" className="manage-user-link">
              Manage user
            </Link>
          </div>
          <div className="manage-user-div">
            <button onClick={logout} className="log-out-button">
              Log Out
            </button>
          </div>
          {/* <Link to={`/spots/${spotId}/edit`}>Manage your Spots</Link> */}
        </ul>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
