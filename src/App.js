import React from "react";
import { Song, Track, Instrument } from "reactronica";
import Header from "./Header";
import Sidebar from "./Sidebar";
// import logo from "./logo.svg";
import LuuprPage from "./LuuprPage";
// import SoundEditor from "./SoundEditor";
import api from "./SonicApiSample.json";
import DrumEditor from "./DrumEditor";
import sampleSong from "./drums/song.mp3";
import SoundEngine from "./SoundEngine";
import { Buffer } from "tone";

// import "./App.css";

function App() {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [tracks, setTracks] = React.useState([
    {
      trackId: 0,
      type: "sampler",
      instrument: "Drum Kit",
      play: false,
      playingLoop: -1,
      loops: [],
      drums: {},
    },
  ]);
  const [globalTempo, setGlobalTempo] = React.useState(120);
  const [openLoop, setOpenLoop] = React.useState(null);
  const [globalScale, setGlobalScale] = React.useState({
    root: "C",
    minor: false,
  });
  const [luuprMode, setLuuprMode] = React.useState(true);

  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const noteGetter = (rowIndex) =>
    [
      notes[rowIndex % notes.length],
      Math.ceil(rowIndex / notes.length + 0.00001),
    ].join("");

  return (
    <div className="App">
      {
        <SoundEngine
          isPlaying={isPlaying}
          drumTracks={tracks
            .filter((t) => t.play)
            .filter((track) => track.instrument === "Drum Kit")}
          samplrTracks={tracks
            .filter((t) => t.play)
            .filter((track) => track.instrument === "Samplr")}
          setIsLoadedCallback={(val) => setIsLoaded(val)}
        />
      }

      <header className="App-header">
        <Header
          globalTempo={globalTempo}
          globalScale={globalScale}
          isLoaded={isLoaded}
          playCallback={() => setIsPlaying(true)}
          stopCallback={() => setIsPlaying(false)}
          toggleLuuprModeCallback={() => setLuuprMode(!luuprMode)}
        />
      </header>

      {/* <Sidebar /> */}

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
              a[trackId].loops.push({
                loopData: [],
                splits: [],
              });
              setTracks(a);
            }}
            newTrackCallback={(mayonaise) => {
              setTracks(
                tracks.concat([
                  {
                    trackId: tracks.length,
                    type: "player",
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
                    url: sampleSong,
                  },
                ])
              );
            }}
            newDrumCallback={(trackId, drum) => {
              const len = Object.keys(tracks[trackId].drums).length;
              const a = tracks.slice();
              a[trackId].drums[noteGetter(len)] = new Buffer(drum);
              setTracks(a);
            }}
          />
        )}

        {openLoop && tracks[openLoop.trackId].instrument === "Drum Kit" && (
          <DrumEditor
            track={tracks[openLoop.trackId]}
            loop={tracks[openLoop.trackId].loops[openLoop.loopId]}
            drums={Object.values(tracks[openLoop.trackId].drums)}
            open={openLoop !== null}
            openLoop={openLoop}
            splits={tracks[openLoop.trackId].loops[openLoop.loopId].splits}
            setSplitCallback={(newSplit, eighthIndex, drumIndex) => {
              const a = tracks.slice();

              const sameSplit = a[openLoop.trackId].loops[
                openLoop.loopId
              ].splits.findIndex(
                (s) =>
                  s.eighthIndex === eighthIndex && s.drumIndex === drumIndex
              );
              if (sameSplit === -1) {
                a[openLoop.trackId].loops[openLoop.loopId].splits.push({
                  drumIndex: drumIndex,
                  eighthIndex: eighthIndex,
                  split: newSplit,
                });
              } else {
                a[openLoop.trackId].loops[openLoop.loopId].splits.splice(
                  sameSplit,
                  1,
                  {
                    drumIndex: drumIndex,
                    eighthIndex: eighthIndex,
                    split: newSplit,
                  }
                );
              }

              a[openLoop.trackId].loops[openLoop.loopId].loopData = a[
                openLoop.trackId
              ].loops[openLoop.loopId].loopData.filter(
                (n) =>
                  n.drumIndex !== drumIndex || n.eighthIndex !== eighthIndex
              );

              setTracks(a);
            }}
            noteCallback={(note, drumIndex, buttonIndex, splitIndex) => {
              let a = tracks.slice();

              const samenote = a[openLoop.trackId].loops[
                openLoop.loopId
              ].loopData.findIndex(
                (b) =>
                  b.drumIndex === drumIndex &&
                  b.eighthIndex === buttonIndex &&
                  b.splitIndex === splitIndex
              );

              if (samenote !== -1) {
                a[openLoop.trackId].loops[openLoop.loopId].loopData.splice(
                  samenote,
                  1
                );
              } else {
                a[openLoop.trackId].loops[openLoop.loopId].loopData.push(note);
              }

              setTracks(a);
            }}
          />
        )}

        {/* {openLoop && tracks[openLoop.trackId].instrument === "Samplr" && (
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
        )} */}
      </body>
    </div>
  );
}

export default App;
