import { Fab, Grid, Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import LoopIcon from "@material-ui/icons/Loop";
import PlayIcon from "@material-ui/icons/PlayArrow";
// import Divider from "@material-ui/core/Divider";
// import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import StopIcon from "@material-ui/icons/Stop";
import { black, fullWhite } from "material-ui/styles/colors";
import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    // display: "flex",
  },
  
  mainControlPaper: {
    background: "#212121",
    // height: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "fixed",
    zIndex: 490,
    /* margin-bottom: 20px; */
    /* bottom: "auto"; */
    left: theme.spacing(2),
    top: theme.spacing(2.5),
  },
  mainControl: {
    minWidth: 410,
  },
  select: {
    color: fullWhite,
  },
 
  // icon: {
  //   htmlColor: theme.custom.palette.iconColor,
  // },
  paper: {
    background: "#212121",
  },
  formControl: {
    width: 90,
    // marginRight: theme.spacing(2),
    color: fullWhite,
    marginLeft: theme.spacing(3),
  },
  formControl2: {
    width: 45,
    color: black,
    color: fullWhite,
    marginLeft: theme.spacing(5),
  },
  tabFab: {
    position: "fixed",
    left: theme.spacing(8),
    top: theme.spacing(2),
    zIndex: 500,
    background: "#414141",
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
    color: fullWhite,
  },
  button: {
    color: fullWhite,
    // marginLeft: theme.spacing(1),
  },
  backButton: {
    color: '#696969',
    marginRight: theme.spacing(2),
    // opacity: .5,
  },
  nav: {
    marginLeft: theme.spacing(2),
  },
}));

export default function MainControl(props) {
  const classes = useStyles();
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState("C");
  // const [tempo, setTempo] = React.useState(props.tempo);
  const [minor, setMinor] = React.useState(false);
  const [mode, setMode] = React.useState(true);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };
  const handleTempoChange = (event) => {
    if (event.target.value >= 60 && event.target.value <= 300) {
      // setTempo(event.target.value);
      props.tempoCallback(event.target.value);
    }
  };
  const toggleMinor = (event) => {
    setMinor(!minor);
  };
  const toggleMode = () => {
    setMode(!mode);
    console.log('some shit')
    props.modeCallback();
  };
  const backButtonClick = () => {
    if (props.openLoop) {
      props.backCallback()
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.mainControlPaper}>

        <Grid container className={classes.mainControl} alignItems="center">
        <IconButton onClick={backButtonClick} className={classes.backButton}>
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
          <FormControl variant="filled" className={classes.formControl}>
            <Input
              className={classes.formControl}
              id="filled-adornment-amount"
              // classname={classes.tempoInput}
              value={props.tempo}
              type="number"
              onChange={handleTempoChange}
              endAdornment={
                <InputAdornment position="end">
                  <Typography>BPM</Typography>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard" className={classes.formControl2}>
            {/* <InputLabel id="demo-simple-select-filled-label">Key</InputLabel> */}
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

          <IconButton className={classes.button}>
            <PlayIcon />
          </IconButton>
          <IconButton className={classes.button}>
            <StopIcon />
          </IconButton>
          <IconButton className={classes.button}>
            <FiberManualRecordIcon />
          </IconButton>
        </Grid>
      </Paper>
      <Fab className={classes.tabFab} onClick={toggleMode}>
        {
          mode ?
          <LoopIcon htmlColor='#ffffff'></LoopIcon> :
          <FormatIndentIncreaseIcon  htmlColor='#ffffff'></FormatIndentIncreaseIcon>
        }
        
      </Fab>
    </div>
  );
}
