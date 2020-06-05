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
import DrumRow from "./DrumRow";
// import { Stage } from "konva/types/Stage";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function DrumEditor(props) {
  const classes = useStyles();
  // const [splits, setSplits] = React.useState(new Array(8).fill(0).map(() => new Array(1).fill(false)));
  // const [drums, setDrums] = React.useState(splits.map())
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

  const Row = ({ index, style }) => (
    <DrumRow
      loopData={props.loop.loopData.filter((n) => n.drumIndex === index)}
      splits={props.splits}
      setSplitCallback={props.setSplitCallback}
      noteCallback={props.noteCallback}
      index={index}
      style={style}
      // notesOn={props.notesOn[index]}
      // setNotesOnCallback={props.setNotesOnCallback}
    />
  );

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="bottom"
      open={props.open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <FixedSizeList height={300} itemCount={props.drums.length} itemSize={60}>
        {Row}
      </FixedSizeList>
    </Drawer>
  );
}
