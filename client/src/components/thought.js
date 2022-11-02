import React from "react";
import { useDispatch } from "react-redux";
import { deleteThoughts } from "../actions/action";
const Thought = ({ thought, setCurrentId }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteThoughts(thought._id));
  };
  const user = JSON.parse(localStorage.getItem("profile"));
  //users cannot alter other's thoughts
  return (
    <div>
      <h2>created by {thought.name}</h2>
      <h1>{thought.title}</h1>
      <p>{thought.message}</p>

      {user?.result?._id === thought?.creator && (
        <>
          <button onClick={handleDelete}>Delete</button>
          <button
            onClick={() => {
              setCurrentId(thought._id);
              console.log(thought._id);
            }}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default Thought;
