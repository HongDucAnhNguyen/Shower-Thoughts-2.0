import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteThoughts, heartThoughts } from "../actions/action";
import { Card, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
dayjs.extend(relativeTime);
const Thought = ({ thought, setCurrentId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteThoughts(thought._id));
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
            : `${thought.likes.length} like${
                thought.likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <FavoriteBorderIcon></FavoriteBorderIcon>
        </>
      );
    }
    return (
      <>
        <FavoriteBorderIcon></FavoriteBorderIcon>
      </>
    );
  };

  return (
    <Card
      onClick={() => {
        navigate("/details");
      }}
      onMouseOver={handleOnMouseOver}
      onMouseOut={handleOnMouseOut}
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        color: "white",
        backgroundColor: "black",
        transition: "0.3s",
        transform: isHovering ? "translateY(5px)" : "",
        border: isHovering ? "1px solid yellow" : "1px solid white",
      }}
    >
      <div>
        <Typography variant="body2">
          {dayjs(thought.createdAt).fromNow()}
        </Typography>
        {user?.result?._id === thought?.creator && (
          <>
            <Button
              size="small"
              onClick={handleDelete}
              style={{
                color: "red",
                float: "right",
              }}
            >
              <DeleteIcon fontSize="small"></DeleteIcon>
            </Button>
          </>
        )}

        <Button
          disabled={user?.result?._id === thought?.creator ? false : true}
          style={{
            color: "white",
            float: "right",
          }}
          size="small"
          onClick={() => {
            setCurrentId(thought._id);
            console.log(thought._id);
          }}
        >
          <MoreHorizIcon fontSize="default"></MoreHorizIcon>
        </Button>
        <Button
          style={{
            color: "white",
            float: "left",
          }}
          size="small"
          onClick={handleHeartPost}
          disabled={user?.result ? false : true}
        >
          <Hearts></Hearts>
        </Button>
      </div>

      <div style={{ margin: "15px" }}>
        <Typography variant="h7">created by {thought.name}</Typography>
        <Typography variant="h6">{thought.title}</Typography>
        <Typography variant="h5">{thought.message}</Typography>
      </div>
    </Card>
  );
};

export default Thought;
