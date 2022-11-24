import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow, Typography } from "@mui/material";
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
      <Container style={{padding: "40px"}}>
        
        <br />
        <Grid alignItems="stretch">
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
