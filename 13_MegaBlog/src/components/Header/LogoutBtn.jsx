import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  // COMMON QUESTION?
  // WHY WE ARE USING AUTHSLICE INSTEAD OF DIRECTLY AVAILING SERVICES FROM AUTH.JS
  // as UI components only deal with state and actions, not with the underlying service logic.
  async function logoutHandler() {
    return await authService.logOut().then(() => dispatch(logout()));
  }

  return (
    <button
      onClick={logoutHandler}
      className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
    >
      LOGOUT
    </button>
  );
}

export default LogoutBtn;
