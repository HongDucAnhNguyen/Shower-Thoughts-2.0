import React from "react";

const Details = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user?.result?.name) {
    return (
      <div>
        hello from details page
        <h1>Please sign in to create thoughts and interact with other's</h1>
      </div>
    );
  }
  return <div>hello from details page {user ? user?.result?.name : ""}</div>;
};

export default Details;
