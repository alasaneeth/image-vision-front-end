import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { openSnackbar } from "../../Redux/Actions/snackbarActions";

export default function CustomizedSnackbars() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.snackbar);
  const { open, type, message } = snackbar;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(openSnackbar(false, type, ""));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          onClose={handleClose}
          variant="filled"
          severity={type}
          style={{
            height: 70,
            display: "flex",
            alignItems: "center",
          }}
          sx={{ width: "100%" }}
          children={message}
        />
      </Snackbar>
    </Stack>
  );
}
