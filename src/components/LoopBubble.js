import { Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PlayIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import { blue200, green200 } from "material-ui/styles/colors";
import React from "react";
import useClickPreventionOnDoubleClick from "../doubleclick/use-click-prevention-on-double-click";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 25,
    width: 60,
    height: 60,
    alignItems: "center",
    // justifyItems: "center",
    background: '#818181',
  },
  play: {
    borderRadius: 25,
    width: 60,
    height: 60,
    alignItems: "center",
    background: green200,
  },
  cardContent: {
    alignItems: 'center',
  }
}));

export default function LoopBubble(props) {
  const classes = useStyles();
  const [isShown, setIsShown] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const annoying = () => {
    props.playingLoops[props.trackId] !== props.id ?
    props.playLoopCallback(props.trackId, props.id) :
    props.stopLoopCallback(props.trackId)
    // setIsPlaying(!isPlaying); 
  }

  const gay = () => {
    props.openLoopCallback({trackId: props.trackId, loopId: props.id});
    setOpen(true);
  }

  const ClickableCard = ({ onClick, onDoubleClick }) => {
    const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
      onClick,
      onDoubleClick
    );

    return (
      <Card
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        className={props.playingLoops[props.trackId] === props.id ? classes.play : classes.card}
      >
        {isShown && (
          <CardContent>
            {props.playingLoops[props.trackId] === props.id ? (
              <div className={classes.cardContent}>
                <StopIcon ></StopIcon>
              </div>
            ) : (
              <div className={classes.cardContent}>
                
                <PlayIcon htmlColor='#515151'></PlayIcon>

              </div>
            )}
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div>
      <ClickableCard
        onClick={annoying}
        onDoubleClick={gay}
      />
    </div>
  );
}
