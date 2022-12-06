import React, { useState } from "react";

const SearchForm = () => {
  const [searchFormData, setSearchFormData] = useState({
    searchQuery: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("You submitted your searchQuery");
    console.log(searchFormData);
    setSearchFormData({ searchQuery: "" });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          required
          placeholder="Search for thoughts"
          type="text"
          name="search_field"
          value={searchFormData.searchQuery}
          onChange={(e) => {
            console.log(e.target.value);
            setSearchFormData({
              searchQuery: e.target.value,
            });
          }}
        />
        <input type="submit" name="search_btn" value="Search" />
      </form>
    </>
  );
};

export default SearchForm;
