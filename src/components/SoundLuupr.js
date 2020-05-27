import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import Sound from "react-sound";

export default function SoundLuuper(props) {
  // const classes = useStyles();
  const [canvasData, setCanvasData] = React.useState([]);
  const [downbeats, setDownbeats] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [playIndex, setPlayIndex] = React.useState(0);
  const [noteData, setNoteData] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [playStatuses, setPlayStatuses] = React.useState([]);

  useEffect(() => {
    // props.loopData[1].map((data, index) =>

    // )
    if (props.playingStatus) {
      const b = setTimeout(() => {
        props.trackLoops[1][props.playingLoops[1]].forEach((note, i) => {
          setTimeout(() => {
            console.log(note);
            const a = playStatuses.slice();
            a.push(i);
            setPlayStatuses(a);
            // set(<SomeSound playStatus={true} index={index} />);
          }, props.barLength * note.start);
          setTimeout(() => {
            console.log("end");
            const a = playStatuses.slice();
            a.splice(a.indexOf(i), 1);
            setPlayStatuses(a);
            // props.stopCallback(rowIndex, soundIndex)
          }, props.barLength * note.end);
        });
        // props.loopData[1].forEach((a, rowIndex) => {
        //   a.forEach((data, soundIndex) => {
        //     console.log(a);
        //     if (data) {
        //       setTimeout(() => {
        //         console.log("start");
        //         // props.playCallback(rowIndex, soundIndex)
        //         // return <SomeSound playStatus={true} index={index}/>;
        //       }, props.barLength * data.start);
        //       setTimeout(() => {
        //         console.log("end");
        //         // props.stopCallback(rowIndex, soundIndex)
        //       }, props.barLength * data.end);
        //       // clearTimeout(starttimer)
        //       // clearTimeout(endtimer)
        //     }
        //   });
        // });
        console.log("interval end");
      }, props.barLength);
    }
    // if (props.loopData.every((val) => val === null)) {
    //   clearInterval(b);
    // }

    // const timer = setTimeout(() => {

    //   console.log("This will run after 1 bar!");
    //   setCount(count+1)
    // }, (props.barLength))
    // props.tracks.map((track) => track.loops);
    // const timer = setTimeout(() => {
    //   console.log("This will run after 1 second!");
    //   setCount(count + 1);
    // }, 1000);
    // return () => clearTimeout(timer);
  }, [
    props.playingLoops,
    props.barLength,
    props.trackLoops,
    props.playingStatus,
    playStatuses,
  ]);
  return (
    <div>
      {props.playingStatus ? (
        props.trackLoops[1][props.playingLoops[1]].map((loop, i) => {
          return (
            <Sound
              autoLoad={true}
              url={
                "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3"
              }
              // url={String(url) + '?' + String(urlProps)}
              playFromPosition={props.downbeats[loop.noteIndex].time * 1000}
              // onPlaying={({ position }) => setPosition(position)}
              playStatus={
                playStatuses.some((status) => status === i)
                  ? "PLAYING"
                  : "STOPPED"
              }
              // playbackRate={props.tempo / props.trackTempo}
              playbackRate={1}
              // onBufferChange={() => console.log("fuckabuffa")}
            />
          );
        })
      ) : (
        <div></div>
      )}
    </div>
  );
}
