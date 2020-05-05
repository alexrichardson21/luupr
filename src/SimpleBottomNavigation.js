import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import FormatIndentIncreaseIcon from '@material-ui/icons/FormatIndentIncrease';

import BarChartIcon from '@material-ui/icons/BarChart';
import LoopIcon from '@material-ui/icons/Loop';
import { Paper } from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: 500,
    padding: "2px 4px",
    // display: "flex",
    // alignItems: "center",
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Paper className={classes.root}>
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      
    >
      <BottomNavigationAction label="Sequencr" icon={<FormatIndentIncreaseIcon />} />
      <BottomNavigationAction label="Luupr" icon={<LoopIcon />} />
      <BottomNavigationAction label="FX" icon={<BarChartIcon />} />
    </BottomNavigation>
    </Paper>
  );
}