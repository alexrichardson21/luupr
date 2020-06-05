import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Divider, Button, ButtonBase, Paper, Grid } from "@material-ui/core";

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function SeperableButton(props) {
  const [state, setState] = React.useState(initialState);

  const handleClick = (event) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleClose = () => {
    setState(initialState);
  };

  const beatSplits = [2, 4, 8];
  const tripletSplits = [3, 6];

  const splitNum = props.split && props.split.length ? props.split[0].split : 1;

  return (
    <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
      <Grid container direction='horizontal'>
      {new Array(splitNum).fill(0).map((_, i) => {
        return (
          <Paper
            onClick={() => {
              props.noteCallback(
                {
                  rowNote: props.rowNote,
                  eighthIndex: props.index,
                  start: `${Math.floor(
                    props.start + (i / splitNum) * props.duration
                  )}i`,
                  duration: `${Math.floor((1 / splitNum) * props.duration)}i`,
                  drumIndex: props.drumIndex,
                  splitIndex: i,
                },
                props.drumIndex,
                props.index,
                i
              );
            }}
            style={{
              borderTopLeftRadius: i === 0 ? 25 : 4,
              borderBottomLeftRadius: i === 0 ? 25 : 4,
              borderTopRightRadius: i === splitNum - 1 ? 25 : 4,
              borderBottomRightRadius: i === splitNum - 1 ? 25 : 4,
              marginLeft: 1,
              marginRight: 1,
              height: 60,
              width: props.width / splitNum,
              background: props.loopData.some(
                (n) =>
                  n.eighthIndex === props.index &&
                  n.drumIndex === props.drumIndex &&
                  n.splitIndex === i
              )
                ? "#476343"
                : "#000000",
            }}
          />
        );
      })}
      </Grid>

      <Menu
        keepMounted
        open={state.mouseY !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          state.mouseY !== null && state.mouseX !== null
            ? { top: state.mouseY, left: state.mouseX }
            : undefined
        }
      >
        Split in:
        {beatSplits.map((num) => {
          return (
            <MenuItem
              onClick={() => {
                setState(initialState);
                props.setSplitCallback(num, props.index, props.drumIndex);
              }}
            >
              {num}
            </MenuItem>
          );
        })}
        <Divider></Divider>
        {tripletSplits.map((num) => {
          return (
            <MenuItem
              onClick={() => {
                setState(initialState);
                props.setSplitCallback(num, props.index, props.drumIndex);
              }}
            >
              {num}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
