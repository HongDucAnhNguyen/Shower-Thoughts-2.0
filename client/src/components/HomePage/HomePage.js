import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow, Paper } from "@mui/material";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
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
        
        <Grid alignItems="stretch" item xs={12} sm={6} md={9} >
          <Thoughts setCurrentId={setCurrentId}></Thoughts>
        </Grid>
       <br></br>
        <Grid item xs={12} sm={6} md={9}>
          <SearchForm></SearchForm>
          <br></br>
          <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
          <Paper>
            <Pagination
              count={10}
              variant="outlined"
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  component={Link}
                  to={`/thoughts?page=${1}`}
                />
              )}
            />
          </Paper>
        </Grid>
        <br />
      </Container>
    </Grow>
  );
};

export default HomePage;
