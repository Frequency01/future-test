import React from "react";
import {
  InputBase,
  Divider,
  IconButton,
  Paper,
  makeStyles,
  Grid,
  TextField,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: "22rem",
    minHeight: "5vh",
    margin: "2rem",
  },
  row: {
    fontSize: "2rem",
  },
  iconButton: {
    minWidth: "10rem",
    height: "3rem",
  },
  input: {
    minWidth: "15rem",
    height: "4rem",
  },
});

const SearchBox = ({
  handleFilter,
  setSearchTerm,
  searchTerm,
  searchField,
  setSearchField,
}) => {
  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const classes = useStyles();

  let fieldNames = [
    { name: "ID", value: "id" },
    { name: " First Name", value: "firstName" },
    { name: "Last Name", value: "lastName" },
    { name: "Phone", value: "phone" },
    { name: "Email", value: "email" },
  ];

  return (
    <Grid container direction="row" justify="center" alignItems="center">
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
      <TextField
        select
        label="Select"
        value={searchField}
        onChange={handleChange}
        helperText="Please select serach field"
      >
        {fieldNames.map((field) => (
          <MenuItem key={field.value} value={field.value}>
            {field.name}
          </MenuItem>
        ))}
      </TextField>
    </Grid>
  );
};

export default SearchBox;
