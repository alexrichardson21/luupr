import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React from "react";
import "./App.css";
import MainControls from "./components/MainControls";
import NewTrackPopup from "./components/NewTrackPopup";
import PatternDrawer from "./components/PatternDrawer";
import SimpleBottomNavigation from "./deprecated/SimpleBottomNavigation.js";
import LuuprPage from "./pages/LuuprPage";
import SamplrEditor from "./pages/SamplrEditor";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   paper: {
//     // padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     minHeight: 50,
//   },
//   content: {
//     // flexGrow: 1,
//     // padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen,
//     }),
//     marginLeft: 0,
//   },
//   contentShift: {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 240,
//   },
// }));

function App() {
  const [tracks, setTracks] = React.useState([]);
  const [drums, setDrums] = React.useState([]);
  const [openDrawer, toggleDrawer] = React.useState(false);
  const [drumMasterOpen, setDrumMasterOpen] = React.useState(true);
  const [currPage, setCurrPage] = React.useState(0);
  const [openLoop, setOpenLoop] = React.useState(0);
  const [isDarkMode, setDarkMode] = React.useState(true);
  const [luuprMode, setLuuprMode] = React.useState(true);

  // let prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // prefersDarkMode = true;

  // // const classes = useStyles();

  // const theme = React.useMemo(
  //   () =>
  //     createMuiTheme({
  //       palette: {
  //         type: prefersDarkMode ? "dark" : "light",
  //         background: {
  //           paper: "#313131",
  //         },
  //       },
  //     }),
  //   [prefersDarkMode]
  // );

  const toggleDrawerCallback = () => {
    toggleDrawer(!openDrawer);
  };

  const addTrackCallback = (newTrack) => {
    setTracks(tracks.concat([newTrack]));
  };

  const stuffForLaterMaybe = (
    <div>
      <header className="App-header">
        {/* <NewHeader></NewHeader> */}
        {/* <SideDrawer toggle={toggleDrawerCallback.bind(this)}></SideDrawer> */}
        <MainControls></MainControls>
      </header>

      <body className="App-body">
      {/* <MainControls></MainControls> */}
        {luuprMode && !openLoop && (
          <div>
            <LuuprPage
              openLoopCallback={(num) => setOpenLoop(num)}
              tracks={tracks}
              openDrawer={openDrawer}
            ></LuuprPage>

            <NewTrackPopup addTrack={addTrackCallback.bind(this)}>
              {" "}
            </NewTrackPopup>

            <Box display="flex" justifyContent="center">
              <ThemeProvider theme={'theme'}>
                <SimpleBottomNavigation
                  page={(val) => setCurrPage(val)}
                ></SimpleBottomNavigation>
              </ThemeProvider>
            </Box>
          </div>
        )}

        {openLoop && <SamplrEditor></SamplrEditor>}
      </body>

      <footer></footer>
    </div>
  );

  return (
    <div>
      <header className="App-header">
        <PatternDrawer></PatternDrawer>
        <MainControls modeCallback={() => setLuuprMode(!luuprMode)}></MainControls>
      </header>

      <body className="App-body">
        {luuprMode && !openLoop && (
          <div>
            <LuuprPage
              openLoopCallback={(num) => setOpenLoop(num)}
              // addTrack={(track) => setTracks(tracks.concat([track]))}
              // tracks={tracks}
              openDrawer={openDrawer}
            ></LuuprPage>
          </div>
        )}

        {openLoop && <SamplrEditor></SamplrEditor>}
      </body>

      <footer></footer>
    </div>
  );
}
export default App;
