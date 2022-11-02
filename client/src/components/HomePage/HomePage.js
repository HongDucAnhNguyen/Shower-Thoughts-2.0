import React, { useState, useEffect } from "react";
import Thoughts from "../thoughts";
import Form from "../Form/Form";
import { getThoughts } from "../../actions/action";
import { useDispatch } from "react-redux";
import Navbar from "../NavBar/Navbar";

const HomePage = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch, currentId]);
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <>
      <Navbar />

      <div className="Homepage">
        <h1>Shower Thoughts 2.0</h1>
        <div>
          <Thoughts setCurrentId={setCurrentId}></Thoughts>
        </div>
        <br />
        <div>
          <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
        </div>
        <br />

        {!user && <a href="/auth">Login</a>}
      </div>
    </>
  );
};

export default HomePage;
