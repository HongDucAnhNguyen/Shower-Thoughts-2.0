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
import "./HomePage.css";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}; //hook for fetching query attributes
const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);
  const { message, url, isRedditLoading } = useSelector(
    (state) => state.reddits
  );

  console.log(url);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const query = useQuery();
  const search = query.get("search");
  const page = query.get("page") || 1; //get page or defaults to 1
  console.log(page);


  return (
    <Grow in>
      <Container
        className="container_thoughts_homepage"
        style={{ padding: "50px" }}
      >
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
                padding: "30px",
                gap: "10px",
                height: "100%",
                backgroundColor: "transparent",
                border: "1px solid gray",
                color: "white",
                borderRadius: "5px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  dispatch(fetchRedditThoughts());
                }}
              >
                generate random
              </Button>

              <Container
                className="reddit-container"
                style={{
                  height: "180px",
                  overflow: "auto",
                  border: "1px solid white",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isRedditLoading ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  <Typography variant="h6">{message}</Typography>
                )}
              </Container>
              {url !== undefined && !isRedditLoading && (
                <a
                  href={url}
                  target="blank"
                  alt="reddit"
                  style={{ color: "orange" }}
                >
                  See on Reddit
                </a>
              )}
            </Container>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            {" "}
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              style={search ? { height: "100%" } : {}}
            ></Form>
            {!search && user && (
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
