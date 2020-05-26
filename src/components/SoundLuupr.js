import { Box } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";

export default function SoundLuuper(props) {
  // const classes = useStyles();
  const [canvasData, setCanvasData] = React.useState([]);
  const [downbeats, setDownbeats] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [playIndex, setPlayIndex] = React.useState(0);
  const [noteData, setNoteData] = React.useState([]);

  useEffect(() => {
    setNoteData(
      props.playingLoops
        .map((playingLoop, i) =>
          playingLoop !== -1 ? props.trackLoops[i][playingLoop] : null
        )
        .filter((x) => x !== null)
    );
    // props.tracks.map((track) => track.loops);
    // const timer = setTimeout(() => {
    //   console.log("This will run after 1 second!");
    // }, 1000);
    // return () => clearTimeout(timer);
  }, []);
}
