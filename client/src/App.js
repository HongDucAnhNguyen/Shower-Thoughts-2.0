import Thoughts from "./components/thoughts";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import { useState, useEffect } from "react";
import { getThoughts } from "./actions/action";
import { useDispatch } from "react-redux";
function App() {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getThoughts());
  }, [dispatch, currentId]);

  return (
    <div className="App">
      <h1>Shower Thoughts 2.0</h1>
      <div>
        <Thoughts setCurrentId={setCurrentId}></Thoughts>
      </div>
      <br />
      <div>
        <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
      </div>
    </div>
  );
}

export default App;
