import React from "react";
import { Typography, Button } from "@mui/material";

import { useNavigate } from "react-router-dom";
const HomeNav = ({ user }) => {
  const navigate = useNavigate();

  return (
    <>
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
              home
            </Typography>
          
          </Button>
        </li>
      ) : (
        <></>
      )}
    </>
  );
};

export default HomeNav;
