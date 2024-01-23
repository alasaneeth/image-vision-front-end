import React, { useState } from 'react';
import {
  Button,
  Dialog,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { pageStyle } from 'Components/Print/printPagesStyles';
import ViewParcel from '../Parcel/ViewParcel';
import ViewDeleveryTable from "./ViewDeleverytable"
import ForwardIcon from '@mui/icons-material/Forward';
import ParcelService from 'Service/Parcel/ParcelService.service';
import { openSnackbar } from 'Redux/Actions/snackbarActions';
import { useDispatch } from "react-redux";

const ParcelLoading = (props) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [indexValue, setIndexValue] = useState(null);


  const dispatch = useDispatch();

  const handleViewOpen = (index) => {
    setSelectedRow(props.results[index]);
    setViewOpen(true);
  };

  const handleViewClose = () => {
    setSelectedRow(null);
    setViewOpen(false);
  };
  const handleDelivery = async (code) => {
    try {
      
      await ParcelService.delivery(code);
  
      dispatch(
        openSnackbar(
          true,
          "success",
          `Parcel Delivered successfully`
        )
      );
    } catch (e) {
      dispatch(openSnackbar(true, "error", e));
    }
  };
  
  return (
    <div>
      <TableContainer>
        <Table size="small" aria-label="simple table" id="table-to-xls">
          <TableHead style={{ backgroundColor: '#eee', height: 60 }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Send Location</TableCell>
              <TableCell>Courier</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Delivery</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.results.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.weight}</TableCell>
                <TableCell>{`${row.customer.firstName} ${row.customer.lastName}`}</TableCell>
                <TableCell>{row.toLocation.name}</TableCell>
                <TableCell>{row.route.courier.name}</TableCell>
                <TableCell>
                  <Tooltip title="View">
                  <IconButton onClick={() => handleViewOpen(index)} aria-label="View">
                      <Visibility />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip >
                  <IconButton>
                       <ForwardIcon onClick={() => handleDelivery(row.code)} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={viewOpen} onClose={handleViewClose}>
          {selectedRow && <ViewDeleveryTable data={selectedRow} />}
      </Dialog>
    </div>
  );
};

export default ParcelLoading;
