import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import LuuprTrack from "../components/LuuprTrack";
import NewTrackPopup from "../components/NewTrackPopup";
import FileUpload from "../components/FileUpload";
import AddIcon from "@material-ui/icons/Add";
import { Paper, Button } from "@material-ui/core";
import LoadingTrack from './../components/LoadingTrack'

const useStyles = makeStyles((theme) => ({
  luuprPage: {
    display: "flex",
  },
  newTrackPaper: {
    borderRadius: 20,
    // marginTop: 15,
    marginRight: 160,
    marginLeft: theme.spacing(2),
    height: 100,
    color: "#717171",
    background: "#212121",
    opacity: 0.75,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    height: 100,
    // width: 400,
  },
  paper: {
    // padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 50,
  },
  content: {
    // flexGrow: 1,
    // padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
    marginRight: 70,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
}));

export default function LuuprPage(props) {
  const classes = useStyles();
  // const [tracks, setTracks] = React.useState([{ type: "Drum", props: {} }]);
  const [newTrackPopup, setNewTrackPopup] = React.useState(false);
  const [openFilePopup, setOpenFilePopup] = React.useState(false);
  const [trackLoading, setTrackLoading] = React.useState(false);

  const trackLayout = props.tracks
    // .filter((track) => track !== "Drum")
    .map((track, i) => (
      <Grid item>
        <LuuprTrack
          newLoopCallback={props.newLoopCallback}
          openLoopCallback={props.openLoopCallback}
          trackType={track.type}
          trackProps={track.props}
          trackLoops={track.loops}
          playingLoops={props.playingLoops}
          playLoopCallback={props.playLoopCallback}
          stopLoopCallback={props.stopLoopCallback}
          id={i}
        ></LuuprTrack>
      </Grid>
    ));

  const newTrack = (
    <Paper className={classes.newTrackPaper}>
      <Button
        fullWidth
        className={classes.button}
        onClick={() => setNewTrackPopup(true)}
      >
        <AddIcon htmlColor="#717171"></AddIcon>
      </Button>
    </Paper>
  );

  return (
    <div className="luuprPage">
      {/* TRACK LAYOUT */}
      <Grid
        container
        direction="column"
        justify="space-between"
        spacing={24}
        className={clsx(classes.content, {
          [classes.contentShift]: props.openDrawer,
        })}
      >
        {trackLayout}
        {trackLoading && (<LoadingTrack></LoadingTrack>)}
        {newTrack}
      </Grid>

      {/* NEW TRACK STUFF */}
      <NewTrackPopup
        addTrack={props.addTrack}
        newTrackClose={() => setNewTrackPopup(false)}
        fileOpenCallback={() => setOpenFilePopup(true)}
        open={newTrackPopup}
        loadingCallback={(status) => setTrackLoading(status)}
      ></NewTrackPopup>
    </div>
  );
}
