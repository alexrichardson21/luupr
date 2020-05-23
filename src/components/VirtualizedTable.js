import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table } from "react-virtualized";
import VertWavCanvas from "./VertWavCanvas";
import { ButtonBase } from "@material-ui/core";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    background: "#111111",
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0px !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  on: {
    background: '#111111'
  },
  off: {
    background: '#414141'
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex, rowIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <ButtonBase onClick={() => this.props.noteChangeCallback(columnIndex,rowIndex)} className={cellData ? classes.on : classes.off}>
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align="left"
      >
        
        a button
        {cellData}
      </TableCell>
      </ButtonBase>
    );
  };

  canvasRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <ButtonBase>
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align="left"
      >
        {/* {cellData} */}
        {/* some canvas shit */}
        <VertWavCanvas height={rowHeight} />
      </TableCell>
      </ButtonBase>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

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

  render() {
    const {
      classes,
      columns,
      rowHeight,
      headerHeight,
      ...tableProps
    } = this.props;
    return (
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
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            <Column
              key="canvas"
              headerRenderer={(headerProps) =>
                this.headerRenderer({
                  ...headerProps,
                  columnIndex: 0,
                })
              }
              width={200}
              className={classes.flexContainer}
              cellRenderer={() => this.canvasRenderer}
              dataKey="canvas"
            />
            {[...Array(columns).keys()].map((i) => {
              return (
                <Column
                  key={i + 1}
                  width={(width - 200) / 8}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: i + 1,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={i}
                  // {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.number.isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

function createData(_0, _1, _2, _3, _4, _5, _6, _7) {
  return [_0, _1, _2, _3, _4, _5, _6, _7];
}

export default function ReactVirtualizedTable(props) {
  const numColumns = 8;
  const [rows, setRows] = React.useState(
    Array(props.downbeats.length).fill(Array(numColumns).fill(false))
  );
  // const tempRows = [];

  // for (let i = 0; i < props.downbeats.length; i += 1) {
  //   tempRows.push(createData(0, 0, 0, 0, 0, 0, 0, 0));
  // }

  return (
    <Paper style={{ height: 400, width: "100%" }}>
      <VirtualizedTable
        rowCount={rows.length}
        noteChangeCallback={(x, y) => {
          const temp = rows;
          temp[x][y] = !rows[x][y];
          setRows(temp);
        }}
        rowGetter={({ index }) => rows[index]}
        columns={numColumns}
      />
    </Paper>
  );
}
