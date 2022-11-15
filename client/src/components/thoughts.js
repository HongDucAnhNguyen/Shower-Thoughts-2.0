import React from "react";

import { useSelector } from "react-redux";
import Thought from "./thought";
import { Grid, CircularProgress } from "@mui/material";

const Thoughts = ({ setCurrentId }) => {
  const thoughts = useSelector((state) => state.thoughts);
  //useSelector selects the state of the reducer
  //because we used combine reducers we have to follow the naming within index.js

  //if server error or network problems occur, show loading progress
  return !thoughts.length ? (
    <CircularProgress></CircularProgress>
  ) : (
    <Grid
      container
      spacing={3}
      style={{
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        margin:"auto"
      }}
    >
      {thoughts.map((thought) => (
        <Grid key={thought._id} item xs={12} sm={6} >
          <Thought thought={thought} setCurrentId={setCurrentId}></Thought>
        </Grid>
      ))}
    </Grid>
  );
};

export default Thoughts;
