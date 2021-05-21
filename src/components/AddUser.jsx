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

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs({ users, setUsers }) {
  const [open, setOpen] = useState(false);
  const [FirstNameValue, setFirstNameValue] = useState("");
  const [LastNameValue, setLastNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [id, setId] = useState("");

  const { register } = useForm();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  };

  return (
    <div>
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
          <TextField
            type="number"
            id="standard-basic"
            label="Id"
            onChange={(e) => setId(e.target.value)}
          />
          <TextField
            {...register("firstName", { required: true, maxLength: 20 })}
            id="standard-basic"
            label="First Name"
            onChange={(e) => setFirstNameValue(e.target.value)}
          />
          <TextField
            {...register("lastName", { pattern: /^[A-Za-z]+$/i })}
            id="standard-basic"
            label="Last Name"
            onChange={(e) => setLastNameValue(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Phone"
            type="number"
            onChange={(e) => setPhoneValue(e.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Email"
            type="email"
            onChange={(e) => setEmailValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={(e) => {
              handleClose();
              handleAddUser();
            }}
            color="primary"
          >
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
