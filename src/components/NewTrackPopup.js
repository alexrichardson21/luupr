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
import FileUpload from './FileUpload'
import React, { useEffect } from "react";

const instruments = ["Samplr", "Synthesizr", "Drum", "Audio"];
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
}));

function Popup(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  



  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add new track</DialogTitle>
      <List>
        {instruments.map((email) => (
          <ListItem
            button
            onClick={() => handleListItemClick(email)}
            key={email}
          >
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

Popup.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function NewTrackPopup(props) {
  const [open, setOpen] = React.useState(false);
  const [openFilePopup, setOpenFilePopup] = React.useState(false);
  const [currTrackInfo, setCurrTrackInfo] = React.useState({})

  const [selectedValue, setSelectedValue] = React.useState(instruments[1]);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setSelectedValue(value);
    
    
    if (value==='Samplr'){
      setOpenFilePopup(true)
      // props.fileOpenCallback()
    } else {
      props.addTrack(value);
    }
    
    props.newTrackClose()
  };

  return (
    <div>
      <Popup selectedValue={selectedValue} open={props.open} onClose={handleClose} />
      <FileUpload
        filePopupClose={() => setOpenFilePopup(false)}
        open={openFilePopup}
        addTrack={props.addTrack}
        loadingCallback={props.loadingCallback}
      ></FileUpload>
    </div>
  );
}
