import React from "react";


import Card from "../Card/card";
import ChartBar from "./Chart/barChart";
import ChartPie from "./Chart/chartPie";
import Title from "../Card/title";
import { Grid, Typography } from "@mui/material";


export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export default function Dashboard() {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <>
      <Title>Dashboard</Title>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={3}>
          <Card id="blue" title="Yesterday's Sales">
            <>
              <Typography component="p" variant="h5">
                Rs. 3,024.00
              </Typography>
              <Typography color="textSecondary">
                {yesterday.toDateString()}
              </Typography>
            </>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card id="blue" title="Today's Sales">
            <>
              <Typography component="p" variant="h5">
                Rs. 9,024.00
              </Typography>
              <Typography color="textSecondary">
                {today.toDateString()}
              </Typography>
            </>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card id="yellow" title="Monthly Sales">
            <>
              <Typography component="p" variant="h5">
                Rs. 300,024.00
              </Typography>
              <Typography color="textSecondary">
                {`${monthNames[today.getMonth()]}, ${today.getFullYear()}`}
              </Typography>
            </>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Card id="red" title="Annual Sales">
            <>
              <Typography component="p" variant="h5">
                Rs. 5,000,024.00
              </Typography>
              <Typography color="textSecondary">
                {today.getFullYear()}
              </Typography>
            </>
          </Card>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Card title="Past 6 months sales">
            <ChartBar />
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card title="Monthly Summary">
            <ChartPie />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
