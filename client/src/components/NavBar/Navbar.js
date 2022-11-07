import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Button } from "@mui/material";
const Navbar = () => {
  //get userProfile object from local Storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = user?.token;
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
  };
  useEffect(() => {
    //get token, decode content of token if exists
    //everytime url changes, check if token expired
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        alert("token expired, logging out");
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <div>
      <br />
      {user && (
        <>
          <Button variant="contained" color="primary" onClick={logout}>
            Log out
          </Button>
        </>
      )}
    </div>
  );
};

export default Navbar;
