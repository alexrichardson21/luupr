import { ButtonBase, Grid, Paper, TextField, Drawer } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { black, white } from "material-ui/styles/colors";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const drawerWidth = 120;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: drawerWidth,
    // position: "relative",
    // right: -35,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    // position: "fixed",
    // right: -35,
    flexShrink: 0,
    
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "transparent",
    boxShadow: "none",
    borderStyle: 'none',
    

    // background: '#414141',
    // opacity: 0.0,
  },
  button: {
    width: drawerWidth,
    height: 75,
    color: "#717171",
    background: "#212121",
    opacity: 0.75,
    borderRadius: 35,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    marginTop: theme.spacing(1),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  sequence: {
    width: drawerWidth,
    borderRadius: 35,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    height: 75,
    marginBottom: theme.spacing(1),
    
  },
  color0: {

    color: white,
    backgroundColor: "#FF525A",
  },
  // color1: {
  //   color: black,
  //   backgroundColor: "#66AC6A",
  // },
  color1: {
    color: white,
    backgroundColor: "#4778ff",
  },
  color2: {
    color: white,
    backgroundColor: "#a390e4",

    // color: black,
    // backgroundColor: "#FF4D9D",
  },
  color3: {
    color: black,
    backgroundColor: "#FF4D9D",
  },

  
  textInput: {
    width: 75,
  },
}));

export default function PermanentDrawerRight() {
  const classes = useStyles();
  const [patterns, setPatterns] = React.useState(1);

  const patternLayout = Array.from(Array(patterns)).map((_, i) => (
    <Draggable key={i} draggableId={String(i)} index={i}>
      {(provided, snapshot) => (
        <ListItem
          component={Paper}
          className={clsx(
            classes.sequence,
            i % 4 === 0 && classes.color0,
            i % 4 === 1 && classes.color1,
            i % 4 === 2 && classes.color2,
            i % 4 === 3 && classes.color3,
          )}
          key={"Intro"}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <form className={classes.textInput} noValidate autoComplete="off">
            <TextField id="standard-basic" placeholder={"Section " + (i + 1)} />
          </form>
        </ListItem>
      )}
    </Draggable>
  ));

  return (
    <Drawer
      anchor="right"
      className={classes.drawer}
      variant="permanent"

      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Grid container className={classes.root}>
        <CssBaseline />
        <ButtonBase
          onClick={() =>
            patterns < 7 ? setPatterns(patterns + 1) : setPatterns(patterns + 1)
          }
          component={Paper}
          className={classes.button}
        >
          <AddIcon></AddIcon>
        </ButtonBase>
        {/* <Divider /> */}
        <DragDropContext>
          <Droppable
            classname={classes.droppable}
            droppableId="droppable2"
            direction="vertical"
          >
            {(provided, snapshot) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {patternLayout}
              </List>
            )}
          </Droppable>
        </DragDropContext>
        {/* <Divider />*/}
      </Grid>
    </Drawer>
  );
}
