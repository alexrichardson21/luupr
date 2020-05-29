import React from "react";
import { Song, Track, Instrument } from "reactronica";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import logo from "./logo.svg";
import LuuprPage from "./LuuprPage";
import SoundEditor from "./SoundEditor";
import api from "./SonicApiSample.json";

// import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [tracks, setTracks] = React.useState([
    {
      type: "synth",
      instrument: 'Drum Kit',
      play: false,
      playingLoop: -1,
      loops: [],
      drums: [],
    },
  ]);
  // const [drums, setDrums] = React.useState([]);
  const [globalTempo, setGlobalTempo] = React.useState(120);
  const [openLoop, setOpenLoop] = React.useState(null);
  // const [playingLoops, setPlayingLoops] = React.useState([]);
  const [globalScale, setGlobalScale] = React.useState({
    root: "C",
    minor: false,
  });
  const [luuprMode, setLuuprMode] = React.useState(true);

  const notesToSteps = (loop) => {
    const steps = new Array(8).fill(0).map(() => new Array(0).fill(0));
    console.log(steps);

    loop.forEach((note) => {
      const i = Math.floor(note.start * 8);

      steps[i].push({
        name: note.rowNote,
        duration: note.end - note.start,
        velocity: 100,
      });
    });
    console.log(steps);
    return steps;
  };

  const song = (
    <Song bpm={globalTempo} isPlaying={isPlaying}>
      {tracks
        .filter((track) => track.play)
        .map((track) => {
          return (
            <Track steps={notesToSteps(track.loops[track.playingLoop])}>
              <Instrument type={track.type} />
            </Track>
          );
        })}
    </Song>
  );

  return (
    <div className="App">
      {song}

      <header className="App-header">
        <Header
          globalTempo={globalTempo}
          globalScale={globalScale}
          playCallback={() => setIsPlaying(true)}
          stopCallback={() => setIsPlaying(false)}
          toggleLuuprModeCallback={() => setLuuprMode(!luuprMode)}
        />
      </header>

      <Sidebar />

      <body>
        {luuprMode && (
          <LuuprPage
            tracks={tracks}
            playLoopCallback={(trackId, loopId) => {
              const a = tracks.slice();
              a[trackId].play = true;
              a[trackId].playingLoop = loopId;
              setTracks(a);
            }}
            openLoopCallback={(trackId, loopId) => {
              setOpenLoop({ trackId: trackId, loopId: loopId });
            }}
            newLoopCallback={(trackId) => {
              const a = tracks.slice();
              a[trackId].loops.push([]);
              setTracks(a);
            }}
            newTrackCallback={(mayonaise) => {
              setTracks(
                tracks.concat([
                  {
                    type: "synth",
                    instrument: mayonaise,
                    play: false,
                    playingLoop: -1,
                    loops: [],
                    tempo: api["auftakt_result"]["overall_tempo"],
                    downbeats: api["auftakt_result"]["click_marks"].filter(
                      (click) => {
                        return click.downbeat === "true";
                      }
                    ),
                  },
                ])
              );
            }}
            newDrumCallback={(trackId, drum) => {
              const a = tracks.slice()
              tracks[trackId].drums.push(drum)
              setTracks(a)
            }}
          />
        )}

        {openLoop && (
          <SoundEditor
            track={tracks[openLoop.trackId]}
            loop={tracks[openLoop.trackId].loops[openLoop.loopId]}
            open={openLoop !== null}
            openLoop={openLoop}
            addNoteCallback={(note) => {
              let a = tracks.slice();
              note.id = a[openLoop.trackId].loops[openLoop.loopId].length;
              console.log(note);
              a[openLoop.trackId].loops[openLoop.loopId].push(note);
              console.log(a);
              setTracks(a);
            }}
            changeNoteCallback={(index, newNote) => {
              let a = tracks.slice();
              newNote.id = index;
              a[openLoop.trackId].loops[openLoop.loopId][index] = newNote;
              setTracks(a);
            }}
            deleteNoteCallback={(index) => {
              let a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId].splice(index, 1);
              setTracks(a);
            }}
          />
        )}
      </body>
    </div>
  );
}

export default App;
