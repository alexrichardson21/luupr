import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Tone from "tone";
import sampleSong from "./drums/song.mp3";
import kick from "./drums/kick.wav";
import snare from "./drums/snare.wav";
import hat from "./drums/hat.wav";

export default function ToneSong(props) {
  // const [tracks, setTracks] = useState([{ load: false }, { load: false }]);
  const sampler = useRef(null);
  const player = useRef(null);
  const transport = useRef(null);
  const [samplrNotes, setSamplrNotes] = useState([
    {
      start: 0,
      offset: 45,
      duration: "1m",
      loaded: false,
    },
    {
      start: "1m",
      offset: 85,
      duration: "2m",
      loaded: false,
    },
    {
      start: "2m",
      offset: 95,
      duration: "1m",
      loaded: false,
    },
    {
      start: "3m",
      offset: 105,
      duration: "1m",
      loaded: false,
    },
  ]);

  const [drumNotes, setDrumNotes] = useState([
    {
      start: 0,
      note: "C3",
      duration: "16n",
    },
    {
      start: "1m",
      note: "D#3",
      duration: "2m",
    },
    {
      start: "2m",
      note: "A3",
      duration: "1m",
    },
  ]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [samplers, setSamplers] = useState(null);
  const [toneDrumKits, setToneDrumKits] 

  useEffect(() => {
    drumKitsLoaded = Array(props.tracks.filter((track) => track.instrument === "Drum Kit").length).fill([])
    props.tracks
      .filter((track) => track.instrument === "Drum Kit")
      .forEach((drumTrack, i) => {
        const a = toneDrumKits.slice()
        a.push(
            new Tone.Sampler(
                drumTrack.drums,
                function () {
                  //sampler will repitch the closest sample
                  console.log("loaded bish");
                }
              )
                .toMaster()
                .sync()
        );
        setToneDrumKits(a);
      });

    // samplrNotes.map((note, i) => {
    //   const player = new Tone.Player(sampleSong, () => {
    //     const a = samplrNotes.slice();
    //     a[i].loaded = true;
    //     setSamplrNotes(samplrNotes);
    //   })
    //     .toMaster()
    //     .sync()
    //     .start(note.start, note.offset, note.duration);
    //   // player.playbackRate = 2;
    // });

    // const drumKit = new Tone.Sampler(
    //   {
    //     C3: kick,
    //     "D#3": snare,
    //     A3: hat,
    //   },
    //   function () {
    //     //sampler will repitch the closest sample
    //     console.log("loaded bish");
    //   }
    // )
    //   .toMaster()
    //   .sync();
    //schedule 3 notes when the transport first starts
    drumNotes.map((note) => {
      drumKit.triggerAttackRelease(note.note, note.duration, note.start);
    });

    Tone.Transport.setLoopPoints(0, "4m");
    Tone.Transport.loop = true;

    transport.current = Tone.Transport;
  }, []);

  const handleClick = () => {
    Tone.Transport.start();
  };

  return (
    <div>
      <button
        disabled={samplrNotes.every((n) => n.loaded)}
        onClick={() => Tone.Transport.start()}
      >
        start
      </button>
      <button onClick={() => Tone.Transport.stop()}>stop</button>
      <button onClick={() => player.current.start(150)}>seek</button>
    </div>
  );
}
