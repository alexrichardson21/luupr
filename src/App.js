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

function App() {
  let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [tracks, setTracks] = React.useState([]);
  // prefersDarkMode = true;

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
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
      <TrackBar></TrackBar>
    </Grid>
  ));

  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
      </header>
      <body className="App-body">
        {trackLayout ? (
          <Grid
            container
            direction="column"
            justify="space-between"
            spacing={24}
          >
            {trackLayout}
          </Grid>
        ) : (
          <div></div>
        )}
        <NewTrackPopup functionCallFromParent={parentFunction.bind(this)}>
          {" "}
        </NewTrackPopup>
      </body>
      <footer></footer>
    </div>
  );
}
export default App;
