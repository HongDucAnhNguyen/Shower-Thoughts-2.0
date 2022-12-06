import React from "react";
import { useLocation } from "react-router-dom";
const Details = () => {
  // const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const { state } = location;
  const thought = state.thought;
  // if (!user?.result?.name) {
  //   return (
  //     <div>
  //       <h1>Please sign in to create thoughts and interact with other's</h1>
  //     </div>
  //   );
  // }
  return (
    <div>
      <h2>{thought.title}</h2>
      <h2>{thought.message}</h2>
      <h3>created by: {thought.name}</h3>
      <p>
        post has {thought.likes.length}{" "}
        {thought.likes.length === 0 || thought.likes.length > 1
          ? "likes"
          : "like"}
      </p>
    </div>
  );
};

export default Details;
