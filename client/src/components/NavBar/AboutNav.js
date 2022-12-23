import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
const AboutNav = ({user}) => {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <>
      <li>
        {user?.result && location.pathname !== "/auth" && (
          <Button color="primary" onClick={() => navigate("/about")}>
            <Typography variant="h7" fontWeight="bold">
              about
            </Typography>
          </Button>
        )}
      </li>
    </>
  );
};

export default AboutNav;
