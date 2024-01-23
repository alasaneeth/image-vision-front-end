import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";

export default function Title(props:any) {
  return (
    <div className="title-card">
      <Typography component="p" variant="subtitle1">
        {props.children}
      </Typography>
    </div>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
