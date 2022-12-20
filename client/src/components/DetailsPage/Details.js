import {  Container, Paper, Typography } from "@mui/material";
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
  // }
  return (
    <Container>
      <Paper>
        <Typography variant="h3">{thought_state_transfered.title}</Typography>
        <Typography variant="h6">{thought_state_transfered.message}</Typography>
        <Typography variant="h5">
          created by: {thought_state_transfered.name}
        </Typography>
        <Typography variant="h7">
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
