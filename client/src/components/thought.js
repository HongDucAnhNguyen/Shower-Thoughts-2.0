import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteThoughts, heartThoughts } from "../actions/action";
import { Card, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
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
      <div
        style={{
          border: "2px solid white",
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
          <Typography variant="h6">{thought.name}</Typography>
          <Typography
            variant="h7"
            style={{
              color: "grey",
              padding: "0",
              textAlign: "left",
            }}
          >
            {dayjs(thought.createdAt).fromNow()}
          </Typography>
        </div>

        <Button
          disabled={user?.result?._id === thought?.creator ? false : true}
          style={{
            color: "white",
            padding: "0",
            textAlign: "right",
          }}
          size="small"
          onClick={() => {
            setCurrentId(thought._id);
            console.log(thought._id);
          }}
        >
          <MoreHoriz fontSize="default"></MoreHoriz>
        </Button>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
        {user?.result?._id === thought?.creator && (
          <>
            <Button
              size="small"
              onClick={handleDelete}
              style={{
                color: "red",
                padding: "0",
                textAlign: "right",
              }}
            >
              <DeleteIcon fontSize="small"></DeleteIcon>
            </Button>
          </>
        )}
      </div>

      <div style={{ margin: "15px" }}>
        <Typography variant="h6">{thought.title}</Typography>
        <Button
          size="small"
          variant=""
          style={{
            color: "green",
          }}
          onClick={() => {
            navigate("/details", {
              state: {
                thought: thought,
              },
            });
          }}
        >
          <InfoIcon fontSize="small"></InfoIcon>
          Show more
        </Button>
      </div>
    </Card>
  );
};

export default Thought;
