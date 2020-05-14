import { ButtonBase, Grid, Paper, TextField } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import { black, white } from "material-ui/styles/colors";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const drawerWidth = 130;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: drawerWidth,
    position: "fixed",
    right: -35,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "transparent",
    boxShadow: "none",

    // background: '#414141',
    // opacity: 0.0,
  },
  button: {
    width: drawerWidth,
    height: 75,
    color: "#717171",
    background: "#212121",
    opacity: 0.5,
    borderRadius: 35,
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

    height: 75,
    marginBottom: theme.spacing(1),
    borderRadius: 35,
  },
  color0: {
    color: black,
    backgroundColor: "#C2F9BB",
  },
  color1: {
    color: white,
    backgroundColor: "#FF525A",
  },
  color2: {
    color: black,
    backgroundColor: "#59C3C3",
  },
  color3: {
    color: black,
    backgroundColor: "#FF8E72",
  },
  textInput: {
    width: 75,
  },
}));

export default function PermanentDrawerRight() {
  const classes = useStyles();
  const [patterns, setPatterns] = React.useState(0);

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
            i % 4 === 3 && classes.color3
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
    <Grid container className={classes.root}>
      <CssBaseline />
      {/* <Button className={classes.button}>
        <AddIcon></AddIcon>
        </Button> */}
      {/* <Paper
        className={classes.drawerPaper}
      
      > */}
      {/* <div className={classes.toolbar} /> */}
      <ButtonBase
        onClick={() =>
          patterns < 7 ? setPatterns(patterns + 1) : setPatterns(patterns)
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
      {/* <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      {/* </Paper> */}
    </Grid>
  );
}
