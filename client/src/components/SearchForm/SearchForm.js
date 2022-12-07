import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getThoughts, getThoughtsBySearch } from "../../actions/action";
const SearchForm = () => {
  const dispatch = useDispatch();
  const [searchFormData, setSearchFormData] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You submitted your searchQuery");
    dispatch(getThoughtsBySearch(searchFormData));
    setSearchFormData("");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Search for thoughts"
          type="text"
          name="search_field"
          value={searchFormData}
          onChange={(e) => {
            console.log(e.target.value);
            setSearchFormData(e.target.value);
          }}
        />

        <input type="submit" value="Search" />
      </form>
      <button
        onClick={() => {
          dispatch(getThoughts());
        }}
      >
        Get All
      </button>
    </>
  );
};

export default SearchForm;
