import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow, Paper } from "@mui/material";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
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
      <Container style={{ padding: "50px" }}>
        <br />
        <Grid alignItems="stretch">
          <Thoughts setCurrentId={setCurrentId}></Thoughts>
        </Grid>
        <br />
        <Paper>
          <Pagination
            count={10}
            variant="outlined"
            color="secondary"
            renderItem={(item) => (
              <PaginationItem
                {...item}
                component={Link}
                to={`/thoughts?page=${1}`}
              />
            )}
          />
        </Paper>

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
