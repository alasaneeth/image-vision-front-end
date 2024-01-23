import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";

export default function BasicDialog(props) {
  const { setOpen, children, title, ...rest } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog maxWidth="xs" 
        fullWidth {...rest} >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  );
}
