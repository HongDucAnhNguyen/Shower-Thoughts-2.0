import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import coverImg from "../../assets/details_background.png";
import { useLocation } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RateReviewIconOutlined from "@mui/icons-material/RateReviewOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./Details.css";
const Details = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const { state } = location;
  const thought_state_transfered = state.thought;
  console.log(state);

  // if (!user?.result?.name) {
  //   return (
  //     <div>
  //       <h1>Please sign in to create thoughts and interact with other's</h1>
  //     </div>
  //   );
  // const height = window.innerHeight;
  // const width = window.innerWidth;

  //=========notes for details page: add img section, users can upload own img? generate fetched img <space themed> ===================== overlay
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
          style={{
            maxHeight: "30%",
            overflow: "hidden",
            borderRadius: "3px",
          }}
        >
          <img
            title="credit goes to NASA"
            width="100%"
            height="100%"
            src={coverImg}
            alt="Nasa's cover img"
          ></img>
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
