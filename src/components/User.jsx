import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles({
  table: {
    minWidth: "10rem",
  },
  row: {
    fontSize: "2rem",
  },
});

function User({ users, setUsers }) {
  const [order, setOrder] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState("");
  console.log(order);
  const classes = useStyles();

  let handleSort = (key) => {
    let sortedUsers = [...users].sort(function (a, b) {
      if (a[key] > b[key]) {
        return order ? -1 : 1;
      }
      if (a[key] < b[key]) {
        return order ? 1 : -1;
      }

      return 0;
    });
    setUsers(sortedUsers);
    setOrder(!order);
  };

  let handleFilter = (text) => {
    let result = users.filter((user) =>
      user.firstName.toUpperCase().includes(text.toUpperCase())
    );
    console.log(text);
    setFilteredUsers(...result);
  };
  let orderArrow = order ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  return (
    <>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search Users"
          onChange={(e) => handleFilter(e.target.value)}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          Search
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell onClick={(e) => handleSort("id")}>
                Id {orderArrow}
              </TableCell>
              <TableCell onClick={(e) => handleSort("firstName")}>
                First Name
              </TableCell>
              <TableCell onClick={(e) => handleSort("lastName")}>
                Last Name
              </TableCell>
              <TableCell onClick={(e) => handleSort("phone")}>Phone</TableCell>
              <TableCell onClick={(e) => handleSort("email")}>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.id}
                </TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default User;
