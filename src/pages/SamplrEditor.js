import { Paper, Button, FormControl, Input } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useCallback } from "react";
import SamplrTable from "../components/SamplrTable.js";
import SamplrSound from "../components/SamplrSound.js";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    // padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 50,
    border: "1px solid",
  },
  input: {
    display: "none",
  },
}));

export default function SamplrEditor(props) {
  const classes = useStyles();
  const [file, setFile] = React.useState(false);
  const [tempo, setTempo] = React.useState(0);
  const [clicks, setClicks] = React.useState([]);
  const [clicksPerBar, setClicksPerBar] = React.useState(0);
  const [downbeats, setDownbeats] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const fileInput = React.createRef();

  // useEffect(() => {
  //   async function fetchProduct() {
  //     // const file = document.querySelector("[type=file]").file;
  //     const formData = new FormData();
  //     formData.append("input_file", file);

  //     let url = new URL("https://api.sonicAPI.com/analyze/tempo"),
  //       params = {
  //         access_id: "537285d1-d69e-4b5e-90bb-1d94a3058a84",
  //         format: "json",
  //       };

  //     Object.keys(params).forEach((key) =>
  //       url.searchParams.append(key, params[key])
  //     );

  //     setLoad(true);
  //     fetch(url, { method: "POST", body: formData })
  //       .then((res) => res.json())
  //       .then((result) => {
  //         // setTempo(result["auftakt_result"]["overall_tempo"]);
  //         setClicksPerBar(result["auftakt_result"]["clicks_per_bar"]);
  //         setClicks(result["auftakt_result"]["click_marks"]);
  //         setDownbeats(
  //           result["auftakt_result"]["click_marks"].filter((x) => x.downbeat)
  //         );
  //         setLoad(false);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         setLoad(false);
  //       });
  //   }

  //   fetchProduct();
  // }, [file]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFile(fileInput.current.files[0]);
  };

  const prompt = (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} method="POST" enctype="multipart/form-data">
        <input
          accept="audio/*"
          className={classes.input}
          id="contained-button-file"
          type="file"
          ref={fileInput}
          // onChange={(event) => console.log(event.target)}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
        <input type="submit"></input>
      </form>
    </div>
  );

  return (
    <div>
      <SamplrSound trackProps={props.trackProps} downbeats={props.trackProps.props.downbeats}></SamplrSound>
      <SamplrTable tempo={tempo} trackProps={props.trackProps}></SamplrTable>
    </div>
  );
}
