import { Container, Paper, Typography } from "@mui/material";
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
  const height = window.innerHeight;
  const width = window.innerWidth;
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#EFE7DA",
        height: "80%",
        width: "100%",
      }}
    >
      <Paper
        raised
        elevation={6}
        style={{
          background: "transparent",
          color: "#EFE7DA",
          height: "100%",
          width: "100%",
        }}
      >
        <Typography variant="h3" style={{ marginTop: height / 7 }}>
          {thought_state_transfered.title}
        </Typography>
        <Typography variant="h5" style={{ color: "gray", textAlign:"left", marginLeft: "75px" }}>
          Date Created: {thought_state_transfered.createdAt.substring(0, 10)}
        </Typography>
        <Typography variant="h4">{thought_state_transfered.message}</Typography>
        <Typography variant="h5">
          created by: {thought_state_transfered.name}
        </Typography>
        <Typography variant="h5">
          {thought_state_transfered.likes.length}{" "}
          {thought_state_transfered.likes.length === 0 ||
          thought_state_transfered.likes.length > 1
            ? "likes"
            : "like"}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Details;
