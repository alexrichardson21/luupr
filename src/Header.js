import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import StopIcon from "@material-ui/icons/Stop";
import PlayIcon from "@material-ui/icons/PlayArrow";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";
import { Input } from "@material-ui/core";
import { grey900, white, black } from "material-ui/styles/colors";
import { grey400 } from "material-ui/styles/colors";
import { fullWhite } from "material-ui/styles/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 500,
    position: 'fixed',
    zIndex: 500,
  /* margin-bottom: 20px; */
  /* bottom: "auto"; */
    marginLeft: 20,
    marginTop: 20,
    // height: 90,
    // background: 'linear-gradient(45deg, #bc62d9 20%, #FF8E53 90%)',
    background: "#515151"
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
  }
}));

export default function Header() {
  const classes = useStyles();
  const [key, setKey] = React.useState("C");
  const [tempo, setTempo] = React.useState(120);
  const [minor, setMinor] = React.useState(false);

  const handleKeyChange = (event) => {
    
        setKey(event.target.value);
    
    
  };
  const handleTempoChange = (event) => {
    if (event.target.value >= 60 && event.target.value <= 300){
    setTempo(event.target.value);
    }
  };
  const toggleMinor = (event) => {
    setMinor(!minor);
  };
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>

      <FormControl  variant="filled">
        {/* <InputLabel id="demo-simple-select-filled-label">Tempo</InputLabel> */}
        <Input
          className={classes.formControl}
          id="filled-adornment-amount"
          // classname={classes.tempoInput}
          value={tempo}
          type="number"
          onChange={handleTempoChange}
          endAdornment={<InputAdornment position="end">
            <Typography className={classes.formControl}>BPM</Typography></InputAdornment>}
        />
      </FormControl>

      <Divider className={classes.divider} orientation="vertical" />

      <FormControl variant="standard" className={classes.formControl}>
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

      <Divider className={classes.divider} orientation="vertical" />

      <IconButton className={classes.button}>
        <PlayIcon />
      </IconButton >
      <IconButton className={classes.button}>
        <StopIcon />
      </IconButton>
      <IconButton className={classes.button}>
        <FiberManualRecordIcon />
      </IconButton>

      {/* <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <DirectionsIcon />
      </IconButton> */}
    </Paper>
  );
}
