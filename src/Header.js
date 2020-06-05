import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Fab, Grid, Input, Card } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
// import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";
import LoopIcon from "@material-ui/icons/Loop";
import PlayIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
// import { black, fullWhite } from "material-ui/styles/colors";
// import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // marginRight: 135,
  },
  appBar: {
    background: "transparent",
    boxShadow: "none",
    borderStyle: "none",
    color: "#111111",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <IconButton>
            <ArrowBackIcon></ArrowBackIcon>
          </IconButton>
          <Fab onClick={() => props.toggleLuuprModeCallback()}>
            <LoopIcon></LoopIcon>
          </Fab>
          <FormControl variant="filled">
            <Input
              id="filled-adornment-amount"
              type="number"
              value={props.globalTempo}
              endAdornment={
                <InputAdornment position="end">
                  <Typography>BPM</Typography>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl variant="standard">
            {/* <InputLabel id="demo-simple-select-filled-label">Key</InputLabel> */}
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={props.globalScale.root}
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

          {/* <Button>major</Button> */}

          <IconButton disabled={!props.isLoaded} onClick={() => props.playCallback()}>
            <PlayIcon />
          </IconButton>
          <IconButton disabled={!props.isLoaded} onClick={() => props.stopCallback()}>
            <StopIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
