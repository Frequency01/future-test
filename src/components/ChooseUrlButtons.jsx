import React from "react";
import { Grid, Button } from "@material-ui/core";

const ChooseButtons = ({ setChooseUrlButtons }) => {
  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Button color="primary" onClick={(e) => setChooseUrlButtons(true)}>
        Small URL
      </Button>
      <Button color="secondary" onClick={(e) => setChooseUrlButtons(false)}>
        Big URL
      </Button>
    </Grid>
  );
};

export default ChooseButtons;
