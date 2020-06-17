import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import SamplrSound from "../components/SamplrSound.js";
import NewMotherfuckingSamplrTable from "../components/NewMotherfuckingSamplrTable.js";
import { white } from "material-ui/styles/colors";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    // padding: theme.spacing(1),
    background: "#111111",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textAlign: "center",
    color: white,
    minHeight: 50,
    border: "1px solid"
  },
  input: {
    display: "none"
  }
}));

export default function SamplrEditor(props) {
  const classes = useStyles();
  const [canvasData, setCanvasData] = React.useState([]);
  const [downbeats, setDownbeats] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const [play, setPlay] = React.useState(false);
  const [playIndex, setPlayIndex] = React.useState(0);

  return (
    <div>
      {props.trackProps.type === "Drum Kit" && <></>}
      {props.trackProps.type === "Samplr" && <> </>}
      {props.trackProps.type === "Sound Bank" && <> </>}
      {props.trackProps.type === "Audio Frame" && <> </>}
    </div>
  );
}
