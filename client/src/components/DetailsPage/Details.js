import React from "react";
import { useLocation } from "react-router-dom";
const Details = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const location = useLocation();
  const { state } = location;
  const thought = state.thought;
  if (!user?.result?.name) {
    return (
      <div>
        hello from details page
        <h1>Please sign in to create thoughts and interact with other's</h1>
      </div>
    );
  }
  return (
    <div>
      hello from details page{" "}
      {user ? `user ${user?.result?.name} with post id: ${thought._id}` : ""}
      <h2>{thought.title}</h2>
      <h2>{thought.message}</h2>
    </div>
  );
};

export default Details;
