import React, { useState } from "react";
import "./App.css";
import Playground from "./Playground";
import Header from "./Header";
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
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import SideDrawer from './SideDrawer'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

// import { Typography } from "material-ui/styles";

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
  let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [tracks, setTracks] = React.useState([]);
  const [openDrawer, toggleDrawer] = React.useState(false);
  prefersDarkMode = true;
  const classes = useStyles();
  // const theme = useTheme();

  const callbackFunction = () => {
    toggleDrawer(!openDrawer)
  };

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

  const parentFunction = (data_from_child) => {
    console.log("this is happening");
    setTracks(tracks.concat([data_from_child]));
  };

  const trackLayout = tracks.map((item) => (
    <Grid item>
      <TrackBar openDrawer={openDrawer}></TrackBar>
    </Grid>
  ));

  return (
    <div className="App">
      <header className="App-header">
        {/* <Header></Header> */}
        <SideDrawer parentCallback={callbackFunction.bind(this)}></SideDrawer>
        {/* <ThemeProvider theme={theme}>
          <AppBar position="static" style={{ background: "#212121" }}>
            <Toolbar style={{ color: { grey900 } }}>
              <Grid
                justify="space-between" // Add it here :)
                container
                spacing={24}
              >
                <Grid item>
                  <Header></Header>
                </Grid>

                <Grid item>
                  <SimpleBottomNavigation></SimpleBottomNavigation>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        </ThemeProvider> */}
      </header>
      <body className="App-body">
        {trackLayout ? (
          <Grid
            container
            direction="column"
            justify="space-between"
            spacing={24}
            className={clsx(classes.content, {
              [classes.contentShift]: openDrawer,
            })}
          >
            {trackLayout}
          </Grid>
        ) : (
          <div></div>
        )}
        <NewTrackPopup functionCallFromParent={parentFunction.bind(this)}>
          {" "}
        </NewTrackPopup>
        <Box display="flex" justifyContent="center">
          <ThemeProvider theme={theme}>
            <SimpleBottomNavigation></SimpleBottomNavigation>
          </ThemeProvider>
        </Box>
      </body>
      <footer></footer>
    </div>
  );
}
export default App;
