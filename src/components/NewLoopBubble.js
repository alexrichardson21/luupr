import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  ButtonBase,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 35,
    minWidth: 100,
    minHeight: 100,
    alignItems: "center",
  },
}));

export default function NewLoopBubble(props) {
  const classes = useStyles();


  return (
    <div>
        <ButtonBase
          onClick={() => (props.functionCallFromParent())}
        >
          <Card className={classes.card}>
              <CardContent>
                <AddIcon></AddIcon>
              </CardContent>
          </Card>
        </ButtonBase>
    </div>
  );
}
