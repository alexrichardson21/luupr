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
import Sound from "react-sound";
import SoundLuuper from "./components/SoundLuupr";
import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles(theme => ({
//   header: {
//     marginBottom: 10
//   },
//   body: {},
//   root: {
//     display: "flex"
//   },
//   paper: {
//     // padding: theme.spacing(1),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     minHeight: 50
//   },
//   content: {
//     // flexGrow: 1,
//     // padding: theme.spacing(3),
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     marginLeft: 0
//   },
//   contentShift: {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen
//     }),
//     marginLeft: 240
//   }
// }));

function App() {
  const [tracks, setTracks] = React.useState([
    { type: "Drum Kit", props: {}, loops: [] }
  ]);
  // const [loops, setLoops] = React.useState([[]])
  const [openDrawer, toggleDrawer] = React.useState(false);
  const [openLoop, setOpenLoop] = React.useState(0);
  const [playingLoops, setPlayingLoops] = React.useState([-1]);
  const [luuprMode, setLuuprMode] = React.useState(true);
  const [tempo, setTempo] = React.useState(120);
  const [globalPlay, setGlobalPlay] = React.useState(false);
  // const classes = useStyles();

  return (
    <div>
      <header className={"App-header"}>
        {/* {!openLoop && <PatternDrawer />} */}
        <MainControls
          openLoop={openLoop}
          backCallback={() => setOpenLoop(false)}
          modeCallback={() => setLuuprMode(!luuprMode)}
          tempo={tempo}
          tempoCallback={bpm => setTempo(bpm)}
          globalPlayCallback={() => {
            setGlobalPlay(true);
            setPlayingLoops();
          }}
          globalStopCallback={() => {
            setPlayingLoops(playingLoops.map(() => -1));
            setGlobalPlay(false);
          }}
        />
      </header>

      <body className="App-body">
        {luuprMode && !openLoop && (
          <div>
            <LuuprPage
              openLoopCallback={num => setOpenLoop(num)}
              playLoopCallback={(trackNum, loopNum) => {
                let a = playingLoops.slice();
                a[trackNum] = loopNum;
                setPlayingLoops(a);
                setGlobalPlay(true);
              }}
              stopLoopCallback={trackNum => {
                let a = playingLoops.slice();
                a[trackNum] = -1;
                setPlayingLoops(a);
                // setGlobalPlay(false)
              }}
              playingLoops={playingLoops}
              addTrack={trackType => {
                setTracks(
                  tracks.concat([
                    {
                      type: trackType,
                      props: {},
                      loops: []
                    }
                  ])
                );
                setPlayingLoops(playingLoops.concat([-1]));
              }}
              tracks={tracks}
              openDrawer={openDrawer}
              newLoopCallback={trackId => {
                let a = tracks.slice();
                a[trackId].loops.push([]);
                setTracks(a);
              }}
            />
          </div>
        )}
        {openLoop && (
          <SamplrEditor
            tempo={tempo}
            deleteLoopDataCallback={noteIndex => {
              const a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId].splice(noteIndex, 1);
              setTracks(a);
            }}
            addLoopDataCallback={data => {
              const a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId].push(data);
              setTracks(a);
            }}
            changeLoopDataCallback={(noteIndex, data) => {
              const a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId][noteIndex] = data;
              setTracks(a);
            }}
            trackProps={tracks[openLoop.trackId]}
            openLoop={openLoop}
            loopProps={tracks[openLoop.trackId].loops[openLoop.loopId]}
            tempoCallback={bpm => setTempo(bpm)}
            globalPlay={globalPlay}
          />
        )}
        })}
      </body>

      <footer />
    </div>
  );
}
export default App;
