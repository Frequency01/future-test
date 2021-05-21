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

const SearchBox = ({ users }) => {
  const [filteredUsers, setFilteredUsers] = useState("");
  const classes = useStyles();
  let handleFilter = (text) => {
    let result = users.filter((user) =>
      user.firstName.toUpperCase().includes(text.toUpperCase())
    );
    console.log(text);
    setFilteredUsers([...result]);
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Users"
        onChange={(e) => setFilteredUsers(e.target.value)}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
        onClick={(e) => handleFilter(e.target.value)}
      >
        Search
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
    </Paper>
  );
};

export default SearchBox;
