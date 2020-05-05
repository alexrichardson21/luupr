import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import { blue200 } from "material-ui/styles/colors";
import PlayIcon from "@material-ui/icons/PlayArrow";
import { green100 } from "material-ui/styles/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 35,
    minWidth: 100,
    minHeight: 100,
    // alignItems: "center",
    // justifyItems: "center",
    background: blue200,
  },
  play: {
    borderRadius: 35,
    minWidth: 100,
    minHeight: 100,
    // alignItems: "center",
    background: green100,
  },
}));

export default function LoopBubble() {
  const classes = useStyles();
  const [isShown, setIsShown] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);

  return (
    <div>
      {isPlaying ? (
        <Card
          className={classes.play}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isShown && (
            <CardContent>
              <StopIcon></StopIcon>
            </CardContent>
          )}
        </Card>
      ) : (
        <Card
          className={classes.card}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isShown && (
            <CardContent>
              <PlayIcon></PlayIcon>
              <Typography>4 Bars</Typography>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
}
