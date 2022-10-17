import React from "react";
import { useDispatch } from "react-redux";
import { deleteThoughts } from "../actions/action";
const Thought = ({ thought, setCurrentId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteThoughts(thought._id));
  };
  return (
    <div>
      <p>ID: {thought._id}</p>
      <h1>{thought.name}</h1>
      <p>{thought.message}</p>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          setCurrentId(thought._id);
          console.log(thought._id);
        }}
      >
        Edit
      </button>
    </div>
  );
};

export default Thought;
