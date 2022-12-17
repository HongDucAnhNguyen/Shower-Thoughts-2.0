import React from "react";

import { useSelector } from "react-redux";
import Thought from "./thought";
import { Grid, CircularProgress } from "@mui/material";

const Thoughts = ({ setCurrentId }) => {
  const { currentThoughts } = useSelector((state) => state.thoughts);
  console.log(useSelector((state) => state.thoughts.currentThoughts));

  //useSelector selects the state of the reducer
  //because we used combine reducers we have to follow the naming within index.js

  //if server error or network problems occur, show loading progress
  return !currentThoughts?.length ? (
    <div>
      <CircularProgress></CircularProgress> SUCH EMPTY
    </div>
  ) : (
    <Grid container spacing={3}>
      {currentThoughts.map((thought) => (
        /*
        for extra small devices, one thought takes up 12 grid columns
        for small devices, one thought takes up 12 grid columns
        for medium devices, one thought takes up 6 grid columns
        for large devices, one thought takes up 6 grid columns
        */
        <Grid key={thought._id} item xs={12} sm={12} md={6} lg={6}>
          <Thought thought={thought} setCurrentId={setCurrentId}></Thought>
        </Grid>
      ))}
    </Grid>
  );
};

export default Thoughts;
