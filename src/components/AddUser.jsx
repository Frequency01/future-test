import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
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
    .min(5, "Must be more than 5 digits"),
  firstName: yup
    .string()
    .required("First Name is required")
    .min(5, "Must be more than 5 digits"),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(5, "Must be more than 5 digits"),
  phone: yup
    .number()
    .positive()
    .integer()
    .required("Phone is required")
    .min(5, "Must be more than 5 digits"),
  email: yup
    .string()
    .email()
    .required("Email is required")
    .min(5, "Must be more than 5 digits"),
});
console.log(schema);

export default function CustomizedDialogs({
  users,
  setUsers,
  setFilteredUsers,
}) {
  const [open, setOpen] = useState(false);
  const [FirstNameValue, setFirstNameValue] = useState("");
  const [LastNameValue, setLastNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [id, setId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
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
      id: id,
      firstName: FirstNameValue,
      lastName: LastNameValue,
      phone: phoneValue,
      email: emailValue,
    };
    setUsers([newUser, ...users]);
    setFilteredUsers([newUser, ...users]);
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add User
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmit(handleAddUser)}>
            <TextField
              error={errors.id}
              {...register("id")}
              type="number"
              id="standard-basic"
              label="Id"
              helperText={errors.id && errors.id.message}
              onChange={(e) => setId(e.target.value)}
            />{" "}
            {/* FIXME create component TextField with props */}
            <TextField
              error={errors.firstName}
              helperText={errors.firstName && errors.firstName.message}
              label="First Name"
              {...register("firstName")}
              onChange={(e) => setFirstNameValue(e.target.value)}
              name="firstName"
            />{" "}
            {/* FIXME */}
            <TextField
              error={errors.lastName}
              helperText={errors.lastName && errors.lastName.message}
              label="Last Name"
              {...register("lastName")}
              onChange={(e) => setLastNameValue(e.target.value)}
              name="lastName"
            />{" "}
            {/* FIXME */}
            <TextField
              error={errors.phone}
              helperText={errors.phone && errors.phone.message}
              label="phone"
              {...register("phone")}
              onChange={(e) => setPhoneValue(e.target.value)}
              name="phone"
            />{" "}
            {/* FIXME */}
            <TextField
              error={errors.email}
              helperText={errors.email && errors.email.message}
              label="email"
              {...register("email")}
              onChange={(e) => setEmailValue(e.target.value)}
              name="email"
            />{" "}
            {/* FIXME */}
            <input type="submit" />
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
