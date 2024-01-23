import React from "react";
import { Checkbox, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Box } from "@mui/system";

export default function BasicTable({ components }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Component</TableCell>
            <TableCell>Access</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {components.map((component) => (
            <Row key={component.label} row={component} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell width="50" padding="checkbox">
            {row.children.length !== 0 && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.label}
          </TableCell>
          <TableCell padding="checkbox" align="right">
            <Checkbox checked={false} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Child Component</TableCell>
                      <TableCell align="right">Insert</TableCell>
                      <TableCell align="right">Edit</TableCell>
                      <TableCell align="right">Print</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.children.map((child) => (
                      <TableRow key={child.label}>
                        <TableCell component="th" scope="row">
                          {child.label}
                        </TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox checked={false} />
                        </TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox checked={false} />
                        </TableCell>
                        <TableCell padding="checkbox">
                          <Checkbox checked={false} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
}
