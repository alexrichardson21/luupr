import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import kick from './drums/kick.mp3'
import snare from './drums/snare.mp3'
import hat from './drums/hat.mp3'

const data = [
  {
    id: kick,
    name: "Kick",
  },
  {
    id: snare,
    name: "Snare",
  },
  {
    id: hat,
    name: "Hat",
  },
];

const data2 = [
  {
    id: "Kicks",
    name: "Kicks",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "Snares",
    name: "Snares",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "Claps",
    name: "Claps",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "Snaps",
    name: "Snaps",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "ClosedHats",
    name: "Closed Hats",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "OpenHats",
    name: "Open Hats",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "Cymbals",
    name: "Cymbals",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "Percs",
    name: "Percs",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
  {
    id: "FX",
    name: "FX",
    children: [
      {
        id: "808 Trap",
        name: "808 Trap",
      },
      {
        id: "909 House",
        name: "909 House",
      },
      {
        id: "Sampled",
        name: "Sampled",
      },
      {
        id: "Lofi",
        name: "Lofi",
      },
    ],
  },
];

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function RecursiveTreeView(props) {
  const classes = useStyles();
  const [selected, setSelected] = React.useState([]);

  const handleSelect = (event, nodeIds) => {
    props.selectCallback(nodeIds);
  };



  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={["root"]}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={handleSelect}
    >
      {data.map((dataaaaaa) => renderTree(dataaaaaa))}
    </TreeView>
  );
}
