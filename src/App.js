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
  const [tracks, setTracks] = React.useState([
    { type: "Drum", props: {}, loops: [] },
  ]);
  // const [loops, setLoops] = React.useState([[]])
  const [openDrawer, toggleDrawer] = React.useState(false);
  // const [currPage, setCurrPage] = React.useState(0);
  const [openLoop, setOpenLoop] = React.useState(0);
  // const [isDarkMode, setDarkMode] = React.useState(true);
  const [playingLoops, setPlayingLoops] = React.useState([-1]);
  const [luuprMode, setLuuprMode] = React.useState(true);
  const [tempo, setTempo] = React.useState(120);
  const [globalPlay, setGlobalPlay] = React.useState(false);

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

  // const toggleDrawerCallback = () => {
  //   toggleDrawer(!openDrawer);
  // };

  // const addTrackCallback = (newTrack) => {
  //   setTracks(tracks.concat([newTrack]));
  // };

  return (
    <div>
      <header className="App-header">
        {!openLoop && <PatternDrawer></PatternDrawer>}
        <MainControls
          openLoop={openLoop}
          backCallback={() => setOpenLoop(false)}
          modeCallback={() => setLuuprMode(!luuprMode)}
          tempo={tempo}
          tempoCallback={(bpm) => setTempo(bpm)}
          globalPlayCallback={() => {
            setGlobalPlay(true);
            // tracks.map((track, i) => {
            //   if (playingLoops[i] !== -1) {
            //     track.loops[playingLoops[i]].map((notes, j) => {
            //       notes !== [] ?
            //       notes.map((note, k) => {
            //         loop = {
            //           trackIndex: i,
            //           note: j,
            //           index: k,
            //           playStatus: false,
            //           startPosition: track.props.downbeats[j] * 1000
            //         }
            //       }
            //     })
            //   }
            // });
            setPlayingLoops();
          }}
          globalStopCallback={() => {
            setPlayingLoops(playingLoops.map(() => -1));
            setGlobalPlay(false);
          }}
        ></MainControls>
      </header>

      <body className="App-body">
        {luuprMode && !openLoop && (
          <div>
            <LuuprPage
              openLoopCallback={(num) => setOpenLoop(num)}
              playLoopCallback={(trackNum, loopNum) => {
                let a = playingLoops.slice();
                a[trackNum] = loopNum;
                setPlayingLoops(a);
                setGlobalPlay(true);
              }}
              stopLoopCallback={(trackNum) => {
                let a = playingLoops.slice();
                a[trackNum] = -1;
                setPlayingLoops(a);
                // setGlobalPlay(false)
              }}
              playingLoops={playingLoops}
              addTrack={(track) => {
                setTracks(tracks.concat([track]));
                setPlayingLoops(playingLoops.concat([-1]));
              }}
              tracks={tracks}
              openDrawer={openDrawer}
              newLoopCallback={(trackId) => {
                let a = tracks.slice();
                a[trackId].loops.push(
                  []
                  // Array(a[trackId].props.canvasData.length).fill([])
                );
                setTracks(a);
                // let b = playingLoops.slice()
                // b = b[trackId].concat([-1])
                // setPlayingLoops(b)
              }}
            ></LuuprPage>
          </div>
        )}
        {openLoop && (
          <SamplrEditor
            tempo={tempo}
            deleteLoopDataCallback={(noteIndex) => {
              const a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId].splice(noteIndex, 1);
              setTracks(a);
            }}
            addLoopDataCallback={(data) => {
              const a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId].push(data);
              // a[openLoop.trackId].loops[openLoop.loopId][boxIndex].end = end;
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
            tempoCallback={(bpm) => setTempo(bpm)}
            globalPlay={globalPlay}
          ></SamplrEditor>
        )}
        {/* {playingLoops.some((loop) => loop !== -1) && (
          <SoundLuuper
            tempo={tempo}
            // playCallback={(rowI, soundI) => playingLoops}
            // stopCallback={(rowI, soundI) => p}
            trackLoops={tracks.map((track) => track.loops)}
            playingLoops={playingLoops}
            playingStatus={playingLoops.some((loop) => loop !== -1)}
            barLength={(1 / tempo) * 60 * 1000 * 8}
            // loopData={playingLoops.map((playingLoop, i) =>
            //   playingLoop !== -1
            //     ? tracks.map((track) => track.loops)[i][playingLoop]
            //     : null
            // )}
            downbeats={tracks[1].props.downbeats}
          />
        )} */}
        {/* {tracks.map((track, i) => {
          if (playingLoops[i] !== -1) {
            return (
              <Sound
                url={
                  "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
                }
                playStatus={tracks.loops[playingLoops[i]].playStatus}
                playFromPosition={sound.startPosition}
                playbackRate={props.globalTempo / props.trackTempo}
              />
            );
          } */}
        })}
      </body>

      <footer></footer>
    </div>
  );
}
export default App;
