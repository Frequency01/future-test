import React, { useState } from "react";
import {
  Grid,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  makeStyles,
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

const useStyles = makeStyles({
  table: {
    tableLayout: "fixed",
  },
  clickable: {
    cursor: "pointer",
  },
});

function User({ users, handleSort, order, showSelectedUser }) {
  const [selectedRow, setSelectedRow] = useState(null);
  const classes = useStyles();

  let orderArrow = (
    <div>
      {order === null ? (
        ""
      ) : order ? (
        <ArrowUpwardIcon />
      ) : (
        <ArrowDownwardIcon />
      )}
    </div>
  );

  let tableSell = (rowName) => {
    return (
      <TableCell
        onClick={(_e) => {
          handleSort(rowName.keyName);
          changeOrderArrow(rowName.keyName);
        }}
        className={classes.clickable}
        key={rowName.keyName}
      >
        <Grid container>
          <Grid item>{rowName.title}</Grid>
          <Grid item>{renderOrderArrow(rowName.keyName)}</Grid>
        </Grid>
      </TableCell>
    );
  };

  let tableHeaders = [
    { keyName: "id", title: "ID" },
    { keyName: "firstName", title: "First Name" },
    { keyName: "lastName", title: "Last Name" },
    { keyName: "phone", title: "Phone" },
    { keyName: "email", title: "Email" },
  ];
  let renderOrderArrow = (rowName) => {
    return selectedRow === rowName ? orderArrow : null;
  };
  let changeOrderArrow = (rowName) => {
    setSelectedRow(rowName);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{tableHeaders.map((header) => tableSell(header))}</TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id + user.firstName}
              onClick={(e) => showSelectedUser(user)}
              className={classes.clickable}
            >
              <TableCell>{user.id}</TableCell>
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
