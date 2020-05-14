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
    background: '#313131',
    opacity: .5,
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
                <AddIcon htmlColor='#ffffff'></AddIcon>
              </CardContent>
          </Card>
        </ButtonBase>
    </div>
  );
}
