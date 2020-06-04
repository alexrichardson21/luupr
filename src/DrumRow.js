import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TableRow from "@material-ui/core/TableRow";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { FixedSizeList } from "react-window";
import { Button, TableCell, Grid, ButtonBase } from "@material-ui/core";
import RowEditor from "./RowEditor";
import SeperableButton from "./SeperableButton";
// import { Stage } from "konva/types/Stage";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function DrumRow(props) {
  const classes = useStyles();
//   const [splits, setSplits] = React.useState(
//     new Array(8).fill(0).map(() => new Array(1).fill(false))
//   );
  // const [drums, setDrums] = React.useState(splits.map())
//   React.useEffect(() => {
//     const a = splits.map((x, i) => x.map((split) => {

//     });
//     props.setNotesCallback(props.index, a)
//   }, [splits])

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
    <Grid container style={props.style}>
      <Button height={60}> Sample {noteGetter(props.index)} </Button>
      {new Array(8).fill(0).map((_, i) => {
        return (
          <SeperableButton
            index={i}
            setSplitCallback={props.setSplitCallback}
            // rowIndex={props}
            loopData={props.loopData.filter(n => n.buttonIndex === i)}
            width={80}
            drumIndex={props.index}
            rowNote={noteGetter(props.index)}
            split={props.splits[i]}
            // changeSplitCallback={(size) => {
            //   const a = splits.slice();
            //   a[i] = new Array(size).fill(false);
            //   setSplits(a);
            // }}
            // toggleNoteCallback={(splitIndex) => {
            //   const a = splits.slice();
            //   a[i][splitIndex] = !a[i][splitIndex];
            //   setSplits(a);
            // }}
            start={64 * i}
            duration={64}
            noteCallback={props.noteCallback}

            setNoteDataCallback={props.setNoteDataCallback}
          />
        );
      })}
    </Grid>
  );
}
