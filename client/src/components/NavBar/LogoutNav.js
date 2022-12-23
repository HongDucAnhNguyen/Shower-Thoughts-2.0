import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import decode from "jwt-decode";
const LogoutNav = ({ user, setUser }) => {
  const token = user?.token;
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    //get token, decode content of token if exists
    //everytime url changes, check if token expired
    if (token) {
      //check for first alert

      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
        alert("Token expired, automatically logged out");
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));

    console.log(location);
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");
  };
  return (
    <>
      {" "}
      <li>
        {user?.result && location.pathname !== "/" && (
          <Button variant="outlined" color="primary" onClick={logout}>
            <Typography variant="h7" fontWeight="bold">
              Log out
            </Typography>
            <LogoutIcon></LogoutIcon>
          </Button>
        )}
      </li>
    </>
  );
};

export default LogoutNav;
