import React from "react";

import { useSelector } from "react-redux";
import Thought from "./thought";
const Thoughts = ({ setCurrentId }) => {
  const thoughts = useSelector((state) => state.thoughts);
  //useSelector selects the state of the reducer
  //because we used combine reducers we have to follow the naming within index.js

  return (
    <div>
      {thoughts.map((thought) => (
        <Thought
          key={thought._id}
          thought={thought}
          setCurrentId={setCurrentId}
        ></Thought>
      ))}
    </div>
  );
};

export default Thoughts;
