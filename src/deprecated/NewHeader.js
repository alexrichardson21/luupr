import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
// import Divider from "@material-ui/core/Divider";
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
import { Input, Fab, ButtonBase, Grid, ThemeProvider } from "@material-ui/core";
import { grey900, white, black } from "material-ui/styles/colors";
import { grey400 } from "material-ui/styles/colors";
import { fullWhite } from "material-ui/styles/colors";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";

import BarChartIcon from "@material-ui/icons/BarChart";
import AddIcon from "@material-ui/icons/Add";
import LoopIcon from "@material-ui/icons/Loop";
import { FloatingActionButton, BottomNavigation } from "material-ui";
import SimpleBottomNavigation from "./SimpleBottomNavigation";
import { dark, light } from "../theme";
import { faintBlack } from "material-ui/styles/colors";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    background: "#212121",

    // alignItems: 'center',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    background: "#212121",
    // alignItems: 'center',
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  fab: {
    width: 50,
    height: 50,
    // display: 'center',
    borderRadius: 45,
    // marginBottom: 15,
    // display: 'table-cell',
    // verticalAlign: 'middle',
    // textAlign: 'center',
  },
  menuButton: {
    marginRight: 14,
    // display: 'fixed',
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    background: black,
  },
  drawerOpen: {
    background: "#313131",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: "#313131",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  mainControlPaper: {
    background: "#212121",
    // height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: 'fixed',
    zIndex: 490,
  /* margin-bottom: 20px; */
  /* bottom: "auto"; */
    right: theme.spacing(3),
    top: theme.spacing(1.5),
  },
  mainControl: {
    minWidth: 410,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // icon: {
  //   htmlColor: theme.custom.palette.iconColor,
  // },
  paper: {
    background: "#212121",
  },
  formControl: {
    width: 90,
    marginRight: theme.spacing(2),
    color: fullWhite,
    marginLeft: theme.spacing(1),
  },
  formControl2: {
    width: 45,
    color: black,
    // color: fullWhite,
    // marginRight: theme.spacing(4),
  },
  tabFab: {
    position: 'fixed',
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 500, 
    background: "#ff525a",
  },
  appGrid: {
    display: "flex",
  },
  divider: {
    height: 15,
    // marginLeft: theme.spacing(1),
    // color: 'white',
  },
  minorButton: {
    // marginRight: theme.spacing(2),
    // color: fullWhite,
  },
  button: {
    color: fullWhite,
    // marginLeft: theme.spacing(1),
  },
  nav: {
    marginLeft: theme.spacing(2),
  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar> */}
           <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        {/* <Paper className={classes.paper}> */}
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem>
            <ButtonBase>
              <Paper className={classes.fab}>
                <AddIcon></AddIcon>
              </Paper>
            </ButtonBase>
          </ListItem>
          <ListItem button key="Luupr">
            <ListItemIcon className={classes.button}>
              <LoopIcon></LoopIcon>
            </ListItemIcon>
            <ListItemText className={classes.button} primary="Luupr" />
          </ListItem>

          <ListItem button key="Sequencr">
            <ListItemIcon className={classes.button}>
              <FormatIndentIncreaseIcon></FormatIndentIncreaseIcon>
            </ListItemIcon>
            <ListItemText className={classes.button} primary="Sequencr" />
          </ListItem>

          <ListItem button key="FX">
            <ListItemIcon className={classes.button}>
              <BarChartIcon></BarChartIcon>
            </ListItemIcon>
            <ListItemText className={classes.button} primary="FX" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
