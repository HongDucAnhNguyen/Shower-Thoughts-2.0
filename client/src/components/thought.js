import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteThoughts } from "../actions/action";
import { Card, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
const Thought = ({ thought, setCurrentId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isHearted, setIsHearted] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteThoughts(thought._id));
  };
  const handleOnMouseOver = () => {
    setIsHovering(true);
  };
  const handleOnMouseOut = () => {
    setIsHovering(false);
  };
  const handleHeartPost = () => {
    setIsHearted((prevState) => !prevState);
  };
  const user = JSON.parse(localStorage.getItem("profile"));
  //users cannot alter other's thoughts

  return (
    <Card
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
        >
          {isHearted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
