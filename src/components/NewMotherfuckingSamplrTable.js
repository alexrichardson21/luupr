import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import VertWavCanvas from "./VertWavCanvas";
import { ButtonBase } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
    backgroundColor: "#313131",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  headerCell: {
    // borderLeft: '1px solid #515151'
  },
  noClick: {
    cursor: "initial",
  },
  canvas: {
    height: 80,
    width: 200,
    // background: "#313131"
    // border: "1px solid #000000",
  },
  firstRow: {
    backgroundColor: "#414141",
  },
  oddRow: {
    background: "#515151",
  },
  on: {
    background: "#883735",
  },

  // root: {
  //   color: white,
  // },

  // flexContainer: {
  //   display: "flex",
  //   alignItems: "center",
  //   boxSizing: "border-box",
  // },
  // table: {
  //   // temporary right-to-left patch, waiting for
  //   // https://github.com/bvaughn/react-virtualized/issues/454
  //   background: "#111111",
  //   "& .ReactVirtualized__Table__headerRow": {
  //     flip: false,
  //     paddingRight: theme.direction === "rtl" ? "0px !important" : undefined,
  //   },
  // },
  // tableRow: {
  //   cursor: "pointer",
  // },
  // on: {
  //   background: "#111111",
  // },
  // off: {
  //   background: "#414141",
  // },
  // tableRowHover: {
  //   "&:hover": {
  //     backgroundColor: theme.palette.grey[200],
  //   },
  // },
  // tableCell: {
  //   flex: 1,
  // },
  // noClick: {
  //   cursor: "initial",
  // },
  // root: {
  //   // width: "100%",
  //   position: "relative",
  //   left: -15,
  //   width: 200,
  // },
  // container: {
  //   maxHeight: 440,
  // },
  // canvas: {
  //   display: "flex",
  //   alignItems: "center",
  //   boxSizing: "border-box",
  //   backgroundColor: "#313131",
  //   flex: 1,
  // },
}));

export default function SamplrTable(props) {
  const classes = useStyles();
  const rowHeight = 80;
  const headerHeight = 40;
  const columns = 8;
  const [rows, setRows] = React.useState(
    Array(props.downbeats.length).fill(Array(columns).fill(false))
  );

  const getRowClassName = ({ index }) => {
    // const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer);
  };

  const cellRenderer = ({ cellData, columnIndex, rowIndex, width }) => {
    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          { [classes.oddRow]: columnIndex % 2 === 0 },
          { [classes.firstRow]: columnIndex % 4 === 3 },
          { [classes.on]: cellData }
        )}
        variant="body"
        style={{ height: rowHeight }}
        align="left"
      >
        <ButtonBase
          onClick={() => {
            noteChange(rowIndex, columnIndex - 1);
            console.log("fuck this");
          }}
          className={cellData ? classes.on : classes.off}
          style={{ height: rowHeight, width: width }}
        />
      </TableCell>
    );
  };

  const canvasRenderer = ({ cellData, rowIndex }) => {
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer)}
        variant="body"
        style={{ height: rowHeight }}
        align="left"
      >
        {/* <ButtonBase style={{ height: rowHeight, width: 200 }}  onMouseUp={props.stop()}> */}
        <VertWavCanvas
          data={props.canvasData[rowIndex]}
          play={props.play}
          stop={props.stop}
          rowIndex={rowIndex}
          height={rowHeight}
          width={200}
        />
        {/* </ButtonBase> */}
      </TableCell>
    );
  };

  const headerRenderer = ({ columnIndex }) => {
    const headers = [
      "",
      "1.1.1",
      "1.3.1",
      "2.1.1",
      "2.3.1",
      "3.1.1",
      "3.3.1",
      "4.1.1",
      "4.3.1",
    ];

    return (
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight }}
        align="left"
      >
        <span>{headers[columnIndex]}</span>
      </TableCell>
    );
  };

  const noteChange = (x, y) => {
    let fukuJS = rows.map((inner) => inner.slice());
    fukuJS[x][y] = !rows[x][y];
    console.log(rows);
    setRows(fukuJS);
  };

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: "inherit",
            }}
            headerHeight={headerHeight}
            className={classes.table}
            // {...tableProps}
            rowClassName={getRowClassName}
            rowCount={rows.length}
            rowGetter={({ index }) => rows[index]}
            columns={columns}
          >
            <Column
              key="canvas"
              headerRenderer={(headerProps) =>
                headerRenderer({
                  ...headerProps,
                  columnIndex: 0,
                })
              }
              width={200}
              className={classes.flexContainer}
              cellRenderer={canvasRenderer}
              dataKey="canvas"
            />
            {[...Array(columns).keys()].map((i) => {
              return (
                <Column
                  key={i + 1}
                  width={(width - 200) / 8}
                  headerRenderer={(headerProps) =>
                    headerRenderer({
                      ...headerProps,
                      columnIndex: i + 1,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={(cellProps) =>
                    cellRenderer({ ...cellProps, width: (width - 200) / 8 })
                  }
                  dataKey={i}
                  // {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    </Paper>
  );
}
