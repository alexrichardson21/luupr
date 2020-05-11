import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FormatIndentIncreaseIcon from "@material-ui/icons/FormatIndentIncrease";

import BarChartIcon from "@material-ui/icons/BarChart";
import LoopIcon from "@material-ui/icons/Loop";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: 500,
    padding: "2px 4px",
    position: "fixed",
    bottom: 10,
    left: "auto",
    right: "auto",
    // display: "flex",
    alignItems: "center",
    background: "#313131",
  },
});

export default function SimpleBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Paper className={classes.root}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.page(newValue);
        }}
        // showLabels
      >
        <BottomNavigationAction label="Luupr" icon={<LoopIcon />} />
        <BottomNavigationAction
          label="Sequencr"
          icon={<FormatIndentIncreaseIcon />}
        />
        <BottomNavigationAction label="FX" icon={<BarChartIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
