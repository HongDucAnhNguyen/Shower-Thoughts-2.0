import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createThoughts, updateThoughts } from "../../actions/action";

const Form = ({ currentId, setCurrentId }) => {
  const thought = useSelector((state) =>
    currentId
      ? state.thoughts.find((thought) => thought._id === currentId)
      : null
  );

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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
      dispatch(createThoughts({ ...formData }));
    } else {
      dispatch(/**update */ updateThoughts(currentId, { ...formData }));
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setFormData({
      name: "",
      message: "",
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
