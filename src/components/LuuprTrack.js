import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import LuuprTrackHeader from "./LuuprTrackHeader";
import LoopBubble from "./LoopBubble";
import NewLoopBubble from "./NewLoopBubble";

const useStyles = makeStyles((theme) => ({
  root: {
    verticalAlign: "middle",
    // background: 'linear-gradient(90deg, #515151 20%, #414141 100%)',
    background: '#515151',
    borderRadius: 20,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginRight: 120,
    marginLeft: theme.spacing(2),
    // padding: theme.spacing(25),
  },
  grid: {
    height: 100
  },
  card: {
    minWidth: 100,
    minHeight: 100,
    alignItems: "center",
  },
  LoopBubble: {
    marginLeft: theme.spacing(4),
  },
  droppable: {
    display: "flex",
    padding: 8,
    overflow: "auto",
    alignItems: "center",
  },
}));

export default function LuuprTrack(props) {
  const classes = useStyles();
  const [loops, setLoops] = React.useState(0);

  const parentFunction = () => {
    loops < 6 ? setLoops(loops + 1) : setLoops(loops);
  };

  const callbackFunction = (childData) => {
    this.setState({drumOpen: childData})
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
          <LoopBubble openLoopCallback={props.openLoopCallback}></LoopBubble>
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
        spacing={12}
        alignItems="center"
        className={classes.grid}
      >
        <Grid item>
            <LuuprTrackHeader open={() => props.open()}></LuuprTrackHeader>
        </Grid>

        <Grid item className={classes.LoopBubble}>
          {loops < 6 && (
            <NewLoopBubble
              functionCallFromParent={parentFunction.bind(this)}
            ></NewLoopBubble>
          )}
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
