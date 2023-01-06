import React from "react";
import Doom from "../../assets/DOOM_404_PAGE.gif";

import Typewriter from "typewriter-effect";
import { Container, Typography } from "@mui/material";
const ErrorPage = () => {
  const height =   window.innerHeight
  return (
    <Container style={{ bottom: height / 2, position: "fixed" }}>
      <Typography variant="h4">
        <Typewriter
          options={{
            strings: ["404 -- No man's Land"],
            autoStart: true,
            loop: true,
          }}
        ></Typewriter>
      </Typography>

      <img
        src={Doom}
        alt="Doom"
        width="200px"
        title="gif made by Ali Graham"
        style={{ cursor: "pointer" }}
      />
      
    </Container>
  );
};

export default ErrorPage;
