import { ButtonBase, Grid, Paper, Slider } from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import { makeStyles } from "@material-ui/core/styles";
import HeadsetIcon from "@material-ui/icons/Headset";
import AlbumIcon from "@material-ui/icons/Album";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import cx from "clsx";
import { white } from "material-ui/styles/colors";
import React from "react";
import { black } from "material-ui/styles/colors";
import Sound from "react-sound";
import KeyboardEventHandler from "react-keyboard-event-handler";

const useStyles = makeStyles(({ palette }) => ({
  card: {
    background: "#ff525a",
    // minWidth: 256,
    textAlign: "center",
    borderRadius: 20,
    height: 100,
    width: 180,
  },
}));

const SamplrSound = (props) => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });
  const [seeAll, setSeeAll] = React.useState(false);
  const [hover, setHover] = React.useState(false);
  const [note, setNote] = React.useState(0);
  const [play, setPlay] = React.useState(false);
  const [url, setUrl] = React.useState(new URL("http://127.0.0.1:5000/path"))
  const [urlProps, setUrlProps] = React.useState(new URLSearchParams({'name': props.trackProps.props.file.name}))
  const [position, setPosition] = React.useState(props.downbeats[0].time * 1000)
  
  // const url = String((new URL("http://127.0.0.1:5000/path")).searchParams.append('name', props.trackProps.props.file));

  const midKeyRow = ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'"];

  const openButton = () => {
    setSeeAll(!seeAll);
    props.open();
  };

  const midRowDown = (key, e) => {
    
    
    setNote(midKeyRow.indexOf(key));
    // setPosition(props.downbeats[note].time * 1000)
    setPlay(true);
    
    
  };

  const midRowUp = (key, e) => {
    
    
    setNote(0);
    // setPosition(props.downbeats[0].time * 1000)
    setPlay(false);
    
  };

  // let url = new URL("http://127.0.0.1:5000/path"),
  //   params = {
  //     name: props.trackProps.props.file,
  //   };

  // Object.keys(params).forEach((key) =>
  //   url.searchParams.append(key, params[key])
  // );

  // url = String(url)

  return (
    <div>
      <KeyboardEventHandler
        handleEventType="keydown"
        handleKeys={midKeyRow}
        onKeyEvent={midRowDown}
      />

      <KeyboardEventHandler
        handleEventType="keyup"
        handleKeys={midKeyRow}
        onKeyEvent={midRowUp}
      />

      <Sound
        // autoLoad={true}
        url={'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3'}
        // url={String(url) + '?' + String(urlProps)}
        playFromPosition={props.downbeats[note].time * 1000}
        // onPlaying={({ position }) => setPosition(position)}
        playStatus={!play ? Sound.status.STOPPED : Sound.status.PLAYING}
        
        onBufferChange={() => console.log('fuckabuffa')}
      />
    </div>
  );
};

export default SamplrSound;
