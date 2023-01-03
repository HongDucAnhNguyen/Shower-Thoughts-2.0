import { Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";

import { useLocation } from "react-router-dom";
const Details = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const { state } = location;
  const thought_state_transfered = state.thought;
  console.log(state);

  // if (!user?.result?.name) {
  //   return (
  //     <div>
  //       <h1>Please sign in to create thoughts and interact with other's</h1>
  //     </div>
  //   );
  // const height = window.innerHeight;
  // const width = window.innerWidth;



  //=========notes for details page: add img section, users can upload own img? generate fetched img <space themed> ===================== overlay
  return (
    <Container
      style={{
        color: "#EFE7DA",
        height: "80%",
        width: "100%",
      }}
    >
      <Paper
        raised
        elevation={6}
        style={{
          background: "#0D1321",
          color: "#EFE7DA",
          height: "100%",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            style={{  textAlign: "left" }}
          >
            <Typography variant="h3">
            <Typography
                variant="h4"
                style={{ color: "gray", display: "inline" }}
              >
               {"<Title>"}
              </Typography>{" "}
              {thought_state_transfered.title}
              <Typography
                variant="h4"
                style={{ color: "gray", display: "inline" }}
              >
               {" </Title>"}
              </Typography>
            </Typography>
            <Typography variant="h5" style={{ color: "gray" }}>
              Date Created:{" "}
              {thought_state_transfered.createdAt.substring(0, 10)}
            </Typography>
            <Typography variant="h4">
              <Typography
                variant="h5"
                style={{ color: "gray", display: "inline" }}
              >
                Message:
              </Typography >{" "}
              {thought_state_transfered.message}
            </Typography>{" "}
            <Typography variant="h4">
            <Typography
                variant="h5"
                style={{ color: "gray", display: "inline" }}
              >
                Author:
              </Typography>{" "}
              {thought_state_transfered.name}
            </Typography>
            <Typography variant="h4">
            <Typography
                variant="h5"
                style={{ color: "gray", display: "inline" }}
              >
                Like Count:
              </Typography>{" "}
              {thought_state_transfered.likes.length}{" "}
              {thought_state_transfered.likes.length === 0 ||
              thought_state_transfered.likes.length > 1
                ? "likes"
                : "like"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Details;
