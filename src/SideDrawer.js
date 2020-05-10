import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import StopIcon from "@material-ui/icons/Stop";
import PlayIcon from "@material-ui/icons/PlayArrow";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
// import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { Input, Card, CardContent, Grid } from "@material-ui/core";
import { grey900, white, black } from "material-ui/styles/colors";
import { grey400 } from "material-ui/styles/colors";
import { fullWhite } from "material-ui/styles/colors";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  droppable: {
    display: "flex",
    padding: 8,
    overflow: "auto",
    alignItems: "center",
  },
  sectionBubble: {
    height: 150,
    width: 150,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderRadius: 65,
    background: "#590349",
  },
  appBar: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 500,
    position: "fixed",
    zIndex: 500,
    /* margin-bottom: 20px; */
    /* bottom: "auto"; */
    marginLeft: 20,
    marginTop: 20,
    // height: 90,
    // background: 'linear-gradient(45deg, #bc62d9 20%, #FF8E53 90%)',
    background: "#313131",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    // width: 500,
    position: "fixed",
    display: "none",
    zIndex: 500,
    /* margin-bottom: 20px; */
    /* bottom: "auto"; */
    // marginLeft: 20,
    marginTop: 20,
    // height: 90,
    // background: 'linear-gradient(45deg, #bc62d9 20%, #FF8E53 90%)',
    background: "#313131",
    width: `calc(500 - ${drawerWidth}px)`,
    marginLeft: `calc(25 + ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  select: {
    marginLeft: theme.spacing(1),
    flex: 0,
    width: 50,
    color: white,
  },
  tempoInput: {
    marginLeft: theme.spacing(10),
    flex: 1,
    color: white,
    // width: 20,
  },
  keyInput: {
    marginLeft: theme.spacing(1),
    flex: 0,
    width: 50,
    // background: '#313131'
  },
  minorButton: {
    padding: 15,
    marginLeft: theme.spacing(5),
    flex: 1,
    color: fullWhite,
  },
  iconButton: {
    padding: 10,
    marginRight: theme.spacing(1),
    color: fullWhite,
  },
  button: {
    padding: 10,
    marginRight: theme.spacing(1),
    color: fullWhite,
  },
  divider: {
    height: 28,
    margin: 4,
    marginLeft: theme.spacing(1),
    color: fullWhite,
  },
  formControl: {
    color: fullWhite,
  },
  sectionContainer: {
    width: 200,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    padding: 10,
    // marginRight: theme.spacing(1),
    color: fullWhite,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    sendData();
  };

  const handleDrawerClose = () => {
    setOpen(false);
    sendData();
  };
  const sendData = () => {
    props.toggle();
  };

  const [key, setKey] = React.useState("C");
  const [tempo, setTempo] = React.useState(120);
  const [minor, setMinor] = React.useState(false);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };
  const handleTempoChange = (event) => {
    if (event.target.value >= 60 && event.target.value <= 300) {
      setTempo(event.target.value);
    }
  };
  const toggleMinor = (event) => {
    setMinor(!minor);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper
        component="form"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>

        <FormControl variant="filled">
          {/* <InputLabel id="demo-simple-select-filled-label">Tempo</InputLabel> */}
          <Input
            className={classes.formControl}
            id="filled-adornment-amount"
            // classname={classes.tempoInput}
            value={tempo}
            type="number"
            onChange={handleTempoChange}
            endAdornment={
              <InputAdornment position="end">
                <Typography className={classes.formControl}>BPM</Typography>
              </InputAdornment>
            }
          />
        </FormControl>

        <Divider className={classes.divider} orientation="vertical" />

        <FormControl variant="standard" className={classes.formControl}>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={key}
            onChange={handleKeyChange}
            className={classes.select}
          >
            <MenuItem value="A">A</MenuItem>
            <MenuItem value="A#">A#</MenuItem>
            <MenuItem value="B">B</MenuItem>
            <MenuItem value="C">C</MenuItem>
            <MenuItem value="C#">C#</MenuItem>
            <MenuItem value="D">D</MenuItem>
            <MenuItem value="D#">D#</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="F">F</MenuItem>
            <MenuItem value="F#">F#</MenuItem>
            <MenuItem value="G">G</MenuItem>
            <MenuItem value="G#">G#</MenuItem>
          </Select>
        </FormControl>

        <Button className={classes.minorButton} onClick={toggleMinor}>
          {minor ? "minor" : "major"}
        </Button>

        <Divider className={classes.divider} orientation="vertical" />

        <IconButton className={classes.button}>
          <PlayIcon />
        </IconButton>
        <IconButton className={classes.button}>
          <StopIcon />
        </IconButton>
        <IconButton className={classes.button}>
          <FiberManualRecordIcon />
        </IconButton>
      </Paper>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>

        <Grid container className={classes.sectionContainer}>
          <Grid item>
            <Card className={classes.sectionBubble}>
              <CardContent>Verse</CardContent>
            </Card>
          </Grid>

          <Grid item>
            <Card className={classes.sectionBubble}>
              <CardContent>Hook</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
}
