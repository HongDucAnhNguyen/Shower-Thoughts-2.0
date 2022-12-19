import { Container, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
const Details = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const { state } = location;
  const thought = state.thought;
  // if (!user?.result?.name) {
  //   return (
  //     <div>
  //       <h1>Please sign in to create thoughts and interact with other's</h1>
  //     </div>
  //   );
  // }
  return (
    <Container>
      <Typography variant="h3">{thought.title}</Typography>
      <Typography variant="h6">{thought.message}</Typography>
      <Typography variant="h5">created by: {thought.name}</Typography>
      <Typography variant="h7">
        {thought.likes.length}{" "}
        {thought.likes.length === 0 || thought.likes.length > 1
          ? "likes"
          : "like"}
      </Typography >
    </Container>
  );
};

export default Details;
