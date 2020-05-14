import { Paper } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import SamplrTable from "../components/SamplrTable.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    // padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 50,
    border: '1px solid'
  },
}));

export default function SamplrEditor() {
  const classes = useStyles();
  const [loops, setLoops] = React.useState(0);

  const click = () => {
    console.log()
  };

  const gridRow = (
    <div>
      <Grid container>
        {[0,1,2,3,4,5,6,7].map((id) => (
        <Grid item xs>
          <Paper id={id} onClick={click} className={classes.paper}></Paper>
        </Grid>
        ))}
      </Grid>
    </div>
  );

  return (
    <div>
      <SamplrTable></SamplrTable>
      {/* <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          {gridRow}
          {gridRow}
          {gridRow}
          {gridRow}
        </Grid>
      </Grid> */}
    </div>
  );
}
