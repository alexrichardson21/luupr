import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Tone from "tone";
import sampleSong from "./drums/song.mp3";
import kick from "./drums/kick.wav";
import snare from "./drums/snare.wav";
import hat from "./drums/hat.wav";

export default function SoundEngine(props) {
  const [samplers, setSamplers] = useState(null);
  const [players, setPlayers] = useState(null);

  const [loadedSamplers, setLoadedSamplers] = useState(false);
  const [loadedPlayers, setLoadedPlayers] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log("FX: set transport loop");
    Tone.Transport.setLoopPoints(0, "1m");
    Tone.Transport.loop = true;
  }, []);

  useEffect(() => {
    console.log(props.drumTracks);   
    setLoadedSamplers(0);
    if (props.drumTracks && props.drumTracks.length) {
      console.log("FX: new samplers");
      const playingTracks = props.drumTracks.filter((t) => t.play);
      const toneSamplers = playingTracks.map((track) => {
        return new Tone.Sampler(track.drums, function () {
          console.log("loaded drums");
          setLoadedSamplers((x) => x + 1);
        })
          .toMaster()
          .sync();
      });

      playingTracks.forEach((track, i) => {
        track.loops[track.playingLoop].loopData.forEach((note) => {
          toneSamplers[i].triggerAttackRelease(
            note.rowNote,
            note.duration,
            note.start
          );
        });
      });

      setSamplers(
        playingTracks.map((track, i) => {
          return {
            trackIndex: track.trackId,
            toneSampler: toneSamplers[i],
          };
        })
      );
    }
  }, [props.drumTracks]);

  useEffect(() => {
    setLoadedPlayers(0);
    console.log(props.samplrTracks);

    if (props.samplrTracks && props.samplrTracks.length) {
      console.log("FX: new players");
      setPlayers(
        props.samplrTracks.map((track) => {
          return {
            trackIndex: track.trackId,
            tonePlayers: track.loops[track.playingLoop].loopData.slice().map((note) => {
              const a = new Tone.Player(
                new Tone.Buffer(track.sampleUrl),
                function () {
                  console.log("loaded sample");
                  setLoadedPlayers((count) => count + 1);
                }
              );
              a.fadeIn = 0.001;
              a.fadeOut = 0.001;
              a.playbackRate = track.tempo / 120;
              // a.playbackRate = .75;

              return a
                .toMaster()
                .sync()
                .start(note.start, note.offset)
                .stop(note.start + note.duration);
            }),
          };
        })
      );
    }
  }, [props.samplrTracks]);

  useEffect(() => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // if (loadedPlayers)
    
    if (props.samplrTracks && props.samplrTracks.length) {
        console.log('WTFFFFF');
     props.setIsLoadedCallback(
        loadedPlayers ===
          props.samplrTracks
            //   .filter((t) => t.play)
            .map((t) => Object.keys(t.loops[t.playingLoop].loopData).length)
            .reduce(reducer)
      );
    }
    if (props.drumTracks && props.drumTracks.length) {
    console.log('uyeaerf')
      props.setIsLoadedCallback(
        loadedSamplers ===
          props.drumTracks
            //   .filter((t) => t.play)
            .map((t) => Object.keys(t.drums).length)
            .reduce(reducer)
      );
    }
  }, [props.samplrTracks, props.drumTracks, loadedPlayers, loadedSamplers]);

  useEffect(() => {
    if (props.isPlaying) {
        Tone.Transport.start()
    } else {
        Tone.Transport.stop()
    }
  }, [props.isPlaying])
  return null
//   return (
//     <div>
//       <button disabled={!loaded} onClick={() => }>
//         start
//       </button>
//       <button onClick={() => }>stop</button>
//     </div>
//   );
}
