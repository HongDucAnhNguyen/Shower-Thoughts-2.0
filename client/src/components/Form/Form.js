import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThoughts, updateThoughts } from "../../actions/action";
import { TextField, Button, Typography, Paper } from "@mui/material";

const Form = ({ currentId, setCurrentId }) => {
  const thought = useSelector((state) =>
    currentId
      ? state.thoughts.find((thought) => thought._id === currentId)
      : null
  );
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    message: "",
  });

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
    <Paper style={{ padding: "20px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>

        <TextField
          max={100}
          required
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></TextField>

        <TextField
          max={100}
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

        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
