import React, { useState } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { fetchRedditThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Grow,
  Paper,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";

import PaginationBar from "../PaginationBar/PaginationBar";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}; //hook for fetching query attributes
const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);
  const { message, url, isRedditLoading } = useSelector(
    (state) => state.reddits
  );
  console.log(url);

  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get("page") || 1; //get page or defaults to 1
  console.log(page);
  // useEffect(() => {
  //   dispatch(getThoughts(page));
  //   console.log("get thoughts is called");
  //   console.log(currentId);
  // }, [dispatch, currentId]);
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
            <Container
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "40px",
                gap: "10px",
                height: "100%",
                backgroundColor: "transparent",
                border: "1px solid gray",
                color: "white",
              }}
            >
              <Typography variant="h6">Reddit Post</Typography>
              <Container
                style={{
                  height: "200px",
                  overflow: "auto",
                  border: "1px solid white",
                }}
              >
                {isRedditLoading ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  <Typography variant="h6">{message}</Typography>
                )}
              </Container>

              <Button
                variant="contained"
                onClick={() => {
                  dispatch(fetchRedditThoughts());
                }}
              >
                generate random
              </Button>
              {url !== undefined && !isRedditLoading && (
                <a href={url} target="blank" alt="reddit">
                  See on Reddit
                </a>
              )}
            </Container>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            {" "}
            <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            {!query.get("search") && (
              <Paper>
                <PaginationBar page={page}></PaginationBar>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default HomePage;
