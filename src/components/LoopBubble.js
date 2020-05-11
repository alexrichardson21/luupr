import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Box, Container } from "@material-ui/core";
import StopIcon from "@material-ui/icons/Stop";
import { blue200 } from "material-ui/styles/colors";
import PlayIcon from "@material-ui/icons/PlayArrow";
import { green200 } from "material-ui/styles/colors";
import useClickPreventionOnDoubleClick from "../doubleclick/use-click-prevention-on-double-click";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 35,
    minWidth: 100,
    minHeight: 100,
    alignItems: "center",
    // justifyItems: "center",
    background: blue200,
  },
  play: {
    borderRadius: 35,
    minWidth: 100,
    minHeight: 100,
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

  const annoying = () => {
    setIsPlaying(!isPlaying); 
    props.playCallback();
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
        className={isPlaying ? classes.play : classes.card}
      >
        {isShown && (
          <CardContent>
            {isPlaying ? (
              <div className={classes.cardContent}>
                <StopIcon></StopIcon>
              </div>
            ) : (
              <div className={classes.cardContent}>
                
                <PlayIcon></PlayIcon>

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
        onDoubleClick={() => props.openLoopCallback(1)}
      />
    </div>
  );
}
