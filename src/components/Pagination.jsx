import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Pagination = ({ usersPerPage, totalUsers, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {pageNumbers.map((number) => {
        return (
          <ButtonGroup className="mr-2" aria-label="First group" key={number}>
            <Button
              onClick={() => paginate(number)}
              href="!#"
              className="page-link"
            >
              {number}
            </Button>
          </ButtonGroup>
        );
      })}
    </nav>
  );
};

export default Pagination;
