import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    width: "50%",
  },
});
const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  let totalPages = Math.ceil(totalUsers / usersPerPage);
  const classes = useStyles();

  return (
    <>
      <Button
        onClick={() => paginate(currentPage - 1)}
        className={classes.button}
        disabled={currentPage === 1 ? true : false}
      >
        назад
      </Button>
      <Button
        onClick={() => paginate(currentPage + 1)}
        className={classes.button}
        disabled={totalPages === currentPage ? true : false}
      >
        вперед
      </Button>
    </>
  );
};

export default Pagination;
