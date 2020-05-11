import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { Box, Card, CardContent } from "@material-ui/core";
import TrackHeader from "./TrackHeader";
import LoopBubble from "./LoopBubble";
import { grey800 } from "material-ui/styles/colors";
import { grey600 } from "material-ui/styles/colors";
import NewLoopBubble from "./NewLoopBubble";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: "middle",
    // background: 'linear-gradient(90deg, #515151 20%, #414141 100%)',
    background: '#515151',
    borderRadius: 20,
    marginTop: 15,
    marginRight: 15,
    marginLeft: 45,
    // padding: theme.spacing(25),
  },
  card: {
    minWidth: 100,
    minHeight: 100,
    alignItems: "center",
  },
  LoopBubble: {
    marginLeft: theme.spacing(5),
  },
  droppable: {
    display: "flex",
    padding: 8,
    overflow: "auto",
    alignItems: "center",
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [loops, setLoops] = React.useState(0);

  const parentFunction = () => {
    // console.log('this is happening')
    loops < 6 ? setLoops(loops + 1) : setLoops(loops);
  };

  const bubbleLayout = [...Array(loops).keys()].map((item) => (
    // <Grid item className={classes.LoopBubble}>
    <Draggable key={item} draggableId={String(item)} index={item}>
      {(provided, snapshot) => (
        <Grid
          item
          className={classes.LoopBubble}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // style={getItemStyle(
          //   snapshot.isDragging,
          //   provided.draggableProps.style
          // )}
        >
          <LoopBubble></LoopBubble>
        </Grid>
      )}
    </Draggable>
    // </Grid>
  ));

  return (
    <Paper justify="center" className={classes.root}>
      <Grid
        justify="left" // Add it here :)
        container
        spacing={24}
        alignItems="center"
      >
        <Grid item>
          <TrackHeader></TrackHeader>
        </Grid>

        <Grid item className={classes.LoopBubble}>
          {loops < 6 ? (
            <NewLoopBubble
              functionCallFromParent={parentFunction.bind(this)}
            ></NewLoopBubble>
          ) : undefined}
        </Grid>

        <Grid item>
          <DragDropContext>
            <Droppable
              classname={classes.droppable}
              droppableId="droppable1"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <Grid
                  container
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {bubbleLayout}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>
    </Paper>
  );
}
