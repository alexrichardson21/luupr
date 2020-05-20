import { Paper, FormControl, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { blue } from "@material-ui/core/colors";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import PersonIcon from "@material-ui/icons/Person";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  paper: {
    // background: '#515151',

    borderRadius: 20,
    // marginTop: 15,
    marginRight: 160,
    marginLeft: theme.spacing(2),
    height: 100,
    color: "#717171",
    background: "#212121",
    opacity: 0.75,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  button: {
    height: 100,
    // width: 400,
  },
  input: {
    display: "none",
  },
}));

export default function FileUpload(props) {
  const classes = useStyles();
  const [file, setFile] = React.useState(undefined);
  const [tempo, setTempo] = React.useState(0);
  const [clicks, setClicks] = React.useState([]);
  const [clicksPerBar, setClicksPerBar] = React.useState(0);
  const [downbeats, setDownbeats] = React.useState([]);
  const [load, setLoad] = React.useState(false);
  const fileInput = React.createRef();

  useEffect(() => {
    async function sendFile() {
      const formData = new FormData();
      formData.append("file", file);

      let url = new URL("http://127.0.0.1:5000/Upload");
      fetch(url, { method: "POST", body: formData });
    }
    async function fetchSampleTempo() {
      // const file = document.querySelector("[type=file]").file;
      const formData = new FormData();
      formData.append("input_file", file);

      let url = new URL("https://api.sonicAPI.com/analyze/tempo"),
        params = {
          access_id: "9c745103-ac2a-473d-bcae-a07e242b009c",
          format: "json",
        };

      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );

      setLoad(true);
      fetch(url, { method: "POST", body: formData })
        .then((res) => {
          console.log(res.status); // Will show you the status
          // if (!res.ok) {
          //   throw new Error("HTTP status " + res.status);
          // }
          return res.json();
        })
        // .then((res) => res.json())
        .then((result) => {
          // setTempo(result["auftakt_result"]["overall_tempo"]);
          props.addTrack({
            type: "Samplr",
            props: {
              file: file.name,
              clicksPerBar: result["auftakt_result"]["clicks_per_bar"],
              clicks: result["auftakt_result"]["click_marks"],
              downbeats: result["auftakt_result"]["click_marks"].filter(
                (x) => x.downbeat === "true"
              ),
            },
          });
          setLoad(false);
        })
        .catch((error) => {
          console.log(error);
          setLoad(false);
        });
    }
    fetchSampleTempo();
    sendFile();
  }, [file]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFile(fileInput.current.files[0]);
    // props.filenameCallback(fileInput.current.files[0].filename)
    props.filePopupClose();
  };

  const handleClose = () => {
    console.log("close");
  };

  const prompt = (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} method="POST" encType="multipart/form-data">
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
            Choose File
          </Button>
        </label>
        <input
          className={classes.input}
          type="submit"
          id="contained-button-file2"
        ></input>
        <label htmlFor="contained-button-file2">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>
      </form>
    </div>
  );

  const samplrFileUpload = (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle id="simple-dialog-title">Add new sample</DialogTitle>
      {prompt}
    </Dialog>
  );

  return <div>{samplrFileUpload}</div>;
}
