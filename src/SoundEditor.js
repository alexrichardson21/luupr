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
import RowEditor from './RowEditor'
// import { Stage } from "konva/types/Stage";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 440,
  },
});

export default function SoundEditor(props) {
  const classes = useStyles();
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
    [notes[rowIndex % notes.length], Math.ceil(rowIndex / notes.length + .00001)].join(
      ""
    );

  const Row = ({ index, style }) => (
    <Grid container style={style}>
      <Button height={60}> Sample {noteGetter(index)} </Button>
      <RowEditor
        width={800}
        height={60}
        addNoteCallback={props.addNoteCallback}
        deleteNoteCallback={props.deleteNoteCallback}
        changeNoteCallback={props.changeNoteCallback}
        notes={props.loop.filter((note) => note.rowNote === noteGetter(index))}
        rowNote={noteGetter(index)}
      />
    </Grid>
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
      <FixedSizeList
        height={300}
        itemCount={props.track.downbeats.length}
        itemSize={60}
      >
        {Row}
      </FixedSizeList>
    </Drawer>
  );
}
