import React, { Component } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import { TableCell, makeStyles } from "@material-ui/core";
import { white } from "material-ui/styles/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    color: white,
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
  const [patterns, setPatterns] = React.useState(1);

  return (
    <TableCell
      component='div'
      className={classes.canvas}
      style={{ height: props.height, width: props.width }}
    >
      <Stage width={210} height={props.height}>
      <Layer>
        <Line
          x={105}
          y={0}
          points={[0, 0, -90, 10, 100, 20]}
          stroke="white"
        />
      </Layer>
      </Stage>
    </TableCell>
  );
}
