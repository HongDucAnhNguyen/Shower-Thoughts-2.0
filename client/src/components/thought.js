import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteThoughts,
  heartThoughts,
  getThoughts,
  createThoughts,
} from "../actions/action";
import { Card, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";

import MoreIcon from "@mui/icons-material/More";
import PopUpThought from "./PopUpMenu/PopUpThought";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

dayjs.extend(relativeTime);
const Thought = ({ thought, setCurrentId }) => {
  const { currentPage } = useSelector((state) => state.thoughts);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const handleDelete = () => {
    dispatch(deleteThoughts(thought._id));
    dispatch(getThoughts(currentPage));
  };
  const handleDuplicate = () => {
    dispatch(
      createThoughts({
        title: thought.title,
        message: thought.message,
        // The optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called is undefined or null, it returns undefined instead of throwing an error.
        name: user?.result?.name,
      })
    );
    dispatch(getThoughts(currentPage));
  };
  const handleHeartPost = () => {
    dispatch(heartThoughts(thought._id));
  };
  const handleOnMouseOver = () => {
    setIsHovering(true);
  };
  const handleOnMouseOut = () => {
    setIsHovering(false);
  };
  const checkWidth = (width) => {
    let value = 0;
    if (width <= 420) {
      value = 1;
    } else if (width >= 420 && isHovering) {
      value = 1;
    } else {
      value = 0;
    }
    return value;
  };
  const handleTransferDetails = () => {
    //redirect and attach data payload to display details of post
    navigate(`/details`, {
      state: {
        thought: thought,
      },
    });
  };

  const user = JSON.parse(localStorage.getItem("profile"));
  //users cannot alter other's thoughts

  const Hearts = () => {
    //if the post is liked
    if (thought.likes.length > 0) {
      return thought.likes.find((like) => like === user?.result?._id) ? (
        <>
          <FavoriteIcon></FavoriteIcon>
          &nbsp;
          {thought.likes.length > 2
            ? `You and ${thought.likes.length - 1} others`
            : `${thought.likes.length} heart${
                thought.likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon></FavoriteBorderIcon>
          &nbsp;
          {`${thought.likes.length} heart${
            thought.likes.length > 1 ? "s" : ""
          }`}
        </>
      );
    }
    return (
      <>
        <FavoriteBorderIcon></FavoriteBorderIcon>&nbsp;heart
      </>
    );
  };

  return (
    <Card
      className="thought_card"
      raised
      elevation={6}
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
      style={{
        
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        height: "100%",
        position: "relative",
        backgroundColor: "#1b2330",
        transition: "0.3s",
        transform: isHovering ? "translateY(-5px)" : "",
        boxShadow: isHovering ? " -1px -1px 30px 12px rgb(6,5,87)" : "",
      }}
    >
      <div
        style={{
          borderRadius: "17px 0 0 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
          }}
        >
          <Typography
            variant="h6"
            style={{ color: "#64ffda" }}
          >{`@${thought.name}`}</Typography>
          <Typography
            variant="h7"
            style={{
              color: "grey",

              textAlign: "left",
            }}
          >
            {dayjs(thought.createdAt).fromNow()}
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            transition: "0.5s",
            opacity: checkWidth(width),
          }}
        >
          <Button
            disabled={user?.result?._id === thought?.creator ? false : true}
            style={{
              color: "white",
            }}
            size="default"
            onClick={() => {
              setCurrentId(thought._id);

              console.log(thought._id);
            }}
          >
            <CreateIcon fontSize="default"></CreateIcon>
          </Button>
          {user?.result && (
            <PopUpThought
              setIsHovering={setIsHovering}
              deleteBtn={
                <Button
                  disabled={
                    user?.result?._id === thought?.creator ? false : true
                  }
                  size="small"
                  onClick={handleDelete}
                  style={{
                    color:
                      user?.result?._id === thought?.creator ? "red" : "gray",
                  }}
                >
                  <DeleteIcon
                    fontSize="small"
                    style={{ marginRight: "5px" }}
                  ></DeleteIcon>
                  delete
                </Button>
              }
              duplicateBtn={
                <Button onClick={handleDuplicate}>
                  <ContentCopyIcon
                    fontSize="small"
                    style={{
                      marginRight: "5px",
                      color: user?.result ? "" : "gray",
                    }}
                  ></ContentCopyIcon>
                  duplicate
                </Button>
              }
              infoBtn={
                <Button size="small" onClick={handleTransferDetails}>
                  <MoreIcon
                    fontSize="small"
                    style={{ marginRight: "5px" }}
                  ></MoreIcon>
                  more
                </Button>
              }
            ></PopUpThought>
          )}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          color: "gray",
        }}
      >
        <Typography variant="h6">{"<title>"}</Typography>
        <Typography variant="h6" style={{ color: "#ccd6f6" }}>
          {thought.title}
        </Typography>
        <Typography variant="h6">{"</title>"}</Typography>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "13px",
        }}
      >
        <Button
          style={{
            color: "#64ffda",
            position: "relative",
          }}
          size="small"
          onClick={handleHeartPost}
          disabled={user?.result ? false : true}
        >
          <Hearts fontSize="small"></Hearts>
        </Button>
      </div>
    </Card>
  );
};

export default Thought;
