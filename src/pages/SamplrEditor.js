import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import SamplrSound from "../components/SamplrSound.js";
import NewMotherfuckingSamplrTable from "../components/NewMotherfuckingSamplrTable.js";
import { white } from "material-ui/styles/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    // padding: theme.spacing(1),
    background: "#111111",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textAlign: "center",
    color: white,
    minHeight: 50,
    border: "1px solid",
  },
  input: {
    display: "none",
  },
}));

export default function SamplrEditor(props) {
  const classes = useStyles();
  const [canvasData, setCanvasData] = React.useState([]);
  const [downbeats, setDownbeats] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [playIndex, setPlayIndex] = React.useState(0);

  // useEffect(() => {
  //   var context = new AudioContext();
  //   async function drawAudio() {
  //     props.trackProps.props.file
  //       .arrayBuffer()
  //       .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
  //       .then((audioBuffer) =>
  //         setCanvasData(toPoints(filterData(split(audioBuffer))))
  //       );
  //   }
  //   drawAudio();
  // }, [props.trackProps.props.file]);

  // const filterData = (data) => {
  //   const samples = 80; // Number of samples we want to have in our final data set
  //   return data.map((val, i) => {
  //     const rawData = val; // We only need to work with one channel of data
  //     const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
  //     const filteredData = [];
  //     for (let i = 0; i < samples; i++) {
  //       let blockStart = blockSize * i; // the location of the first sample in the block
  //       let sum = 0;
  //       for (let j = 0; j < blockSize; j++) {
  //         sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
  //       }
  //       filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  //     }
  //     // console.log(filteredData)
  //     return filteredData;
  //   });
  // };

  // const split = (audioBuffer) => {
  //   const rawData = audioBuffer.getChannelData(0);
  //   // const max = Math.max(...rawData);
  //   const downbeats = props.trackProps.props.downbeats.map((beat) =>
  //     Math.round(beat.time * audioBuffer.sampleRate)
  //   );
  //   const sections = [];
  //   for (let index = 0; index < downbeats.length; index++) {
  //     sections.push(rawData.slice(downbeats[index - 1], downbeats[index]));
  //   }
  //   // console.log(sections)
  //   return sections;
  // };

  // const toPoints = (filteredData) => {
  //   return filteredData.map((pane) => {
  //     return pane
  //       .map((val, i) => {
  //         return [val * 200, i];
  //       })
  //       .flat();
  //   });
  // };

  return (
    <div>
      <SamplrSound
        globalTempo={props.tempo}
        trackTempo={props.trackProps.props.tempo}
        trackProps={props.trackProps}
        downbeats={props.trackProps.props.downbeats}
        play={play}
        playIndex={playIndex}
      ></SamplrSound>
      <NewMotherfuckingSamplrTable
        canvasData={props.trackProps.props.canvasData}
        downbeats={props.trackProps.props.downbeats}
        trackProps={props.trackProps}
        stop={() => {setPlayIndex(0); setPlay(false);}}
        play={(i) => {setPlayIndex(i); setPlay(true);}}
      />
      {/* <VertWavCanvas data={props.trackProps.props.file}  downbeats={props.trackProps.props.downbeats} height={80} width={200}></VertWavCanvas> */}
    </div>
  );
}
