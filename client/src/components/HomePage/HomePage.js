import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow, Paper } from "@mui/material";
import PaginationBar from "../PaginationBar/PaginationBar";


const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
    console.log("get thoughts is called");
    console.log(currentId)
  }, [dispatch, currentId]);
  //re-render everytime state changes
 

  // const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <Grow in>
      <Container style={{ padding: "50px" }}>
        <Grid alignItems="stretch" item xs={12} sm={6} md={9}>
          <Thoughts setCurrentId={setCurrentId}></Thoughts>
        </Grid>
        <br></br>
        <Grid item xs={12} sm={6} md={9}>
          <br></br>
          <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
          <Paper>
            <PaginationBar></PaginationBar>
          </Paper>
        </Grid>
        <br />
      </Container>
    </Grow>
  );
};

export default HomePage;
