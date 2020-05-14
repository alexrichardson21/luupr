import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import LuuprTrack from "../components/LuuprTrack";
import NewTrackPopup from "../components/NewTrackPopup";

const useStyles = makeStyles((theme) => ({
  luuprPage: {
    display: "flex",
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
  const [tracks, setTracks] = React.useState([]);
  const [drums, setDrums] = React.useState([]);
//   const [openDrawer, toggleDrawer] = React.useState(false);
  const [drumMasterOpen, setDrumMasterOpen] = React.useState(true);
//   const [currPage, setCurrPage] = React.useState(0);
  const [openLoop, setOpenLoop] = React.useState(0);

  // const drumLayout = tracks
  //   .filter((track) => track === "Drum")
  //   .map((track) => (
  //     <Grid item>
  //       <DrumTrackBar></DrumTrackBar>
  //     </Grid>
  //   ));

  const trackLayout = tracks
    // .filter((track) => track !== "Drum")
    .map((track, i) => (
      <Grid item>
        <LuuprTrack>
          openLoopCallback={props.openLoopCallback}
          trackType={track}
          id={i}
        ></LuuprTrack>
      </Grid>
    ));

  return (
    <div className="luuprPage">
      <Grid
        container
        direction="column"
        justify="space-between"
        spacing={24}
        className={clsx(classes.content, {
          [classes.contentShift]: props.openDrawer,
        })}
      >
        <Grid item className="DrumMaster">
          <LuuprTrack
            open={() => setDrumMasterOpen(!drumMasterOpen)}
          ></LuuprTrack>
        </Grid>
        {/* {!drumMasterOpen && drumLayout} */}
        {trackLayout}
        <NewTrackPopup addTrack={(track) => setTracks(tracks.concat([track]))}></NewTrackPopup>
      </Grid>
    </div>
  );
}
