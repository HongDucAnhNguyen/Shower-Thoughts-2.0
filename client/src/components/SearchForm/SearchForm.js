import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getThoughts, getThoughtsBySearch } from "../../actions/action";
import { Button, Input } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ReplayIcon from "@mui/icons-material/Replay";
import { useNavigate, useLocation } from "react-router-dom";

const SearchForm = () => {
  const { currentPage } = useSelector((state) => state.thoughts);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchFormData, setSearchFormData] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (location.pathname !== "/home") {
      navigate("/home");
      setSearchFormData("");
      return;
    }
    console.log("You submitted your searchQuery");
    dispatch(getThoughtsBySearch(searchFormData));
    navigate(`/home?search=${searchFormData}`);
    setSearchFormData("");
  };
  return (
    <div style={{ paddingLeft: "" }}>
      <form onSubmit={handleSubmit}>
        <Input
          style={{
            backgroundColor: "white",
            borderRadius: "3px",
            padding: "5px",
            width: "400px",
          }}
          required
          placeholder="Search"
          type="text"
          name="search_field"
          value={searchFormData}
          onChange={(e) => {
            console.log(e.target.value);
            setSearchFormData(e.target.value);
          }}
        ></Input>
        <Button type="submit">
          <SearchIcon></SearchIcon>
        </Button>
        <Button
          onClick={() => {
            dispatch(getThoughts(currentPage));
            navigate(`/home?page=${currentPage}`);
          }}
        >
          <ReplayIcon></ReplayIcon>
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
