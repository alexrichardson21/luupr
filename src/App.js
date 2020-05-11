import React, { useState } from "react";
import "./App.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import SimpleBottomNavigation from "./components/SimpleBottomNavigation.js";
import { Box, Paper, Fab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import TrackBar from "./components/TrackBar";
import { grey900 } from "material-ui/styles/colors";
import AddIcon from "@material-ui/icons/Add";
import NewTrackPopup from "./components/NewTrackPopup";
import DrumMaster from "./components/DrumMaster";
import DrumTrackBar from "./components/DrumTrackBar";
import { DragDropContext } from "react-beautiful-dnd";
import SideDrawer from "./components/SideDrawer";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import SamplrEditor from './pages/SamplrEditor';

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
  const [drums, setDrums] = React.useState([]);
  const [openDrawer, toggleDrawer] = React.useState(false);
  const [drumMasterOpen, setDrumMasterOpen] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(0);
  const [openLoop, setOpenLoop] = React.useState(0);

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
    .map((track, i) => (
      <Grid item>
        <TrackBar
          openLoopCallback={(num) => setOpenLoop(num)}
          trackType={track}
          id={i}
        ></TrackBar>
      </Grid>
    ));

  const luuprPage = currPage === 0 && !openLoop && trackLayout && (
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
      {!drumMasterOpen && drumLayout}
      {trackLayout}
    </Grid>
  );

  // const samplrEditor = openLoop && (<SamplrEditor></SamplrEditor>)

  return (
    <div className="App">
      <header className="App-header">
        <SideDrawer toggle={toggleDrawerCallback.bind(this)}></SideDrawer>
      </header>

      <body className="App-body">
        {luuprPage}
        {openLoop && (<SamplrEditor></SamplrEditor>)}

        <NewTrackPopup addTrack={addTrackCallback.bind(this)}> </NewTrackPopup>

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
