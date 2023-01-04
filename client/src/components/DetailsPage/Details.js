import { Button, Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import coverImg from "../../assets/details_background.png";
import { useLocation } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RateReviewIconOutlined from "@mui/icons-material/RateReviewOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./Details.css";
import axios from "axios";
import { REACT_APP_UNSPLASH_ACCESS_KEY } from "../../ignored";
const Details = () => {
  const [isHovering, setIsHovering] = useState(false);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const { state } = location;
  const thought_state_transfered = state.thought;
  const user = JSON.parse(localStorage.getItem("profile"));
  const [backgroundCover, setBackgroundCover] = useState(coverImg);

  const handleChangeCover = () => {
    alert("You can only change cover 50 times per hour, proceed?");
    axios
      .get(
        `https://api.unsplash.com/photos/random?client_id=${REACT_APP_UNSPLASH_ACCESS_KEY}`
      )
      .then((response) => {
        setBackgroundCover(response.data.urls.regular);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container
      style={{
        color: "#EFE7DA",
        height: "80%",
        width: "100%",
      }}
    >
      <Paper
        raised
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
            disabled={
              user?.result?._id === thought_state_transfered?.creator
                ? false
                : true
            }
            onClick={handleChangeCover}
            style={{
              background: "#1d1e1f",
              color: "gray",
              position: "absolute",
              top: "85%",
              left: "85%",
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
          <Typography variant="h3">{thought_state_transfered.title}</Typography>
          <br></br>
          <Typography variant="h5" style={{ color: "gray" }}>
            <AccessTimeIcon
              fontSize="medium"
              className="details-icon"
            ></AccessTimeIcon>{" "}
            Date Created: {thought_state_transfered.createdAt.substring(0, 10)}
          </Typography>
          <br></br>
          <Typography variant="h4">
            <Typography
              variant="h5"
              style={{ color: "gray", display: "inline" }}
            >
              <RateReviewIconOutlined className="details-icon"></RateReviewIconOutlined>{" "}
              Message:
            </Typography>{" "}
            {thought_state_transfered.message}
          </Typography>{" "}
          <br></br>
          <Typography variant="h4">
            <Typography
              variant="h5"
              style={{ color: "gray", display: "inline" }}
            >
              <PersonOutlinedIcon className="details-icon"></PersonOutlinedIcon>{" "}
              Author:
            </Typography>{" "}
            {thought_state_transfered.name}
          </Typography>
          <br></br>
          <Typography variant="h4">
            <Typography
              variant="h5"
              style={{ color: "gray", display: "inline" }}
            >
              <FavoriteBorderOutlinedIcon className="details-icon"></FavoriteBorderOutlinedIcon>{" "}
              Like Count:
            </Typography>{" "}
            {thought_state_transfered.likes.length}{" "}
            {thought_state_transfered.likes.length === 0 ||
            thought_state_transfered.likes.length > 1
              ? "likes"
              : "like"}
          </Typography>
        </div>
      </Paper>
    </Container>
  );
};

export default Details;
