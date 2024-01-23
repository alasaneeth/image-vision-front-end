import { Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Typography
      variant="body2"
      style={{ margin: 10 }}
      color="textSecondary"
      align="center"
    >
     Foote

      <br />
      {"Copyright © "}
      Titum {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;
