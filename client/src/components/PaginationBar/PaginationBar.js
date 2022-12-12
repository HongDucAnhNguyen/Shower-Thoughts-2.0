import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
const PaginationBar = () => {
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
