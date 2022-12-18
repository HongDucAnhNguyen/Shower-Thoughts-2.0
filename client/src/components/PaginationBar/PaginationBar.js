import React, { useEffect } from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//get thoughts (by page) from action folder
import { getThoughts } from "../../actions/action";

const PaginationBar = ({ page }) => {
  console.log("currently in page " + page);
  const dispatch = useDispatch();
  const { totalPages } = useSelector((state) => state.thoughts);
  const thoughts = useSelector((state) => state.thoughts);

  useEffect(() => {
    //everytime page changes, get posts corresponding to page
    if (page) {
      dispatch(getThoughts(page));
      console.log(thoughts);
    }
  }, [page]);
  return (
    <Pagination
      count={totalPages}
      variant="outlined"
      color="primary"
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/home?page=${item.page}`}
        />
      )}
    />
  );
};

export default PaginationBar;
