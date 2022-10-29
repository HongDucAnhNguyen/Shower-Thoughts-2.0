import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThoughts, updateThoughts } from "../../actions/action";

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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          required
          type="text"
          name="name"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        ></input>
        <label>Message:</label>
        <input
          required
          type="text"
          name="message"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        ></input>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
