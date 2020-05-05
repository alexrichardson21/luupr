import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { useGutterBorderedGridStyles } from "@mui-treasury/styles/grid/gutterBordered";
import CustomizedSlider from "./Slider";
import { Button, IconButton } from "@material-ui/core";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import HeadsetIcon from "@material-ui/icons/Headset";
import TextField from "@material-ui/core/TextField";
import yellow from "@material-ui/core/colors/yellow";

const yel = yellow[200];

const useStyles = makeStyles(({ palette }) => ({
  card: {
    background: yel,
    // minWidth: 256,
    textAlign: "center",
    borderRadius: 20,
    // height: 165,
  },
  iconButton: {
    margin: "auto",
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
}));

const TrackHeader = () => {
  const styles = useStyles();
  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: "rgba(0, 0, 0, 0.08)",
    height: "50%",
  });
  return (
    <Card className={cx(styles.card, shadowStyles.root)}>
      <CardContent className={styles.cardHeader}>
        <Box display={"flex"}>
          <Box p={2}  className={borderedGridStyles.item}>
            <HeadsetIcon fontSize="large"></HeadsetIcon>
          </Box>
          <Box p={1}  className={borderedGridStyles.item}></Box>
          <form noValidate autoComplete="off">
            <TextField
              className={styles.trackInput}
              id="standard-basic"
              placeholder="Track 1"
            />
          </form>
        </Box>

        {/* <Divider light /> */}

        <Box display={"flex"}>
          <Box p={2} className={borderedGridStyles.item}>
            <CustomizedSlider></CustomizedSlider>
          </Box>
          <Box p={2} className={borderedGridStyles.item}>
            <IconButton
              classname={styles.iconButton}
              margin="auto"
              color="primary"
            >
              <HeadsetIcon fontSize="small"></HeadsetIcon>
            </IconButton>
            <IconButton
              classname={styles.iconButton}
              margin="auto"
              color="secondary"
            >
              <VolumeOffIcon fontSize="small"></VolumeOffIcon>
            </IconButton>
          </Box>
        </Box>
        {/* <Divider light /> */}
      </CardContent>
    </Card>
  );
};

export default TrackHeader;
