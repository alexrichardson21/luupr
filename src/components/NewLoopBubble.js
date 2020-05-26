import { ButtonBase, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import React from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 25,
    width: 60,
    height: 60,
    alignItems: "center",
    color: "#717171",
    background: "#212121",
    opacity: 0.75,
  },
}));

export default function NewLoopBubble(props) {
  const classes = useStyles();


  return (
    <div>
        <ButtonBase
          onClick={() => (props.newLoopCallback(props.trackId))}
        >
          <Card className={classes.card}>
              <CardContent>
                <AddIcon htmlColor='#717171'></AddIcon>
              </CardContent>
          </Card>
        </ButtonBase>
    </div>
  );
}
