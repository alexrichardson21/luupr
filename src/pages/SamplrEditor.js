import React, { useState } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SimpleBottomNavigation from "../components/SimpleBottomNavigation.js";
import { Box, Paper, Fab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TrackBar from "../components/TrackBar";
import { grey900 } from "material-ui/styles/colors";
import AddIcon from "@material-ui/icons/Add";
import NewTrackPopup from "../components/NewTrackPopup";
import DrumMaster from "../components/DrumMaster";
import DrumTrackBar from "../components/DrumTrackBar";
import { DragDropContext } from "react-beautiful-dnd";
import SideDrawer from "../components/SideDrawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 50,
  },
}));

export default function SamplrEditor() {
  const classes = useStyles();
  const [loops, setLoops] = React.useState(0);

  const gridRow = (
    <div>
      <Grid container spacing={1}>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );

  const samplrEditor = (
    <div>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          {gridRow}
          {gridRow}
          {gridRow}
          {gridRow}
        </Grid>
      </Grid>
    </div>
  );

  return (
    <div>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={10}>
          {gridRow}
          {gridRow}
          {gridRow}
          {gridRow}
        </Grid>
      </Grid>
    </div>
  );
}
