import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import ShowerIcon from '@mui/icons-material/Shower';

import PopUpMenu from "../PopUpMenu/PopUpMenu";
import "./Navbar.css";
import SearchFormNav from "./SearchFormNav";
import HomeNav from "./HomeNav";
import AboutNav from "./AboutNav";
import AccountNav from "./AccountNav";
import LogoutNav from "./LogoutNav";
//replace current navbar with appbar?
const Navbar = () => {
  //get userProfile object from local Storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    return;
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px 0 40px",
        overflow: "auto",
      }}
    >
      <div
        className="app-name"
        style={{ cursor: "pointer", display: "flex", gap: "10px" }}
        onClick={() => navigate("/")}
      >
        <ShowerIcon style={{ color: "#FFF59E" }} className="shower-icon"></ShowerIcon>
        <Typography variant="h6" fontWeight="bold">
          Shower Thoughts
        </Typography>
      </div>

      <div className="nav-inner">
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <SearchFormNav></SearchFormNav>
          <HomeNav user={user}></HomeNav>
          <AboutNav user={user}></AboutNav>
          <AccountNav user={user}></AccountNav>
          <LogoutNav user={user} setUser={setUser}></LogoutNav>
        </ul>
      </div>

      <div className="menu-icon">
        {user?.result ? (
          <PopUpMenu
            
            SearchForm={<SearchFormNav></SearchFormNav>}
            home={<HomeNav user={user}></HomeNav>}
            about={<AboutNav user={user}></AboutNav>}
            account={<AccountNav user={user}></AccountNav>}
            logout={<LogoutNav user={user} setUser={setUser}></LogoutNav>}
          ></PopUpMenu>
        ) : (
          <Button onClick={() => navigate("/auth")}>
            <Typography>GUEST</Typography>{" "}
            <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;


