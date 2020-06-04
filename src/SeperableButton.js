import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Divider, Button, ButtonBase, Paper } from "@material-ui/core";

const initialState = {
  mouseX: null,
  mouseY: null,
};

export default function SeperableButton(props) {
  const [state, setState] = React.useState(initialState);
  // const [buttons, setButtons] = React.useState(1);
  // const [split, setSplit] = React.useState([false]);

  // const setNote = () => {
  //   split.map((noteOn, i) => {
  //     if (noteOn) {
  //       return {
  //         rowNote: props.rowNote,
  //         start: `${props.start + i / props.duration}i`,
  //         duration: `${props.duration / split.length}i`,
  //         buttonIndex: props.index,
  //         drumIndex: props.drumIndex,
  //       };
  //     }
  //   });
  //   props.setNoteDataCallback(split);
  // };

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

  const noteOn = (i) => {
    console.log(i)
    return props.loopData.some(
      (n) => Math.floor(n.start.split("i")[0]) === Math.floor(props.start + i / props.duration)
    );
  };

  return (
    <div onContextMenu={handleClick} style={{ cursor: "context-menu" }}>
      {new Array(props.split).fill(0).map((_, i) => {
        return (
          <ButtonBase
            onClick={() => {
              // const a = split.slice()
              // a[i] = !a[i]
              // setSplit(a)
              // setNote()
              props.noteCallback({
                rowNote: props.rowNote,
                buttonIndex: props.index,
                start: `${Math.floor(
                  props.start + (i / props.split) * props.duration
                )}i`,
                duration: `${Math.floor((1 / props.split) * props.duration)}i`,
                drumIndex: props.drumIndex,
              });
              // props.toggleNoteCallback(i)
              // props.noteCallback({
              //   rowNote: props.note,
              //   start: `${Math.floor(
              //     props.start + (i / props.split) * props.duration
              //   )}i`,
              //   duration: `${Math.floor((1 / props.split) * props.duration)}i`,
              // })
            }}
          >
            {" "}
            <Paper
              style={{
                borderTopLeftRadius: i === 0 ? 25 : 4,
                borderBottomLeftRadius: i === 0 ? 25 : 4,
                borderTopRightRadius: i === props.split - 1 ? 25 : 4,
                borderBottomRightRadius: i === props.split - 1 ? 25 : 4,
                marginLeft: 1,
                marginRight: 1,
                height: 60,
                width: props.width / props.split,
                background: noteOn(i) ? "#476343" : "#000000",
              }}
            />{" "}
          </ButtonBase>
        );
      })}

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
                // const a = Array(num).fill(false)
                // setSplit(a)
                // setNote()
                props.setSplitCallback(num, props.index, props.drumIndex);
                // props.changeSplitCallback(num);
                // props.clearIndexNotes()
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
                // const a = Array(num).fill(false)
                // setSplit(a)
                // setNote()
                props.setSplitCallback(props.index, num);
                // props.changeSplitCallback(num);
                // props.clearIndexNotes()
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
