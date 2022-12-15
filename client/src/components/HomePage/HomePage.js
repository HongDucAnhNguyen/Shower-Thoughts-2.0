import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts, fetchRedditThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import { Container, Grid, Grow, Paper, Button } from "@mui/material";
import PaginationBar from "../PaginationBar/PaginationBar";
import { useSelector } from "react-redux";
const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);
  const reddits = useSelector((state) => state.reddits);
  console.log(reddits.url);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
    console.log("get thoughts is called");
    console.log(currentId);
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
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            {" "}
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            <Paper>
              <PaginationBar></PaginationBar>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(fetchRedditThoughts());
              }}
            >
              generate
            </Button>

            <div>
              <h2>Reddit post</h2>
              <h3>{reddits.title}</h3>
              <h4>{reddits.message}</h4>
              {reddits.url !== undefined && (
                <a href={reddits.url} target="blank" alt="reddit">
                  See on Reddit
                </a>
              )}
            </div>
          </Grid>
        </Grid>

        <br />
      </Container>
    </Grow>
  );
};

export default HomePage;
