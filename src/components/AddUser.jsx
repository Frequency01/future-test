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
  id: yup.number().positive().integer().required("Id is required"),
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  phone: yup.number().positive().integer().required("Phone is required"),
  email: yup.string().email().required("Email is required"),
});
console.log(schema);

export default function CustomizedDialogs({ users, setUsers }) {
  const [open, setOpen] = useState(false);
  const [FirstNameValue, setFirstNameValue] = useState("");
  const [LastNameValue, setLastNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [id, setId] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              type="number"
              id="standard-basic"
              label="Id"
              onChange={(e) => setId(e.target.value)}
            />
            <TextField
              label="firstName"
              {...register("firstName")}
              onChange={(e) => setFirstNameValue(e.target.value)}
              name="firstName"
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
            <TextField
              label="lastName"
              {...register("lastName")}
              onChange={(e) => setLastNameValue(e.target.value)}
              name="lastName"
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
            <TextField
              label="phone"
              {...register("phone")}
              onChange={(e) => setPhoneValue(e.target.value)}
              name="phone"
            />
            {errors.phone && <p>{errors.phone.message}</p>}
            <TextField
              label="email"
              {...register("email")}
              onChange={(e) => setEmailValue(e.target.value)}
              name="email"
            />
            {errors.email && <p>{errors.email.message}</p>}
            <Button
              autoFocus
              onClick={(e) => {
                // handleClose();
                // handleAddUser();
              }}
              color="primary"
              type="submit"
            >
              Add User
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// <DialogContent dividers>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <TextField
//               type="number"
//               id="standard-basic"
//               label="Id"
//               onChange={(e) => setId(e.target.value)}
//             />
//             <TextField
//               id="standard-basic"
//               label="First Name"
//               name="firstName"
//               onChange={(e) => setFirstNameValue(e.target.value)}
//             />
//             <TextField
//               id="standard-basic"
//               label="lastName"
//               onChange={(e) => setLastNameValue(e.target.value)}
//             />
//             <TextField
//               id="standard-basic"
//               label="Phone"
//               type="number"
//               onChange={(e) => setPhoneValue(e.target.value)}
//             />
//             <TextField
//               id="standard-basic"
//               label="Email"
//               type="email"
//               onChange={(e) => setEmailValue(e.target.value)}
//             />
//           </form>
//         </DialogContent>
