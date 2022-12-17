import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createThoughts,
  updateThoughts,
  getThoughts,
} from "../../actions/action";
import { TextField, Button, Typography, Paper } from "@mui/material";

const Form = ({ currentId, setCurrentId }) => {
  //if there is a currentid, populate form fields with corresponding thought, otherwise this variable holds null
  const thought = useSelector((state) =>
    currentId
      ? state.thoughts.currentThoughts.find((thought) => thought._id === currentId)
      : null
  );
  const { currentPage } = useSelector((state) => state.thoughts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    message: "",
  });

  //everytime a new currentId is set, meaning user clicks on edit icon to edit a chosen thought, state changes, thought code reruns and thought will consequently change too, making form content population change as according to thought
  useEffect(() => {
    //if thought with the currentId exists
    if (thought) {
      //fill in the contents to be updated
      setFormData(thought);
    }
  }, [thought]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId === null) {
      dispatch(createThoughts({ ...formData, name: user?.result?.name }));
      dispatch(getThoughts(currentPage));
    } else {
      dispatch(
        /**update */ updateThoughts(currentId, {
          ...formData,
          name: user?.result?.name,
        })
      );
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setFormData({
      title: "",
      name: "",
      message: "",
    });
  };

  if (!user?.result?.name) {
    return <h1>Please sign in to create thoughts and interact with other's</h1>;
  }

  return (
    <Paper
      style={{
        padding: "10px",
        fontWeight: "bold",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          padding: "40px",
          gap: "10px",
        }}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Thought...
        </Typography>

        <TextField
          type="text"
          inputProps={{ maxLength: 20 }}
          required
          name="title"
          variant="outlined"
          label="Title"
          autoFocus
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></TextField>

        <TextField
          type="text"
          inputProps={{ maxLength: 900 }}
          required
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></TextField>

        <Button variant="contained" size="large" type="submit" fullWidth>
          Submit
        </Button>
        <Button variant="contained" size="large" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
