import { ButtonBase, Grid, Paper, Slider } from "@material-ui/core";
import yellow from "@material-ui/core/colors/yellow";
import { makeStyles } from "@material-ui/core/styles";
import HeadsetIcon from "@material-ui/icons/Headset";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import cx from "clsx";
import { white } from "material-ui/styles/colors";
import React from "react";
import { black } from "material-ui/styles/colors";

const yel = yellow[200];

const useStyles = makeStyles(({ palette }) => ({
  card: {
    background: "#ff525a",
    // minWidth: 256,
    textAlign: "center",
    borderRadius: 20,
    height: 100,
    width: 180,
  },
  button: {
    width: 90,
    height: 50,
  },
  volume: {
    width: 150,
    // height: 50,
  },
  topRow: {
    // marginLeft: 10,
    // width: 200,
    height: 100,
    // textAlign: 'center',
  },
  bottomRow: {
    // marginLeft: 10,
    // width: 200,
    // textAlign: 'center',
  },
  iconButton: {
    margin: "auto",
    color: white,
  },
  cardHeader: {
    // height: 50,
  },
  avatar: {
    width: 60,
    height: 60,
    margin: "auto",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: "0.5px",
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    color: palette.grey[500],
    marginBottom: "0.875em",
  },
  statLabel: {
    fontSize: 12,
    color: palette.grey[500],
    fontWeight: 500,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    letterSpacing: "1px",
  },
  trackInput: {
    width: 100,
  },
  color0: {

    color: white,
    backgroundColor: "#FF525A",
  },
  // color4: {
  //   color: black,
  //   backgroundColor: "#66AC6A",
  // },
  color1: {
    color: white,
    backgroundColor: "#4778ff",
  },
  color3: {
    color: black,
    backgroundColor: "#FF4D9D",
  },
  color2: {
    color: white,
    backgroundColor: "#a390e4",

    // color: black,
    // backgroundColor: "#FF4D9D",
  },
}));

const LuuprTrackHeader = (props) => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });
  const [seeAll, setSeeAll] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const openButton = () => {
    setSeeAll(!seeAll);
    props.open();
  };

  return (
    <Paper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cx(styles.card, shadowStyles.root, 
        props.trackType === 'Drum' && styles.color0,
        props.trackType === 'Samplr' && styles.color1,
        props.trackType === 'Synthesizr' && styles.color2,
        props.trackType === 'Audio' && styles.color3,
      )}
    >
      {hover ? (
        <Grid
          container
          className={styles.topRow}
          display={"flex"}
          justify="center"
          alignItems="center"
        >
          <Grid  item xs={12}>
            <Slider className={styles.volume}></Slider>
          </Grid>
          <Grid item xs={6}>
            <ButtonBase className={styles.button}>
              <VolumeOffIcon></VolumeOffIcon>
            </ButtonBase>
          </Grid>
          <Grid item xs={6}>
            <ButtonBase className={styles.button}>
              <HeadsetIcon></HeadsetIcon>
            </ButtonBase>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          className={styles.topRow}
          display={"flex"}
          justify="center"
          alignItems="center"
        >
          <Grid item>
            <HeadsetIcon htmlColor="#FFFFFF" fontSize="large"></HeadsetIcon>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default LuuprTrackHeader;
