import React from "react";
import Doom from "../../assets/DOOM_404_PAGE.gif";
// import Tyler from "../../assets/TYLER.gif";
// import Bball_Cole from "../../assets/BBALL_COLE_404_PAGE.gif";
// import Podcast from "../../assets/PODCAST.gif";
import Typewriter from "typewriter-effect";
import { Container, Typography } from "@mui/material";
const ErrorPage = () => {
  return (
    <Container>
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
      {/* <img src={Tyler} alt="Tyler" width="200px" />
      <img src={Bball_Cole} alt="Bball_Cole" width="200px" />
      <img src={Podcast} alt="Podcast" width="200px" /> */}
    </Container>
  );
};

export default ErrorPage;
