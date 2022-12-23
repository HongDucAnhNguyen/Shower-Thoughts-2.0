import React from "react";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
const SearchFormNav = () => {
  const location = useLocation();
  return (
    <li>
      {location.pathname !== "/auth" && (
        <>
          <SearchForm></SearchForm>
        </>
      )}
    </li>
  );
};

export default SearchFormNav;
