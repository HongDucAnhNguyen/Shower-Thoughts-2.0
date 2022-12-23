import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Button, Typography } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchForm from "../SearchForm/SearchForm";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import HomeIcon from "@mui/icons-material/Home";
import PopUpMenu from "../PopUpMenu/PopUpMenu";
import "./Navbar.css";
import Avatar from "@mui/material/Avatar";
const Navbar = () => {
  //get userProfile object from local Storage
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const ColorForAvatarGenerator = (username) => {
    //hex is based 16
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      //left shift <<
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    console.log(color);
    return color;
  };

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
          <li>
            {location.pathname !== "/auth" && (
              <>
                <SearchForm></SearchForm>
              </>
            )}
          </li>
          {user?.result ? (
            <li>
              <Button
                onClick={() => {
                  if (user) {
                    navigate("/home");
                  } else {
                    navigate("/auth");
                  }
                }}
              >
                <Typography variant="h7" fontWeight="bold">
                  Home
                </Typography>
                <HomeIcon></HomeIcon>
              </Button>
            </li>
          ) : (
            <></>
          )}

          <li>
            {user?.result && location.pathname !== "/auth" && (
              <Button color="primary" onClick={() => navigate("/about")}>
                <Typography variant="h7" fontWeight="bold">
                  ABOUT
                </Typography>
              </Button>
            )}
          </li>
          <li>
            <Button>
              {user?.result ? (
                <Avatar
                  sx={{
                    bgcolor: ColorForAvatarGenerator(user.result.name),
                  }}
                >
                  {user.result.name.charAt(0)}
                </Avatar>
              ) : (
                <Typography>GUEST</Typography>
              )}

              {user?.result?.name ? (
                <></>
              ) : (
                <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
              )}
            </Button>
          </li>

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
        </ul>
      </div>

      <div className="menu-icon">
        {user?.result ? (
          <PopUpMenu
            SearchForm={
              <li>
                {location.pathname !== "/auth" && (
                  <>
                    <SearchForm></SearchForm>
                  </>
                )}
              </li>
            }
            home={
              <li>
                <Button
                  onClick={() => {
                    if (user) {
                      navigate("/home");
                    } else {
                      navigate("/auth");
                    }
                  }}
                >
                  <Typography variant="h7" fontWeight="bold">
                    Home
                  </Typography>
                  <HomeIcon></HomeIcon>
                </Button>
              </li>
            }
            about={
              <li>
                {user?.result && location.pathname !== "/auth" && (
                  <Button color="primary" onClick={() => navigate("/about")}>
                    <Typography variant="h7" fontWeight="bold">
                      ABOUT
                    </Typography>
                  </Button>
                )}
              </li>
            }
            account={
              <li>
                <Button
                  onClick={() => {
                    if (user) {
                      navigate("/home");
                    } else {
                      navigate("/auth");
                    }
                  }}
                >
                  {user?.result ? (
                    <Avatar
                      sx={{
                        bgcolor: ColorForAvatarGenerator(user.result.name),
                      }}
                    >
                      {user.result.name.charAt(0)}
                    </Avatar>
                  ) : (
                    <Typography>GUEST</Typography>
                  )}

                  {user?.result?.name ? (
                    <></>
                  ) : (
                    <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
                  )}
                </Button>
              </li>
            }
            logout={
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
            }
          ></PopUpMenu>
        ) : (
          <Button>
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
