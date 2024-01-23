// import React from "react";
// import PropTypes from "prop-types";
// import { Box } from "@mui/system";
// import { AppBar, makeStyles, Paper, Tab, Tabs, Typography } from "@mui/material";
// import { styled } from '@mui/material/styles';

// const PREFIX = 'TabPanel';
// const classes = {
//   root: `${PREFIX}-root`,
// }
// const Root = styled('div')(({ theme }) => ({
//   [`&.${classes.root}`]: {
//     flexGrow: 1,
//     width: "100%",
//   },
// }));

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`scrollable-force-tabpanel-${index}`}
//       aria-labelledby={`scrollable-force-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box p={3}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `scrollable-force-tab-${index}`,
//     "aria-controls": `scrollable-force-tabpanel-${index}`,
//   };
// }

// export default function TabView({ tabViews }) {
//   const [value, setValue] = React.useState(0);
//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Root>
//       <AppBar position="static" className={classes.root}>
//         <Tabs
//           value={value}
//           variant="scrollable"
//           scrollButtons="on"
//           onChange={handleChange}
//           aria-label="wrapped label tabs example"
//         >
//           {tabViews.map((tabView, index) => (
//             <Tab
//               key={index}
//               value={index}
//               label={tabView.title}
//               {...a11yProps(tabView.index)}
//             />
//           ))}
//         </Tabs>
//       </AppBar>
//       {tabViews.map((tabView, index) => (
//         <div
//           key={index}
//           role="tabpanel"
//           hidden={value !== index}
//           id={`simple-tabpanel-${index}`}
//           aria-labelledby={`simple-tab-${index}`}
//         >
//           {value === index && (
//             <Paper>
//               <Box p={2}>{tabView.component}</Box>{" "}
//             </Paper>
//           )}
//         </div>
//       ))}
//     </Root>
//   );
// }

import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabView({ tabViews }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {tabViews.map((tabView, index) => (
            <Tab
              key={index}
              label={tabView.title}
              {...a11yProps(tabView.index)}
            />
          ))}
          {/* <Tab label="Item One" {...a11yProps(0)} />
          <Tab label="Item Two" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
      </Box>
      {tabViews.map((tabView, index) => (
        <div
          key={index}
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
        >
          {value === index && <Box p={2}>{tabView.component}</Box>}
        </div>
      ))}
    </Paper>
  );
}
