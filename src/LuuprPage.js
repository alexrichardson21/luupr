import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import LuuprTrack from "./LuuprTrack";
import NewTrackDialog from "./NewTrackDialog";
// import clsx from "clsx";
import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  luuprPage: {
    display: "flex",
  },
}));

export default function LuuprPage(props) {
  const classes = useStyles();
  // const [tracks, setTracks] = React.useState([{ type: "Drum", props: {} }]);
  const [newTrackPopup, setNewTrackPopup] = React.useState(false);
  const [isOpenTrackDialog, setIsOpenTrackDialog] = React.useState(false);
  const [currTrackId, setCurrTrackId] = React.useState(-1);


  return (
    <div className="luuprPage">
      <Table>
        <TableBody>
          {props.tracks.map((track, i) => {
            return (
              <TableRow>
                <TableCell>
                  {/* <DrumMaster/> */}
                  <LuuprTrack
                    playLoopCallback={props.playLoopCallback}
                    openLoopCallback={props.openLoopCallback}
                    newLoopCallback={props.newLoopCallback}
                    // openNewDrumDialogCallback={(trackId) => {
                    //   setCurrTrackId(trackId); setIsOpenDrumDialog(true);
                    // }}
                    newDrumCallback={props.newDrumCallback}
                    trackId={i}
                    type={track.type}
                    instrument={track.instrument}
                    loops={track.loops}
                  />
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow>
            <TableCell>
              <Button onClick={() => setIsOpenTrackDialog(true)}>
                New Track
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <NewTrackDialog
        open={isOpenTrackDialog}
        closeCallback={() => setIsOpenTrackDialog(false)}
        newTrackCallback={props.newTrackCallback}
        // drumDialogCallback={() => setIsOpenDrumDialog(true)}
      />
    </div>
  );
}
