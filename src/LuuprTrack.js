import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
import React from "react";
import { Button } from "@material-ui/core";
import NewDrumDialog from "./NewDrumDialog";

const useStyles = makeStyles((theme) => ({
  luuprPage: {
    display: "flex",
  },
}));

export default function LuuprTrack(props) {
  const classes = useStyles();
  const [isOpenDrumDialog, setIsOpenDrumDialog] = React.useState(false);

  return (
    <div>
      {props.instrument === "Drum Kit" && (
        <div>
          <Button onClick={() => setIsOpenDrumDialog(true)}> new drum </Button>
          <NewDrumDialog
            trackId={props.trackId}
            open={isOpenDrumDialog}
            closeCallback={() => {
              setIsOpenDrumDialog(false);
            }}
            newDrumCallback={props.newDrumCallback}
          />
        </div>
      )}
      {props.instrument === "Samplr" && (
        <div>
          <Button> change sample </Button>
          <Button> change slice duration </Button>
        </div>
      )}
      {props.instrument === "Synthesizr" && (
        <div>
          <Button> change preset </Button>
        </div>
      )}

      {props.loops.map((loop, i) => {
        return (
          <div>
            <Button onClick={() => props.openLoopCallback(props.trackId, i)}>
              change loop
            </Button>{" "}
            <Button onClick={() => props.playLoopCallback(props.trackId, i)}>
              {" "}
              play loop{" "}
            </Button>
          </div>
        );
      })}

      <Button onClick={() => props.newLoopCallback(props.trackId)}>
        {" "}
        new loop{" "}
      </Button>
    </div>
  );
}
