import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteThoughts } from "../actions/action";
import { Card, Button, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import "./thought-styles.css";
const Thought = ({ thought, setCurrentId }) => {
  const [isHovering, setIsHovering] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteThoughts(thought._id));
  };
  const handleHoverAction = () => {
    setIsHovering((prevState) => !prevState);
  };
  const user = JSON.parse(localStorage.getItem("profile"));
  //users cannot alter other's thoughts
  return (
    <Card
      onMouseEnter={handleHoverAction}
      onMouseLeave={handleHoverAction}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15px",
        height: "100%",
        position: "relative",
        color: "white",
        backgroundColor: "black",
        transition: isHovering ? "0.5s" : "",
        border: isHovering ? "1px solid yellow" : "1px solid white",
      }}
    >
      <div style={{ margin: "10px" }}>
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
            transition: "0.5s",
            "&:hover": {
              float: "left",
            },
          }}
          size="small"
          onClick={() => {
            setCurrentId(thought._id);
            console.log(thought._id);
          }}
        >
          <MoreHorizIcon fontSize="default"></MoreHorizIcon>
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
