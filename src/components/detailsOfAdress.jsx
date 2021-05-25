import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  root: {
    minWidth: "40rem",
    padding: "2rem",
  },
});

export default function DetailsOfUser({ selectedUser, hideSelectedUser }) {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.root}>
      <CloseIcon onClick={(e) => hideSelectedUser()} />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <p>
            Выбран пользователь: {selectedUser.firstName}{" "}
            {selectedUser.lastName}
          </p>

          {selectedUser.address ? (
            <>
              <p>Адрес проживания: {selectedUser.address.streetAddress}</p>
              <p>Город: {selectedUser.address.city}</p>
              <p>Провинция/штат: {selectedUser.address.state}</p>
              <p>Индекс: {selectedUser.address.zip}</p>
            </>
          ) : (
            <p>No address</p>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
}
