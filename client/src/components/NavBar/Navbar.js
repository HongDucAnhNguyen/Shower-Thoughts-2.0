import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Button, Typography } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
const Navbar = () => {
  //get userProfile object from local Storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = user?.token;
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/auth");
  };
  useEffect(() => {
    //get token, decode content of token if exists
    //everytime url changes, check if token expired
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        alert("token expired, redirect to login page");
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    console.log(location);
  }, [location]);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 40px 0 40px",
      }}
    >
      <Typography
        style={{ cursor: "pointer" }}
        variant="h5"
        onClick={() => navigate("/")}
      >
        Shower Thoughts 2.0
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <Button
          onClick={() => {
            if (user?.result) {
              navigate("/home");
            } else {
              navigate("/auth");
            }
          }}
        >
          {user?.result ? (
            <Typography variant="h7">
              {" "}
              {user.result.name} <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
            </Typography>
          ) : (
            <Typography variant="h7">
              {" "}
              Login <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
            </Typography>
          )}
        </Button>

        {user?.result && location.pathname === "/home" && (
          <>
            <Button variant="outlined" color="primary" onClick={logout}>
              Log out
            </Button>
          </>
        )}
        {!user?.result && location.pathname === "/home" && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              navigate("/auth");
            }}
          >
            Log In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
