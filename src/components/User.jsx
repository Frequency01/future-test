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
import DetailsOfAdress from "./detailsOfAdress";

const useStyles = makeStyles({
  table: {
    minWidth: "10rem",
  },
  row: {
    fontSize: "2rem",
  },
});

function User({ users, setUsers, handleSort, order }) {
  const classes = useStyles();

  let orderArrow = order ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <TableCell onClick={(_e) => handleSort("id")}>
              Id {orderArrow}
            </TableCell>
            <TableCell onClick={(_e) => handleSort("firstName")}>
              First Name
            </TableCell>
            <TableCell onClick={(_e) => handleSort("lastName")}>
              Last Name
            </TableCell>
            <TableCell onClick={(_e) => handleSort("phone")}>Phone</TableCell>
            <TableCell onClick={(_e) => handleSort("email")}>Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id + user.firstName}>
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
  );
}

export default User;
