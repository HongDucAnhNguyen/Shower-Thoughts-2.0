import { Container, Typography } from "@mui/material";
import React from "react";

const AboutPage = () => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h4"> Hi 👋, I'm Jay Nguyen</Typography>
      <Typography variant="h5">
        {" "}
        Front End Developer, based in Canada.
      </Typography>
      <Typography variant="h7">
        Glad to see you here! Whether you are new or have known about this
        project before. Welcome to Shower Thoughts! the new version (you can see
        the old one{" "}
        <a
          target="blank"
          style={{ cursor: "pointer", color: "orange" }}
          href="https://github.com/HongDucAnhNguyen/ShowerThoughts"
          alt="Shower Thoughts 1.0"
        >
          here
        </a>{" "}
        ). A place where you can share your Ingenious Contemplations that
        suddenly occured during a Shower on a sunny Friday morning, be honest,
        we've all been there.
      </Typography>
      <Typography variant="h6">
        That's enough talking. Enjoy your stay, and remember, EUREKA!
      </Typography>
    </Container>
  );
};

export default AboutPage;
