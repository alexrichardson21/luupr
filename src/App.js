import React, { useState } from "react";
import "./App.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SimpleBottomNavigation from "./SimpleBottomNavigation.js";
import { Box, Paper, Fab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TrackBar from "./TrackBar";
import { grey900 } from "material-ui/styles/colors";
import AddIcon from "@material-ui/icons/Add";
import NewTrackPopup from "./NewTrackPopup";
import DrumMaster from "./DrumMaster";
import DrumTrackBar from "./DrumTrackBar";
import { DragDropContext } from "react-beautiful-dnd";
import SideDrawer from "./SideDrawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
}));

function App() {
  const [tracks, setTracks] = React.useState([]);
  const [openDrawer, toggleDrawer] = React.useState(false);
  const [drumMasterOpen, setDrumMasterOpen] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(0);

  let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  prefersDarkMode = true;

  const classes = useStyles();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          background: {
            paper: "#313131",
          },
        },
      }),
    [prefersDarkMode]
  );

  const toggleDrawerCallback = () => {
    toggleDrawer(!openDrawer);
  };

  const addTrackCallback = (data_from_child) => {
    setTracks(tracks.concat([data_from_child]));
  };

  const drumLayout = tracks
    .filter((track) => track === "Drum")
    .map((track) => (
      <Grid item>
        <DrumTrackBar></DrumTrackBar>
      </Grid>
    ));

  const trackLayout = tracks
    .filter((track) => track !== "Drum")
    .map((track) => (
      <Grid item>
        <TrackBar trackType={track}></TrackBar>
      </Grid>
    ));

  const luuprPage =
    currPage === 0 ? (
      trackLayout ? (
        <Grid
          container
          direction="column"
          justify="space-between"
          spacing={24}
          className={clsx(classes.content, {
            [classes.contentShift]: openDrawer,
          })}
        >
          <Grid item className="DrumMaster">
            <DrumMaster
              open={() => setDrumMasterOpen(!drumMasterOpen)}
            ></DrumMaster>
          </Grid>
          {!drumMasterOpen ? drumLayout : <div></div>}
          {trackLayout}
        </Grid>
      ) : (
        <div></div>
      )
    ) : (
      <div></div>
    );



  return (
    <div className="App">
      <header className="App-header">
        <SideDrawer toggle={toggleDrawerCallback.bind(this)}></SideDrawer>
      </header>

      <body className="App-body">
        {luuprPage}

        <NewTrackPopup addTrack={addTrackCallback.bind(this)}>
          {" "}
        </NewTrackPopup>

        <Box display="flex" justifyContent="center">
          <ThemeProvider theme={theme}>
            <SimpleBottomNavigation
              page={(val) => setCurrPage(val)}
            ></SimpleBottomNavigation>
          </ThemeProvider>
        </Box>
      </body>

      <footer></footer>
    </div>
  );
}
export default App;
