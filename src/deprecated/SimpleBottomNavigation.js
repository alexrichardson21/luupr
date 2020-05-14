import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";

import BarChartIcon from "@material-ui/icons/BarChart";
import LoopIcon from "@material-ui/icons/Loop";
import { Paper, ThemeProvider, Tab, createMuiTheme } from "@material-ui/core";
import { dark, light } from "../theme";



const useStyles = makeStyles((theme) => ({
  root: {
    // paddingLeft: theme.spacing(2),
    width: 300,
    padding: "2px 4px",
    // position: "fixed",
    bottom: 10,
    left: "auto",
    right: "auto",
    // height: 40,
    // display: "flex",
    alignItems: "center",
    background: "#F2C57C",
  },
  nav: {
    // height: 45,
    // fontSize: 5,
  },
  act: {
    root: {
      // height: 25,
    },
  }
}));

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "light",
          background: {
            paper: "#F2C57C",
          },
        },
      }),
  );
  

  return (
    <Paper className={classes.root}>
      <ThemeProvider theme={theme}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.page(newValue);
        }}
        className={classes.nav}
      >
        <BottomNavigationAction
          // classname={classes.nav}
          label="Luupr"
          icon={<LoopIcon />}
          classes={classes.act}
        />
        <BottomNavigationAction
          classname={classes.nav}
          label="Sequencr"
          icon={<FormatIndentIncreaseIcon />}
        />
        <BottomNavigationAction
          classname={classes.nav}
          label="FX"
          icon={<BarChartIcon />}
        />
      </BottomNavigation>
      </ThemeProvider>
    </Paper>
  );
}
