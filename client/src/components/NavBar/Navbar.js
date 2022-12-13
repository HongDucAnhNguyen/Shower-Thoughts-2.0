import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Button, Typography, Grid, Grow } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchForm from "../SearchForm/SearchForm";
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
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    console.log(location);
  }, [location]);

  if (location.pathname === "/") {
    return;
  }
  return (
    // <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "space-between",
    //     alignItems: "center",
    //     padding: "20px 40px 0 40px",
    //   }}
    // >
    <Grow in>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        direction="row"
        padding="20px"
      >
        <Grid item md={2.2} lg={2}>
          <Typography
            style={{ cursor: "pointer" }}
            variant="h6"
            onClick={() => navigate("/")}
          >
            Shower Thoughts 2.0
          </Typography>
        </Grid>
        <Grid item md={5.7}>
          {" "}
          {/* 
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "30px",
      }}
    > */}
          {location.pathname !== "/auth" && (
            <>
              <SearchForm></SearchForm>
            </>
          )}
        </Grid>
        <Grid item md={1}>
          {user?.result && location.pathname !== "/auth" && (
            <Button color="primary" onClick={() => navigate("/about")}>
              <Typography variant="h7">ABOUT</Typography>
            </Button>
          )}
        </Grid>
        <Grid item md={1} lg={1.3}>
          <Button
            onClick={() => {
              if (user) {
                navigate("/home");
              } else {
                navigate("/auth");
              }
            }}
          >
            <Typography variant="h7">
              {user?.result ? user.result.name : "GUEST"}
            </Typography>

            <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
          </Button>
        </Grid>
        <Grid item md={1} lg={1.3}>
          {" "}
          {user?.result && location.pathname !== "/" && (
            <Button variant="outlined" color="primary" onClick={logout}>
              <Typography variant="h7">Log out</Typography>
              <LogoutIcon></LogoutIcon>
            </Button>
          )}
        </Grid>

        {/* {!user?.result && location.pathname === "/home" && (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            navigate("/auth");
          }}
        >
          Log In
        </Button>
      )} */}
        {/* </div>
  </div> */}
      </Grid>
    </Grow>
  );
};

export default Navbar;
