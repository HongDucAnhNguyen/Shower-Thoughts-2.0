import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow } from "@mui/material";
const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  //re-render everytime state changes
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch, currentId]);
  // const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Grow in>
      <Container>
        <h1>Shower Thoughts 2.0</h1>
        <br />
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Thoughts setCurrentId={setCurrentId}></Thoughts>
        </Grid>
        <br />
        <Grid item xs={12} sm={5}>
          <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
        </Grid>
        <br />
      </Container>
    </Grow>
  );
};

export default HomePage;
