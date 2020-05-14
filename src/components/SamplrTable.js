import { Box, ButtonBase } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { AutoSizer, Column, Table } from "react-virtualized";

const styles = (theme) => ({
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
    width: "20vw",
    // background: "#313131"
    // border: "1px solid #000000",
  },
  firstRow: {
    backgroundColor: "#414141",
  },
  oddRow: {
    background: "#515151"
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 80,
    rowHeight: 80,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    if (columnIndex === 0) {
      return (
        <canvas className={classes.canvas}></canvas>
      )
    } else {
      return (
        <TableCell
          component={ButtonBase}
          className={clsx(classes.tableCell, classes.flexContainer, {
            [classes.noClick]: onRowClick == null,
          }, {[classes.oddRow]: columnIndex%2===0}, {[classes.firstRow]: columnIndex%4===3})}
          variant="body"
          style={{ height: rowHeight, width: "10vw" }}
          align={
            (columnIndex != null && columns[columnIndex].numeric) || false
              ? "right"
              : "left"
          }
        >
          {cellData}
        </TableCell>
      );
    }
    
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      
      !columnIndex ?
          <canvas className={classes.canvas}></canvas>
       :
      <TableCell
        component="div"
        className={clsx(
          classes.tableCell,
          classes.headerCell,
          classes.flexContainer,
          classes.noClick
        )}
        variant="head"
        style={{ height: headerHeight, width: "10vw", color: "white", background: "#313131" }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
      >
        <span>{label}</span>
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
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
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
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    })
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

// ---

const sample = [
  ["A", "", "", "", "", "", "", "", ""],
];

function createData(id, sample, _1, _2, _3, _4, _5, _6, _7, _8) {
  return { id, sample, _1, _2, _3, _4, _5, _6, _7, _8 };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

export default function ReactVirtualizedTable() {
  return (
    <Box style={{ height: "87vh", width: "100%" }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: "20%",
            dataKey: "id",
          },
          {
            width: "10%",
            label: "1.1.1",
            dataKey: "_1",
          },
          {
            width: "10%",
            label: "1.3.1",
            dataKey: "_2",
          },
          {
            width: "10%",
            label: "2.1.1",
            dataKey: "_3",
          },
          {
            width: "10%",
            label: "2.3.1",
            dataKey: "_4",
          },
          {
            width: "10%",
            label: "3.1.1",
            dataKey: "_5",
          },
          {
            width: "10%",
            label: "3.3.1",
            dataKey: "_6",
          },
          {
            width: "10%",
            label: "4.1.1",
            dataKey: "_7",
          },
          {
            width: "10%",
            label: "4.3.1",
            dataKey: "_8",
          },
        ]}
      />
    </Box>
  );
}
