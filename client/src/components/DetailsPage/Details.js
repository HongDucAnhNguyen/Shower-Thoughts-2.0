import {
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import coverImg from "../../assets/details_background.png";
import { useLocation, useParams } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RateReviewIconOutlined from "@mui/icons-material/RateReviewOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./Details.css";
import axios from "axios";
import { REACT_APP_UNSPLASH_ACCESS_KEY } from "../../ignored";
import { useDispatch, useSelector } from "react-redux";
import { getThoughtById } from "../../actions/action";
const Details = () => {
  const { thoughtDetails, isLoading } = useSelector((state) => state.thoughts);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getThoughtById(id));
  }, [id]);
  const [isHovering, setIsHovering] = useState(false);
  // const user = JSON.parse(localStorage.getItem("profile"));

  const user = JSON.parse(localStorage.getItem("profile"));
  const [backgroundCover, setBackgroundCover] = useState(
    localStorage.getItem("currentBackground")
      ? JSON.parse(localStorage.getItem("currentBackground"))
      : coverImg
  );

  // const handleChangeCover = () => {
  //   axios
  //     .get(
  //       `https://api.unsplash.com/photos/random?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}`
  //     )
  //     .then((response) => {
  //       setBackgroundCover(response.data.urls.regular);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert(
  //         "You have attempted to change cover image too many times, limit is 50 per hour, please wait for cool down"
  //       );
  //     });
  // };
  if (isLoading) {
    return <CircularProgress></CircularProgress>;
  }
  return (
    <Container
      style={{
        color: "#EFE7DA",
        height: "80%",
        width: "100%",
      }}
    >
      <Paper
        elevation={6}
        style={{
          background: "#0D1321",
          color: "#EFE7DA",
          height: "100%",
          width: "100%",
          border: "3px solid black",
        }}
      >
        <div
          onMouseOver={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          style={{
            maxHeight: "30%",
            overflow: "hidden",
            borderRadius: "3px",
            background: "gray",
            position: "relative",
          }}
        >
          <img
            style={{ objectFit: "cover" }}
            title="Unsplash random img"
            width="100%"
            height="100%"
            src={backgroundCover}
            alt="cover img"
          ></img>
          <Button
            className="changeCover-btn"
            disabled={
              user?.result?._id === thoughtDetails?.creator ? false : true
            }
            onClick={() => {}}
            style={{
              background: "#1d1e1f",
              color: "gray",
              position: "absolute",
              top: "220px",
              right: "30px",
              bottom: "10px",
              transition: "0.5s",
              opacity: isHovering ? "1" : "0",
            }}
          >
            Change Cover
          </Button>
        </div>
        <br></br>
        <div
          className="details_text_div"
          style={{
            marginTop: "50px",
            marginLeft: "50px",
            textAlign: "left",
          }}
        >
          <Typography variant="h3">{thoughtDetails.title}</Typography>
          <br></br>
          <Typography variant="h5" style={{ color: "gray" }}>
            <AccessTimeIcon
              fontSize="medium"
              className="details-icon"
            ></AccessTimeIcon>{" "}
            Date Created: {thoughtDetails.createdAt.slice(0, 10)}
          </Typography>
          <br></br>
          <Typography variant="h5" style={{ color: "gray" }}>
            <RateReviewIconOutlined className="details-icon"></RateReviewIconOutlined>{" "}
            Message: {thoughtDetails.message}
          </Typography>{" "}
          <br></br>
          <Typography variant="h5" style={{ color: "gray" }}>
            <PersonOutlinedIcon className="details-icon"></PersonOutlinedIcon>{" "}
            Author: {thoughtDetails.name}
          </Typography>{" "}
          <br></br>
          <Typography variant="h5" style={{ color: "gray" }}>
            <FavoriteBorderOutlinedIcon className="details-icon"></FavoriteBorderOutlinedIcon>{" "}
            Like Count: {thoughtDetails.likes.length}{" "}
            {thoughtDetails.likes.length === 0 ||
            thoughtDetails.likes.length > 1
              ? "likes"
              : "like"}
          </Typography>{" "}
        </div>
      </Paper>
    </Container>
  );
};

export default Details;
