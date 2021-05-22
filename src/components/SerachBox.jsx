import React, { useState } from "react";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  table: {
    minWidth: "10rem",
  },
  row: {
    fontSize: "2rem",
  },
});

const SearchBox = ({ handleFilter, setSearchTerm, searchTerm }) => {
  const classes = useStyles();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Users"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <IconButton
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => handleFilter(searchTerm)}
      >
        Search
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  );
};

export default SearchBox;
