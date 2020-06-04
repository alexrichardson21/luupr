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
  const [tracks, setTracks] = React.useState([
    {
      trackId: 0,
      type: "sampler",
      instrument: "Drum Kit",
      play: false,
      playingLoop: -1,
      loops: [],
      drums: {},
      // splits: [[1,1,1,1,1,1,1,1]]
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
    const steps = new Array(8 * 128).fill(0).map(() => new Array(0).fill(0));
    // console.log(steps);

    loop.forEach((note) => {
      const i = Math.floor(note.start * 8 * 128);

      steps[i].push({
        name: note.rowNote,
        duration: note.end - note.start * 128,
        velocity: 100,
      });
    });
    console.log(steps);
    return steps.map((e) => (e === [] ? null : e));
  };
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

  // const toSamples = (drums) => {
  //  const a = []
  //  drums.forEach((drum, i) => a.push(noteGetter(i)))
  //  return Object.fromEntries(a.map(function(e, i) {return [e, drums[i]];}));
  // }

  // const song = (
  //   <Song bpm={globalTempo * 128} isPlaying={isPlaying}>
  //     {tracks
  //       .filter((track) => track.play)
  //       .filter((track) => track.type !== 'sampler')
  //       .map((track) => {
  //         return (
  //           <Track steps={notesToSteps(track.loops[track.playingLoop])}>
  //             <Instrument type={track.type} />
  //           </Track>
  //         );
  //       })}
  //     {tracks
  //       .filter((track) => track.play)
  //       .filter((track) => track.type === 'sampler')
  //       .map((track) => {
  //         return (
  //           <Track steps={notesToSteps(track.loops[track.playingLoop])}>
  //             <Instrument type={track.type} onLoad={() => console.log('loaded')} samples={toSamples(track.drums)}/>
  //           </Track>
  //         );
  //       })}
  //   </Song>
  // );

  return (
    <div className="App">
      {/* {song} */}

      {/* <ToneSong tracks={tracks} /> */}
      {
        <SoundEngine
          drumTracks={tracks
            .filter((t) => t.play)
            .filter((track) => track.instrument === "Drum Kit")}
          samplrTracks={tracks
            .filter((t) => t.play)
            .filter((track) => track.instrument === "Samplr")}
        />
      }

      <header className="App-header">
        <Header
          globalTempo={globalTempo}
          globalScale={globalScale}
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
                splits: new Array(Object.keys(a[trackId].drums).length).fill([1, 1, 1, 1, 1, 1, 1, 1]),
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
              a[trackId].loops.map((loop) =>
                loop.splits.push([1, 1, 1, 1, 1, 1, 1, 1])
              );
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
            setSplitCallback={(newSplit, buttonIndex, drumIndex) => {
              const a = tracks.slice();
              a[openLoop.trackId].loops[openLoop.loopId].splits[drumIndex][
                buttonIndex
              ] = newSplit;
              a[openLoop.trackId].loops[openLoop.loopId].loopData = a[
                openLoop.trackId
              ].loops[openLoop.loopId].loopData.filter(
                (n) =>
                  n.drumIndex !== drumIndex && n.buttonIndex !== buttonIndex
              );
              // console.log(a);
              setTracks(a);
            }}
            // setNoteDataCallback={(noteData) => {
            //   let a = tracks.slice();
            //   let b = a[openLoop.trackId].loops[openLoop.loopId].filter(
            //     (n) => n.buttonIndex !== noteData.buttonIndex
            //   );
            //   console.log(noteData);
            //   console.log(b);
            //   b.push(noteData);
            //   // note.id = a[openLoop.trackId].loops[openLoop.loopId].length;
            //   setTracks(a);
            // }}
            // setLoopCallback={(newLoop) => {
            //   const a = tracks.slice();
            //   a[openLoop.trackId].loops[openLoop.loopId] = newLoop;
            //   setTracks(a);
            // }}
            noteCallback={(note) => {
              let a = tracks.slice();
              note.id =
                a[openLoop.trackId].loops[openLoop.loopId].loopData.length;
              const samenote = a[openLoop.trackId].loops[
                openLoop.loopId
              ].loopData.findIndex((b) => b.start === note.start);
              console.log(note);
              if (samenote !== -1) {
                a[openLoop.trackId].loops[openLoop.loopId].loopData.splice(
                  samenote
                );
              } else {
                a[openLoop.trackId].loops[openLoop.loopId].loopData.push(note);
              }
              console.log(a);
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
