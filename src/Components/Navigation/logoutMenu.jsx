import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import { logoutUser } from "../../Redux/Actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import CropFreeIcon from "@mui/icons-material/CropFree";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import { LOCAL_STORAGE } from "Components/Constants/LocalStorage";
import { GET_LOCAL_STORAGE } from "Components/Constants/GetLocalStorage";


export default function LogoutMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const defaultLocationSelected = useSelector((state) => state.defaultLocation);

  const [fullScreen, setFullScreen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    dispatch(logoutUser());
  };

  var elem = document.documentElement;
  function openFullscreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
    setFullScreen(true);
  }
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    setFullScreen(false);
  }

  return (
    <div style={{ position: "absolute", right: 15 }}>
      Location: {localStorage.getItem(LOCAL_STORAGE.BIZX_LOCATION_NAME)}
      {/* Location: {defaultLocationSelected.location.name} */}
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={() => {
          !fullScreen ? openFullscreen() : closeFullscreen();
        }}
      >
        <p
          style={{ marginLeft: 5, marginRight: 5, textTransform: "uppercase" }}
        >
          {!fullScreen ? "Full Screen  [ F11 ]" : "Close  [ F11 ]"}
        </p>
        {!fullScreen ? <CropFreeIcon /> : <CloseFullscreenIcon />}
      </IconButton>
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <p
          style={{ marginLeft: 5, marginRight: 5, textTransform: "uppercase" }}
        >
          {" "}
          {props.user}
        </p>
        <LockOpen />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => {
          setAnchorEl(null);
        }}
      >
        <NavLink to="settings" exact>
          <MenuItem>Settings</MenuItem>
        </NavLink>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
