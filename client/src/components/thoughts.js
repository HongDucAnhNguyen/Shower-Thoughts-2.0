import React from "react";

import { useSelector } from "react-redux";
import Thought from "./thought";
import { Grid, CircularProgress, Typography } from "@mui/material";
import TypeWriter from "typewriter-effect";

const Thoughts = ({ setCurrentId }) => {
  const { currentThoughts, isLoading } = useSelector((state) => state.thoughts);
  // console.log(useSelector((state) => state.thoughts.currentThoughts));

  //useSelector selects the state of the reducer
  //access state => choose target reducer (thoughts? reddits? auth? )

  if ((!currentThoughts?.length && !isLoading) || !currentThoughts?.length)
    return (
      <Typography variant="h5">
        <TypeWriter
          options={{
            strings: ["Hmm...Dead Town..."],
            autoStart: true,
            loop: true,
            delay: "natural",
            deleteSpeed: "natural",
          }}
        ></TypeWriter>
      </Typography>
    );

  //if server error or network problems occur, show loading progress
  return isLoading ? (
    <CircularProgress></CircularProgress>
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
