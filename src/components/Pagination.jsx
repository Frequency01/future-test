import React from "react";
import Button from "@material-ui/core/Button";

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  let totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <>
      <Button
        onClick={() => paginate(currentPage - 1)}
        className="page-link"
        disabled={currentPage === 1 ? true : false}
      >
        назад
      </Button>
      <Button
        onClick={() => paginate(currentPage + 1)}
        className="page-link"
        disabled={totalPages === currentPage ? true : false}
      >
        вперед
      </Button>
    </>
  );
};

export default Pagination;
