import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//get thoughts (by page) from action folder
const PaginationBar = ({ page }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    //everytime page changes, get posts corresponding to page
  }, [page]);
  return (
    <Pagination
      count={10}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/thoughts?page=${1}`} />
      )}
    />
  );
};

export default PaginationBar;
