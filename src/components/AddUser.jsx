import React, { useState } from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import CloseIcon from "@material-ui/icons/Close";
import {
  TextField,
  Typography,
  IconButton,
  Button,
  Dialog,
  withStyles,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  addUserButton: {
    width: "50%",
  },
});
const useStyles = makeStyles({
  addUserButton: {
    padding: "1rem",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const schema = yup.object().shape({
  id: yup
    .number()
    .positive()
    .integer()
    .required("Id is required")
    .min(3, "Must be min than 3 digits"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.number().positive().integer().required("Phone is required"),
  email: yup.string().email().required("Email is required"),
});

export default function AddUser({ users, setUsers, setFilteredUsers }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  let handleAddUser = () => {
    let newUser = {
      id: getValues("id"),
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      phone: getValues("phone"),
      email: getValues("email"),
    };
    setUsers([newUser, ...users]);
    setFilteredUsers([newUser, ...users]);
    handleClose();
  };

  let formFields = [
    { name: "id", label: "ID", type: "number" },
    { name: "phone", label: "Phone", type: "number" },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    { name: "email", label: "Email", type: "text" },
  ];

  return (
    <>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Button
          variant="outlined"
          color="primary"
          onClick={handleClickOpen}
          className={classes.addUserButton}
        >
          Add User
        </Button>
      </Grid>
      <Grid container direction="row" justify="flex-start" alignItems="center">
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Add User
          </DialogTitle>
          <DialogContent dividers>
            <form onSubmit={handleSubmit(handleAddUser)}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                {formFields.map((field) => (
                  <Grid item xs={6} key={field.name}>
                    <TextField
                      error={!!errors[field.name]}
                      {...register(field.name)}
                      type={field.type}
                      name={field.name}
                      label={field.label}
                      helperText={
                        errors[field.name] && errors[field.name].message
                      }
                      onChange={(e) => setValue(field.name, e.target.value)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={6} className={classes.addUserButton}>
                <Button variant="contained" color="primary" type="submit">
                  Add User
                </Button>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Grid>
    </>
  );
}
