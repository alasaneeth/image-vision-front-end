import { Paper, Typography } from "@mui/material";
import React from "react";
import "./card.css";

export default function Card(props) {
  const { title, children, showTime, action, ...rest } = props;
  const [time, setTime] = React.useState("");

  showTime &&
    setInterval(() => {
      const today = new Date();
      setTime(today.toDateString() + "  " + today.toLocaleTimeString());
    }, 1000);
  return (
    <Paper className="card" {...rest} style={{ borderRadius: 15 }}>
      <div className="card-title space-between">
        <Typography component="span" variant="subtitle2">
          {title}
        </Typography>
        <Typography component="span" variant="subtitle2">
          {time}
        </Typography>
      </div>
      <div className="card-body">{children}</div>
      <div className="card-action">{action}</div>
    </Paper>
  );
}
export function ActionCard(props) {
  const { children } = props;
  return (
    <Paper className="card">
      <div className="card-body">{children}</div>
    </Paper>
  );
}
