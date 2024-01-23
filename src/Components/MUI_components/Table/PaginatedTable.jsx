import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import { useDispatch } from "react-redux";

import Dialog from "../Dialog-Box/dialog";
import SelectedRowsPrint from "../../Print/selectedRowsPrint";
import { currency } from "../currencyFormatterTag";
import { openSnackbar } from "../../../Redux/Actions/snackbarActions";
import { pageStyle } from "../../Print/printPagesStyles";
import { alpha } from "@mui/material/styles";
import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  AddCircle,
  Delete,
  Edit,
  FindReplace,
  Print,
  Visibility,
} from "@mui/icons-material";
import Reports from "Components/Print/a4-report-print";

const TableView = (props) => {
  const {
    title,
    headCells,
    service,
    noAdding,
    AddComponent,
    editable,
    deletable,
    actions,
    searchable,
    ViewComponent,
    dialogBoxWidth,
    customService,
    ...rest
  } = props;
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFromSubmitted] = useState(false);

  const [searchSubmitted, setSearchSubmitted] = useState(false);

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [Search, setSearch] = useState("");

  const fetchTableRows = async (searchVal) => {
    setData([]);
    setLoading(true);
    try {
      const results =
        searchVal && searchVal !== ""
          ? await service.search(searchVal)
          : customService ? await customService : await service.getAll();
      setData(results.data);
      setResponse(results);
      setSelected([]);

    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
    setLoading(false);
  };

  const handleDelete = async (code, setSelected) => {
    try {
      await service.delete(code);
      fetchTableRows();
      setSelected([]);
      dispatch(openSnackbar(true, "success", `Deleted successfully`));
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };

  useEffect(() => {
    fetchTableRows();
  }, [formSubmitted]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchSubmitted(Search);
      fetchTableRows(Search);
      setPage(0);
    } else if (e.key === "Escape") {
      setSearch("");
      fetchTableRows();
      setSearchSubmitted(false);
    }
  };

  function EnhancedTableHead(props) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
      <TableHead style={{ backgroundColor: "#eee" }}>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all" }}
            />
          </TableCell>
          {headCells.map((headCell, index) => (
            <TableCell
              key={index}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "normal"}
              width={headCell.width}
            >
              <TableSortLabel>{headCell.label}</TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const componentRef = useRef();
    return (
      <>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(
                  theme.palette.primary.main,
                  theme.palette.action.activatedOpacity
                ),
            }),
          }}
        >
          {numSelected > 0 && (
            <>
              <Typography
                sx={{ flex: "1 1 100%" }}
                marginRight={3}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {numSelected} selected
              </Typography>
              {numSelected === 1 && (
                <>
                  {editable && (
                    <>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            setEditOpen(true);
                          }}
                          aria-label="Edit"
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Dialog
                        maxWidth={dialogBoxWidth ? dialogBoxWidth : "md"}
                        open={EditOpen}
                        setOpen={setEditOpen}
                        title={`Edit ${title === undefined ? "" : title}`}
                      >
                        <AddComponent
                          setSubmitted={setFromSubmitted}
                          code={selected.length === 1 ? selected : null}
                          setOpen={setEditOpen}
                          {...rest}
                        />
                      </Dialog>
                    </>
                  )}
                  {deletable && (
                    <>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure want to delete this?"
                              )
                            )
                              selected.length === 1 &&
                                handleDelete(selected, setSelected);
                          }}
                          aria-label="Edit"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                  {ViewComponent && (
                    <div>
                      <Tooltip title="View">
                        <IconButton
                          onClick={() => {
                            setViewOpen(true);
                          }}
                          aria-label="View"
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Dialog
                        fullScreen
                        open={viewOpen}
                        setOpen={setViewOpen}
                        title={`${title === undefined ? "" : title} View`}
                      >
                        <ViewComponent
                          code={selected.length === 1 ? selected : null}
                          pageStyle={pageStyle.a4}
                        />
                      </Dialog>
                    </div>
                  )}
                </>
              )}
              {actions?.map((action, i) => (
                <>
                  <Tooltip title={action.name} key={i}>
                    <IconButton
                      onClick={async (event) => {
                        await action.callBack(event, selected);
                        fetchTableRows();
                      }}
                      aria-label={action.name}
                    >
                      {action.icon}
                    </IconButton>
                  </Tooltip>
                </>
              ))}
              <ReactToPrint
                trigger={() => (
                  <Tooltip title="Print">
                    <IconButton aria-label="Print">
                      <Print />
                    </IconButton>
                  </Tooltip>
                )}
                content={() => componentRef.current}
                pageStyle={pageStyle.a4}
                documentTitle={`${title} report`}
              />
              <div style={{ display: "none" }}>
                <div ref={componentRef}>
                  <Reports title={`${title} Information`}>
                    <SelectedRowsPrint
                      code={selected}
                      headCells={headCells}
                      rows={data}
                    />
                  </Reports>
                </div>
              </div>
            </>
          )}
        </Toolbar>
      </>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.code);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, code) => {
    const selectedIndex = selected.indexOf(code);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, code);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = async (event, newPage) => {
    let response1;
    if (newPage > page)
      response1 = await service.getPaged(response.nextPageUrl);
    else {
      response1 = await service.getPaged(response.prevPageUrl);
    }
    setResponse(response1);
    setData(response1.data);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - data.length;

  return (
    <>
      <div>
        <div className="space-between mb" style={{ width: "100%" }}>
          {AddComponent && !noAdding && (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddCircle />}
                onClick={handleClickOpen}
                style={{ borderRadius: 35 }}
              >
                Add {title}
              </Button>

              <Dialog
                maxWidth={dialogBoxWidth ? dialogBoxWidth : "md"}
                open={open}
                setOpen={setOpen}
                title={`Add ${title === undefined ? "" : title}`}
              >
                <AddComponent
                  setSubmitted={setFromSubmitted}
                  setOpen={setOpen}
                  {...rest}
                />
              </Dialog>
            </>
          )}

          {searchable && (
            <div className="flex">
              <input
                type="txt"
                value={Search}
                className="custom-search"
                placeholder="Search.."
                onKeyUp={handleSearch}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <button
                className="custom-btn"
                onClick={() => {
                  setSearch("");
                  fetchTableRows();
                  setSearchSubmitted(false);
                }}
              >
                <FindReplace color="primary" />
              </button>
            </div>
          )}
        </div>
        {searchSubmitted && (
          <p style={{ textAlign: "center", marginBottom: 5 }}>
            Search result of{" "}
            <span style={{ color: "crimson" }}>"{searchSubmitted}"</span>{" "}
            <span
              onClick={() => {
                setSearch("");
                fetchTableRows();
                setSearchSubmitted(false);
              }}
              style={{
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Clear it
            </span>
          </p>
        )}
        <div>
          {selected.length > 0 && (
            <EnhancedTableToolbar numSelected={selected.length} title={title} />
          )}
          <Paper>
            <TableContainer>
              <Table
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  onSelectAllClick={handleSelectAllClick}
                  rowCount={data.length}
                />

                <TableBody>
                  {data
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.code);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <React.Fragment key={index}>
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, row.code)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            selected={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                              />
                            </TableCell>
                            {headCells.map((cell, index) => {
                              return (
                                <TableCell
                                  key={index}
                                  align={cell.numeric ? "right" : "left"}
                                  padding={
                                    cell.disablePadding ? "none" : "normal"
                                  }
                                  style={{
                                    backgroundColor: cell.color
                                      ? cell.id(row) > 0
                                        ? "#E41A1C70"
                                        : "#4DAF4A70"
                                      : "#fff",
                                  }}
                                >
                                  {cell.id(row) !== null
                                    ? cell.numeric
                                      ? currency(cell.id(row))
                                      : cell.id(row)
                                    : " - "}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        </React.Fragment>
                      );
                    })}
                  {data.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={headCells.length + 1} align="center">
                        {loading === true
                          ? "Loading..."
                          : `No ${title} to display.`}
                      </TableCell>
                    </TableRow>
                  )}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={headCells.length + 1} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <TablePagination
            rowsPerPageOptions={-1}
            component="div"
            count={-1}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            nextIconButtonProps={{
              disabled: !response.nextPageUrl
            }}
            backIconButtonProps={{
              disabled: !response.prevPageUrl
            }}
          />
          <FormControlLabel
            control={<Switch checked={dense} onChange={handleChangeDense} />}
            label="Dense padding"
          />
        </div>
      </div>
    </>
  );
};
export default TableView;
