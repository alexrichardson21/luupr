import React, { Component, useEffect } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import {
  TableCell,
  makeStyles,
  ButtonBase,
  Paper,
  TableContainer,
  TableHead,
} from "@material-ui/core";
import { white } from "material-ui/styles/colors";
import { TableRow, Table, TableBody } from "material-ui";
const useStyles = makeStyles((theme) => ({
  // root: {
  //   color: white,
  // },
  root: {
    // width: "100%",
    position: 'relative',
    left: -15,
    width: 200,
  },
  container: {
    maxHeight: 440,
  },
  canvas: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    backgroundColor: "#313131",
    flex: 1,
  },
}));

export default function VertWavCanvas(props) {
  const classes = useStyles();
  const [canvasData, setCanvasData] = React.useState([]);


  return (
    <div >
      <ButtonBase onMouseDown={() => props.play(props.rowIndex)} onMouseUp={() => props.stop()} className={classes.root}>
        <Stage width={200} height={props.height}>
          <Layer>
            <Line x={100} y={0} points={props.data} stroke="white" />
          </Layer>
        </Stage>
      </ButtonBase>
    </div>
  );
}
