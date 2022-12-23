import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button, Typography } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import PopUpMenu from "../PopUpMenu/PopUpMenu";
import "./Navbar.css";
import SearchFormNav from "./SearchFormNav";
import HomeNav from "./HomeNav";
import AboutNav from "./AboutNav";
import AccountNav from "./AccountNav";
import LogoutNav from "./LogoutNav";
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
        style={{ cursor: "pointer", display: "flex", gap: "10px" }}
        onClick={() => navigate("/")}
      >
        <LightbulbCircleIcon style={{ color: "#FFF59E" }}></LightbulbCircleIcon>
        <Typography variant="h5" fontWeight="bold">
          {" "}
          Shower Thoughts{" "}
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

/**Todos:
 * make responsive navbar menu
 * add toggle navigation menu for mobile (vertical menu)
 *
 */
